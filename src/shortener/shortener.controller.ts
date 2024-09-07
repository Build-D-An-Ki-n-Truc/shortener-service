import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ShortenerService } from './shortener.service';
import { MessageContextDto } from './dtos/message.dto';
import { ResponsePayload } from './dtos/response.dto';
import { from, Observable, map, catchError } from 'rxjs';

@Controller()
export class ShortenerController {
  constructor(private readonly service: ShortenerService) {}

  private handleError(error: any): ResponsePayload<any> {
    return {
      payload: {
        type: ['info'],
        status: HttpStatus.BAD_REQUEST,
        data: error.message ?? 'Unexpected error',
      },
    };
  }

  private wrapResponse<T>(
    data: T,
    status: HttpStatus = HttpStatus.OK,
  ): ResponsePayload<T> {
    return {
      payload: {
        type: ['info'],
        status,
        data,
      },
    };
  }

  @MessagePattern({
    service: 'shortener',
    endpoint: 'shortenShare',
    method: 'GET',
  })
  shortenShare(@Payload() message: MessageContextDto): Observable<ResponsePayload<any>>  {
    console.log(message)
    return from(this.service.shortenShareFeature(message.params.username, parseInt(message.params.turn))).pipe(
      map((games) => this.wrapResponse(games)),
      catchError((error) => from([this.handleError(error)])),
    );
  }
}
