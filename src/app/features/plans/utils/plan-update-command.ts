export interface PlanUpdateCommand {
  name: string;
  category: string;
  privacy: string ;
  description: string;
  durationInDays: number;
  tagNames: string[];
}
