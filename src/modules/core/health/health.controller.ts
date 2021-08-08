import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { transformResponse } from 'src/utils/response-helpers';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    return transformResponse({ message: 'The API is healthy.' });
  }
}
