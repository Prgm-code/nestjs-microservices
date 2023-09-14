import { IPassenger } from './passenger.interface';

export interface IFlight  {
  _id?: string;
  pilot: string;

  airplane: string;
  destinationCity: string;
  flightDate: Date;

  passengers: IPassenger[];
}
