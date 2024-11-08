import Role from "./role";
import Location from "./location";

export default class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public role?: Role,
    public location?: Location,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
