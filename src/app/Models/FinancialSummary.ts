import { Payment } from "./Payment";
import { Purchase } from "./Purchase";

export class FinancialSummary {
  summaryId?: number;
  totalIncome!: number;
  totalOutcome!: number;
  netTotal!: number;
  date!: Date;
  payments?: Payment[];
  purchases?: Purchase[];
}
