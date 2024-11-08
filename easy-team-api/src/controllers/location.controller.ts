import { Request, Response } from 'express';

import GetLocationsUseCase from '../usecases/location/getLocations.usecase';
import CreateLocationUseCase from '../usecases/location/createLocation.usecase';
import GetLocationByIdUseCase from '../usecases/location/getLocationById.usecase';

export default class LocationController {
  constructor (
    private getLocationsUseCase = new GetLocationsUseCase(),
    private createLocationUseCase = new CreateLocationUseCase(),
    private getLocationByIdUseCase = new GetLocationByIdUseCase(),
  ) {}

  async createLocation(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    try {
      const location = await this.createLocationUseCase.execute(name);
      return res.status(201).json(location);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  async getLocations(req: Request, res: Response): Promise<Response> {
    try {
      const locations = await this.getLocationsUseCase.execute();
      return res.status(200).json(locations);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  async getLocationById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const location = await this.getLocationByIdUseCase.execute(Number(id));
      if (!location) {
        return res.status(404).json({ message: 'Location not found' });
      }
      return res.status(200).json(location);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
}
