import { ResourcesModule } from "@/business-logic/resources/resources.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    //
    ResourcesModule,
    /*GerarHorarioModule*/
  ],
})
export class BusinessLogicModule {}
