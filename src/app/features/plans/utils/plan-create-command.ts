export interface PlanCreateCommand {
  name: string;
  category: string;
  privacy: string;
  description: string;
  durationInDays: number;
}
