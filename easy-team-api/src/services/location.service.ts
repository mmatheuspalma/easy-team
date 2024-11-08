import Location from '../entities/location';
import LocationRepository from '../repositories/location.repository';

export default class LocationService {
  private locationRepository = new LocationRepository();

  async createLocation(name: string): Promise<Location> {
    return this.locationRepository.create(name);
  }

  async getLocations(): Promise<Location[]> {
    return this.locationRepository.findAll();
  }

  async getLocationById(id: number): Promise<Location | null> {
    return this.locationRepository.findById(id);
  }
}
