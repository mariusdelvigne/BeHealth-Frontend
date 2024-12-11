export interface NotificationsGetAllOutput {
  id: number;
  userId: number;
  userName: string;
  title: string;
  category: string;
  description: string;
  sendingDateTime: string;
  seen: boolean;
}
