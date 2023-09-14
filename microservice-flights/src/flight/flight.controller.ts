import { Controller } from '@nestjs/common';
import { FlightDto } from './dto/flight.dto';
import { FlightService } from './flight.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightMsg } from 'src/common/constanst';

@Controller()
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @MessagePattern(FlightMsg.CREATE)
  create(@Payload() flightDto: FlightDto) {
    return this.flightService.create(flightDto);
  }

  @MessagePattern(FlightMsg.FIND_ALL)
  findAll() {
    return this.flightService.findAll();
  }

  @MessagePattern(FlightMsg.FIND_ONE)
   findOne(@Payload() id: string) {
    return this.flightService.findOne(id);
  }

  @MessagePattern(FlightMsg.UPDATE)
  update(@Payload() payload: any) {
    return this.flightService.update(payload.id, payload.flightDto);
  }
  @MessagePattern(FlightMsg.DELETE)
  delete(@Payload() id: string) {
    return this.flightService.delete(id);
  }

  @MessagePattern(FlightMsg.ADD_PASSENGER)
  addPassenger(@Payload() payload: any) {
    return this.flightService.addPassenger(
      payload.flightId,
      payload.passengerId,
    );
  }

}
