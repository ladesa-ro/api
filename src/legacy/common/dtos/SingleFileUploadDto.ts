import { ApiProperty } from '@nestjs/swagger';

export class SingleFileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
