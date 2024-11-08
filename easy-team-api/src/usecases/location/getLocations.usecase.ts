import LocationService from '../../services/location.service';

export default class GetLocationsUseCase {
  private locationService = new LocationService();

  async execute() {
    return this.locationService.getLocations();
  }
}
