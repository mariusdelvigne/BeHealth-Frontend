export interface NotificationsGetAllOutput {
  id: number;
  userId: number;
  title: string;
  category: string;
  description: string;
  sendingDateTime: string;
  seen: boolean;
}
