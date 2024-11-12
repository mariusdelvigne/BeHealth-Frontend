export interface UserCreateCommand {
  username: string;
  password: string;
  name: string;
  surname: string;
  birthDate: Date;
  gender: string;
  mail: string;
}
