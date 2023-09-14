import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxySuperFlights } from 'src/common/proxy/clent.proxy';
import { PassengerDto } from './dto/passanger.dto';
import { Observable } from 'rxjs';
import { IPassenger } from 'src/common/interface/passenger.interface';
import { PassengerMsg } from 'src/common/constanst';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('passenger')
@UseGuards(JwtAuthGuard)

@Controller('api/v2/passenger')
export class PassengerController {
    constructor(private readonly clientProxy: ClientProxySuperFlights) {}
    private _clientProxyPassenger = this.clientProxy.clienProxyPassangers();

    @Post()
    create(@Body() passengerDto : PassengerDto): Observable<IPassenger> {
        return this._clientProxyPassenger.send(PassengerMsg.CREATE, passengerDto);
    }

    @Get()
    findAll() : Observable<IPassenger> {
        return  this._clientProxyPassenger.send(PassengerMsg.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IPassenger> {
        return this._clientProxyPassenger.send(PassengerMsg.FIND_ONE, id);
    }

    
    @Put(':id')
    update(@Param('id') id: string, @Body() passengerDto: PassengerDto): Observable<IPassenger> {
        return this._clientProxyPassenger.send(PassengerMsg.UPDATE, { id, passengerDto });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyPassenger.send(PassengerMsg.DELETE, id);
    }
    
}