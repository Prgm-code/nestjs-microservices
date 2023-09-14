import { IUser } from './../common/interface/user.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxySuperFlights } from 'src/common/proxy/clent.proxy';
import { UserDto } from './dto/user.dto';
import { Observable } from 'rxjs';
import { UserMsg } from 'src/common/constanst';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('/api/v2/user')
export class UserController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}
  private _clientProxyUser = this.clientProxy.clientProxyUsers();

  @Post()
  create(@Body() userDto: UserDto): Observable<IUser> {
    return this._clientProxyUser.send(UserMsg.CREATE, userDto);
  }

  @Get()
  findAll(): Observable<IUser> {
    return this._clientProxyUser.send(UserMsg.FIND_ALL, '');
  }
  @Get(':id')
  findOne(@Param('id') id: string): Observable<IUser> {
    return this._clientProxyUser.send(UserMsg.FIND_ONE, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UserDto): Observable<IUser> {
    return this._clientProxyUser.send(UserMsg.UPDATE, { id, userDto });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<IUser> {
    return this._clientProxyUser.send(UserMsg.DELETE, id);
  }
}
