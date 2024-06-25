import { IConfig } from '@/app-config';
import { DocumentBuilder } from '@nestjs/swagger';

export function SetupSwaggerDocument(configService: IConfig | null = null) {
  const config = new DocumentBuilder();

  config.setTitle('Ladesa - API');
  config.setDescription('API para a consulta e manipulação de dados e procedimentos relacionados ao Sistema de Gestão Acadêmico.');
  config.setVersion('0.0');

  config.addBearerAuth();

  config.addTag('Base', 'Ladesa - Base');

  config.addTag('Arquivos', 'Armazenamento / Arquivos');

  config.addTag('Autenticacao');
  config.addTag('Usuarios', 'Autenticação / Usuários');

  config.addTag('Estados', 'Ambientes / Estados');
  config.addTag('Cidades', 'Ambientes / Cidades');
  config.addTag('Campi', 'Ambientes / Campi');
  config.addTag('Blocos', 'Ambientes / Campi / Blocos');
  config.addTag('Ambientes', 'Ambientes / Campi / Blocos / Ambiente');
  config.addTag('Reservas', 'Ambientes / Campi / Blocos / Ambiente / Reservas');

  config.addTag('Vinculos', 'Autenticação / Usuários / Vínculos');

  config.addTag('Modalidades', 'Ensino / Modalidade');
  config.addTag('Cursos', 'Ensino / Cursos');
  config.addTag('Disciplinas', 'Ensino / Disciplinas');
  config.addTag('Turmas', 'Ensino / Turmas');
  config.addTag('Diarios', 'Ensino / Diarios');
  config.addTag('DiarioProfessor', 'Ensino / Diário Professor');

  config.addTag('Calendarios Letivos', 'Calendario / Calendarios Letivos');

  if (configService) {
    const prefix = configService.getRuntimePrefix();

    if (prefix) {
      config.setBasePath(prefix);
    }

    const servers = configService.getSwaggerServers();

    if (servers) {
      for (const server of servers) {
        config.addServer(server);
      }
    }
  }

  return config;
}
