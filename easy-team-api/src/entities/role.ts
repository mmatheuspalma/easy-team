import Permission from "./permission";

export default class Role {
  constructor(
    public id: number,
    public name: string,
    public description: string | null,
    public permissions: Permission[] | null,
  ) {}
}
