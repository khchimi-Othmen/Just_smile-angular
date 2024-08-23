import {Patient} from "./Patient";

export class Appointment {
  appointmentId?: number;
  date!: Date;
  startTime?: string;  // format HH:mm
  endTime?: string;    // format HH:mm
  time!: string;
  reason!: string;
  patient!: Patient;
}
