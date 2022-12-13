import {RoleResponse} from "./role-response";

export interface UserResponse{
  userId: number,
  email: string,
  name: string,
  surname: string,
  roles: RoleResponse[]
}
