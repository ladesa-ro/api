import { AccessContext } from '@/access-context';
import * as LadesaTypings from '@ladesa-ro/especificacao';
import { Injectable } from '@nestjs/common';
import { pick } from 'lodash';
import { DatabaseContextService } from '../../../adapters/adapter-database';


// ============================================================================

@Injectable()
export class IntervaloDeTempoService {
  constructor(
    private databaseContext: DatabaseContextService,
  ) { }

  get intervaloTempoRepository() {
    return this.databaseContext.intervaloDeTempoRepository;
  }

  //

  async intervaloFindOne(dto: LadesaTypings.IntervaloDeTempoInput){
    return this.intervaloTempoRepository.findOne({
      where: {
        periodoFim: dto.periodoFim,
        periodoInicio: dto.periodoInicio
      }
    });
  }

  async intervaloCreateOrUpdate(accessContext: AccessContext, dto: LadesaTypings.IntervaloDeTempoInput) {

    const intervalExisting = await this.intervaloFindOne(dto);

    if (intervalExisting) return intervalExisting;

 
    const dtoInterval = pick(dto, ['periodoInicio', 'periodoFim',]);


    const newInterval = this.intervaloTempoRepository.create();

    this.intervaloTempoRepository.merge(newInterval, {
      ...dtoInterval,
    });

    await this.intervaloTempoRepository.save(newInterval);

    return this.intervaloTempoRepository.findBy({id: newInterval.id});
  }
}
