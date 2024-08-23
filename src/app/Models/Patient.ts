import {Payment} from "./Payment";
import {Appointment} from "./Appointment";

export class Patient {
  patientId?: number;
  nom!: string;
  prenom!: string;
  dateNaissance!: Date;
  sexe!: string;
  adresse!: string;
  telephone!: string;
  email!: string;
  dateInscription!: Date;
  appointments?: Appointment[];
  payments?: Payment[];
}
