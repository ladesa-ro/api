import { Injectable } from '@nestjs/common';
import { DatabaseContext } from '../../../infrastructure/integrate-database/typeorm/database-context/database-context';

@Injectable()
export class EstadoService {
  constructor(
    //
    private databaseContext: DatabaseContext,
  ) {}

  //

  async findAll() {
    const { baseEstadoRepository } = this.databaseContext;

    const qb = baseEstadoRepository.createQueryBuilder('estado');
    qb.select('estado');
    const estados = await qb.getMany();

    return estados;
  }
}
