import { ForbiddenException, Injectable, NotFoundException, ServiceUnavailableException, StreamableFile } from '@nestjs/common';
import * as Dto from '@sisgea/spec';
import jetpack, { createReadStream } from 'fs-jetpack';
import { writeFile } from 'node:fs/promises';
import { Readable } from 'node:stream';
import { v4 } from 'uuid';
import type { IContextoDeAcesso } from '../../../../domain';
import { DatabaseContextService, EnvironmentConfigService, ValidationContractUuid } from '../../../../infraestrutura';
import { UsuarioEntity } from '../../../../infraestrutura/integrate-database/typeorm/entities/autenticacao/usuario.entity';
import { ArquivoEntity } from '../../../../infraestrutura/integrate-database/typeorm/entities/base/arquivo.entity';

type IGetFileAcesso = null | {
  nome?: string;
  id?: string;
};

@Injectable()
export class ArquivoService {
  constructor(
    private databaseContextService: DatabaseContextService,
    private environmentConfigService: EnvironmentConfigService,
  ) {}

  get arquivoRepository() {
    return this.databaseContextService.arquivoRepository;
  }

  private get storagePath() {
    return this.environmentConfigService.getStoragePath();
  }

  async dataExists(id: Dto.IArquivoModel['id']) {
    const fileFullPath = this.datGetFilePath(id);
    return jetpack.exists(fileFullPath);
  }

  async dataReadAsStream(id: Dto.IArquivoModel['id']): Promise<Readable | null> {
    if (await this.dataExists(id)) {
      const fileFullPath = this.datGetFilePath(id);
      const fileReadStream = createReadStream(fileFullPath);
      return fileReadStream;
    }

    return null;
  }

  async getFile(contextoDeAcesso: IContextoDeAcesso | null, id: Dto.IArquivoModel['id'], acesso: IGetFileAcesso | null) {
    const qb = this.arquivoRepository.createQueryBuilder('arquivo');

    qb.where('arquivo.id = :arquivoId', { arquivoId: id });

    const exists = await qb.getExists();

    if (!exists) {
      throw new NotFoundException();
    }

    if (acesso) {
      if (acesso.nome === 'bloco' && ValidationContractUuid().isValidSync(acesso.id)) {
        qb
          //
          .innerJoin('arquivo.imagemArquivo', 'imagemArquivo')
          .innerJoin('imagemArquivo.imagem', 'imagem')
          .innerJoin('imagem.blocoCapa', 'blocoCapa');

        if (contextoDeAcesso) {
          await contextoDeAcesso.aplicarFiltro('bloco:find', qb, 'blocoCapa', null);
        }

        qb.andWhere('blocoCapa.id = :blocoId', { blocoId: acesso.id });
      } else if (acesso.nome === 'ambiente' && ValidationContractUuid().isValidSync(acesso.id)) {
        qb
          //
          .innerJoin('arquivo.imagemArquivo', 'imagemArquivo')
          .innerJoin('imagemArquivo.imagem', 'imagem')
          .innerJoin('imagem.ambienteCapa', 'ambienteCapa');

        if (contextoDeAcesso) {
          await contextoDeAcesso.aplicarFiltro('ambiente:find', qb, 'ambienteCapa', null);
        }

        qb.andWhere('ambienteCapa.id = :ambienteId', { ambienteId: acesso.id });
      } else if (acesso.nome === 'usuario' && ValidationContractUuid().isValidSync(acesso.id)) {
        qb
          //
          .innerJoin('arquivo.imagemArquivo', 'imagemArquivo')
          .innerJoin('imagemArquivo.imagem', 'imagem')
          .leftJoin(UsuarioEntity, 'usuario', '(usuario.id_imagem_capa_fk = imagem.id OR usuario.id_imagem_perfil_fk = imagem.id)');

        if (contextoDeAcesso) {
          await contextoDeAcesso.aplicarFiltro('usuario:find', qb, 'usuario', null);
        }

        qb.andWhere('usuario.id = :usuarioId', { usuarioId: acesso.id });
      } else {
        qb.andWhere('FALSE');
      }
    }

    qb.andWhere('arquivo.id = :arquivoId', { arquivoId: id });

    const arquivo = await qb.getOne();

    if (!arquivo) {
      throw new ForbiddenException();
    }

    if (!(await this.dataExists(id))) {
      throw new ServiceUnavailableException();
    }

    const stream = await this.dataReadAsStream(id);

    return {
      id: arquivo.id,
      nome: arquivo.nome,
      mimeType: arquivo.mimeType,
      stream,
    };
  }

  async getStreamableFile(contextoDeAcesso: IContextoDeAcesso | null, id: Dto.IArquivoModel['id'], acesso: IGetFileAcesso | null) {
    const file = await this.getFile(contextoDeAcesso, id, acesso);

    if (!file.stream) {
      throw new ServiceUnavailableException();
    }

    return new StreamableFile(file.stream, {
      type: file.mimeType ?? undefined,
      disposition: `attachment; filename="${encodeURIComponent(file.nome ?? file.id)}"`,
    });
  }

  async dataSave(id: Dto.IArquivoModel['id'], data: NodeJS.ArrayBufferView | Readable) {
    const fileFullPath = this.datGetFilePath(id);
    await writeFile(fileFullPath, data);
    return true;
  }

  async arquivoCreate(dto: Pick<Dto.IArquivoModel, 'nome' | 'mimeType'>, data: NodeJS.ArrayBufferView | Readable): Promise<Pick<ArquivoEntity, 'id'>> {
    let id: string;

    do {
      id = v4();
    } while (await this.dataExists(id));

    await this.dataSave(id, data);

    // TODO: sizeBytes
    const sizeBytes = null;
    // TODO: mimeType
    const mimeType = dto.mimeType;

    await this.arquivoRepository.save(<ArquivoEntity>{
      id,
      //
      nome: dto.nome,
      mimeType: mimeType,
      sizeBytes: sizeBytes,
      storageType: 'filesystem',
      //
    });

    return {
      id,
    };
  }

  private datGetFilePath(id: Dto.IArquivoModel['id']) {
    jetpack.dir(this.storagePath);
    return `${this.storagePath}/${id}`;
  }
}
