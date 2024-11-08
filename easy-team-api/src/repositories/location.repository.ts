import Location from "../entities/location";

import DatabaseClient from "../database/prismaClient";

export default class LocationRepository {
  async create(name: string): Promise<Location> {
    const location = await DatabaseClient.location.create({
      data: {
        name,
      },
    });

    return new Location(location.id, location.name);
  }

  async findAll(): Promise<Location[]> {
    const locations = await DatabaseClient.location.findMany();
    return locations.map(loc => new Location(loc.id, loc.name));
  }

  async findById(id: number): Promise<Location> {
    return await DatabaseClient.location.findUnique({
      where: { id },
    }) as Location;
  }
}
