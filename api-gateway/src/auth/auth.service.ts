import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { ClientProxySuperFlights } from 'src/common/proxy/clent.proxy';
import { UserMsg } from 'src/common/constanst';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxy: ClientProxySuperFlights,
    private readonly jwtService: JwtService,
  ) {}
  private _clientProxyUser = this.clientProxy.clientProxyUsers();

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this._clientProxyUser
    .send(UserMsg.VALID_USER, { username, password }).toPromise();

    

    if (user ) {
      return user;
    }

    return null;
  }

  async signIn(user: any) {
    const payload = { username: user.username, sub: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async signUp(userDto: UserDto) {
    return await this._clientProxyUser.send(UserMsg.CREATE, userDto).toPromise();
  }
}
