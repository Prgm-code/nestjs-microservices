import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxySuperFlights } from 'src/common/proxy/clent.proxy';
import { FlightDto } from './dto/flight.dto';
import { FlightMsg, PassengerMsg } from 'src/common/constanst';
import { Observable, firstValueFrom } from 'rxjs';
import { IFlight } from 'src/common/interface/flight.interface';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Flight')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/flight')
export class FlightController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}
  private _clientProxyFlight = this.clientProxy.clientProxyFlights();
  private _clientProxyPassenger = this.clientProxy.clienProxyPassangers();

  @Post()
  create(@Body() fligthDto: FlightDto) {
    return this._clientProxyFlight.send(FlightMsg.CREATE, fligthDto);
  }

  @Get()
  findALl() {
    console.log('entro');
    return this._clientProxyFlight.send(FlightMsg.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IFlight> {
    return this._clientProxyFlight.send(FlightMsg.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() flightDto: FlightDto,
  ): Observable<IFlight> {
    return this._clientProxyFlight.send(FlightMsg.UPDATE, { id, flightDto });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<IFlight> {
    return this._clientProxyFlight.send(FlightMsg.DELETE, id);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await firstValueFrom(
      this._clientProxyPassenger.send(PassengerMsg.FIND_ONE, passengerId), // Remplaza a toPromise() que esta deprecado
    );

    if (!passenger) {
      throw new HttpException('Passenger Not Found ', HttpStatus.NOT_FOUND);
    }
    return this._clientProxyFlight.send(FlightMsg.ADD_PASSENGER, {
      flightId,
      passengerId,
    });
  }
}
