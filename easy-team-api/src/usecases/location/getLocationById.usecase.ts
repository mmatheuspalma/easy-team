import LocationService from '../../services/location.service';

export default class GetLocationByIdUseCase {
  private locationService = new LocationService();

  async execute(id: number) {
    return this.locationService.getLocationById(id);
  }
}
