import LocationService from '../../services/location.service';

export default class CreateLocationUseCase {
  private locationService = new LocationService();

  async execute(name: string) {
    return this.locationService.createLocation(name);
  }
}
