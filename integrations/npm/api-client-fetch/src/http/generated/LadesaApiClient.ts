import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { Interceptors } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';

import { AmbientesService } from './services.gen';
import { ArquivosService } from './services.gen';
import { AutenticacaoService } from './services.gen';
import { BaseService } from './services.gen';
import { BlocosService } from './services.gen';
import { CalendariosLetivosService } from './services.gen';
import { CampiService } from './services.gen';
import { CidadesService } from './services.gen';
import { CursosService } from './services.gen';
import { DiarioProfessorService } from './services.gen';
import { DiariosService } from './services.gen';
import { DiasCalendarioService } from './services.gen';
import { DisciplinasService } from './services.gen';
import { EstadosService } from './services.gen';
import { EtapasService } from './services.gen';
import { EventosService } from './services.gen';
import { ModalidadesService } from './services.gen';
import { ReservasService } from './services.gen';
import { TurmasService } from './services.gen';
import { TurmasDisponibilidadeService } from './services.gen';
import { UsuariosService } from './services.gen';
import { VinculosService } from './services.gen';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class LadesaApiClient {
  public readonly ambientes: AmbientesService;
  public readonly arquivos: ArquivosService;
  public readonly autenticacao: AutenticacaoService;
  public readonly base: BaseService;
  public readonly blocos: BlocosService;
  public readonly calendariosLetivos: CalendariosLetivosService;
  public readonly campi: CampiService;
  public readonly cidades: CidadesService;
  public readonly cursos: CursosService;
  public readonly diarioProfessor: DiarioProfessorService;
  public readonly diarios: DiariosService;
  public readonly diasCalendario: DiasCalendarioService;
  public readonly disciplinas: DisciplinasService;
  public readonly estados: EstadosService;
  public readonly etapas: EtapasService;
  public readonly eventos: EventosService;
  public readonly modalidades: ModalidadesService;
  public readonly reservas: ReservasService;
  public readonly turmas: TurmasService;
  public readonly turmasDisponibilidade: TurmasDisponibilidadeService;
  public readonly usuarios: UsuariosService;
  public readonly vinculos: VinculosService;

  public readonly request: BaseHttpRequest;

  constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? '',
      VERSION: config?.VERSION ?? '0.0',
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? 'include',
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
      interceptors: {
        request: config?.interceptors?.request ?? new Interceptors(),
        response: config?.interceptors?.response ?? new Interceptors(),
      },
    });

    this.ambientes = new AmbientesService(this.request);
    this.arquivos = new ArquivosService(this.request);
    this.autenticacao = new AutenticacaoService(this.request);
    this.base = new BaseService(this.request);
    this.blocos = new BlocosService(this.request);
    this.calendariosLetivos = new CalendariosLetivosService(this.request);
    this.campi = new CampiService(this.request);
    this.cidades = new CidadesService(this.request);
    this.cursos = new CursosService(this.request);
    this.diarioProfessor = new DiarioProfessorService(this.request);
    this.diarios = new DiariosService(this.request);
    this.diasCalendario = new DiasCalendarioService(this.request);
    this.disciplinas = new DisciplinasService(this.request);
    this.estados = new EstadosService(this.request);
    this.etapas = new EtapasService(this.request);
    this.eventos = new EventosService(this.request);
    this.modalidades = new ModalidadesService(this.request);
    this.reservas = new ReservasService(this.request);
    this.turmas = new TurmasService(this.request);
    this.turmasDisponibilidade = new TurmasDisponibilidadeService(this.request);
    this.usuarios = new UsuariosService(this.request);
    this.vinculos = new VinculosService(this.request);
  }
}
