export interface PlanCreateOutput {
  id: number;
  name: string;
  category: string;
  privacy: string;
  creationDateTime: string;
  description: string;
  durationInDays: number;
  creatorId: number;
}
