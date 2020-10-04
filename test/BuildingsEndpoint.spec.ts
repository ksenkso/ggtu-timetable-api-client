import ApiClient, { Building } from '../src';
import { CreateBuildingDto } from '../src/interfaces/Building';

describe('GroupsEndpoint', function() {
  let api: ApiClient;
  let createdId: number;
  let allBuildings: Building[];
  beforeAll(async () => {
    api = new ApiClient({ baseURL: process.env.API_URL });
    await api.auth.login(process.env.ROOT_USER as string, process.env.ROOT_PASSWORD as string)
  });

  it('should fetch all buildings from API', function(done) {
    api.buildings.getAll().then(buildings => {
      expect(buildings).toBeTruthy();
      expect(buildings instanceof Array).toEqual(true);
      allBuildings = buildings;
      done();
    });
  });

  it('should fetch one building', function(done) {
    api.buildings.get(allBuildings[0].id).then(building => {
      expect(building).toBeTruthy();
      expect(Array.isArray(building)).toEqual(false);
      done();
    });
  });

  it('should create a building', function(done) {
    const buildingDto: CreateBuildingDto = {
      name: 'TEST_BUILDING',
    };
    api.buildings.create(buildingDto).then(building => {
      expect(building).toBeTruthy();
      expect(building.id).toBeDefined();
      expect(building.name).toEqual(buildingDto.name);
      createdId = building.id;
      done();
    });
  });

  it("should change building's name", function(done) {
    const newName = 'NEW_TEST_NAME';
    api.buildings.update(createdId, { name: newName }).then(building => {
      expect(building).toBeTruthy();
      expect(building.name).toEqual(newName);
      done();
    });
  });

  it('should should delete previously created building', function(done) {
    api.buildings.delete(createdId).then(deleted => {
      expect(deleted).toEqual(createdId);
      done();
    });
  });
});
