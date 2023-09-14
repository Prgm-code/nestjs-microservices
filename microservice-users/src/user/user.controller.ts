import { Controller } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMsg } from 'src/common/constanst';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserMsg.CREATE)
  create(@Payload() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @MessagePattern(UserMsg.FIND_ALL)
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern(UserMsg.FIND_ONE)
  findOne(@Payload() id: string): any {
    return this.userService.findOne(id);
  }

  @MessagePattern(UserMsg.UPDATE)
  update(@Payload() payload: any) {
    return this.userService.update(payload.id, payload.userDto);
  }

  @MessagePattern(UserMsg.DELETE)
  remove(@Payload() payload: any) {
    return this.userService.remove(payload.id);
  }

  @MessagePattern(UserMsg.VALID_USER)
  async validateUser(@Payload() payload : any): Promise<any> {
    const user = await this.userService.fidnByUsername(payload.username);

    const isValid = await this.userService.checkPassword(payload.password, user.password);

    if (user && isValid) {
      return user;
    }

    return null;
  }
}
