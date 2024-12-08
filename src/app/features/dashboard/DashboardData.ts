export interface DashboardData {
  lastSleep?: {
    startDatetime: string;
    endDatetime: string;
  },
  lastFood?: {
    eatenDatetime: string;
    name: string;
    quantityInG: number;
  },
  lastSport?: {
    name: string;
    startDatetime: string;
    endDatetime: string;
  },
  lastPeriod?: {
    startDate: string;
    endDate: string;
  },
  lastWeight?: {
    weightInG: number;
    inputDate: string;
  },
  lastHeight?: {
    heightInCm: number;
    inputDate: string;
  }
}
