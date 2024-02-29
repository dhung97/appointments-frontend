export interface Appointment {
  firstname: string;
  lastname: string;
  phone: string;
  date: string;
}

export interface GetAppointmentQuery {
  status: number;
  appointments: Appointment[]
}
