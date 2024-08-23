import {Patient} from "./Patient";

export class Payment {
  paymentId?: number;
  amount!: number;
  date!: Date;
  patient!: Patient;
}
