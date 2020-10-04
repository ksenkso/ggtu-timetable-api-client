import ApiClient, { Building, Cabinet } from '../src';
import { CreateCabinetDto, UpdateCabinetDto } from '../src/interfaces/Cabinet';

describe('CabinetsEndpoint', function() {
  let api: ApiClient;
  let createdId: number;
  let allBuildings: Building[];
  let allCabinets: Cabinet[];
  beforeAll(() => {
    api = new ApiClient({ baseURL: process.env.API_URL });
    return api.buildings.getAll().then(buildings => {
      allBuildings = buildings;
    });
  });

  it('should fetch all cabinets from API', function(done) {
    api.cabinets.getAll().then(cabinets => {
      expect(cabinets).toBeTruthy();
      expect(cabinets instanceof Array).toEqual(true);
      allCabinets = cabinets;
      done();
    });
  });

  it('should fetch one cabinet', function(done) {
    api.cabinets.get(allCabinets[0].id).then(cabinet => {
      expect(cabinet).toBeTruthy();
      expect(Array.isArray(cabinet)).toEqual(false);
      done();
    });
  });

  it('should create a cabinet', function(done) {
    const cabinetDto: CreateCabinetDto = {
      buildingId: allBuildings[0].id,
      floor: 0,
      number: '400',
      name: 'TEST_BUILDING',
    };
    api.cabinets.create(cabinetDto).then(cabinet => {
      expect(cabinet).toBeTruthy();
      expect(cabinet.id).toBeDefined();
      expect(cabinet.name).toEqual(cabinetDto.name);
      expect(cabinet.building).toEqual(allBuildings[0]);
      createdId = cabinet.id;
      done();
    });
  });

  it("should change cabinet's name, floor and number", function(done) {
    const updateDto: UpdateCabinetDto = {
      name: 'NEW_CABINET_NAME',
      floor: 1,
      number: '500',
    };
    api.cabinets.update(createdId, updateDto).then(cabinet => {
      expect(cabinet).toBeTruthy();
      expect(cabinet.name).toEqual(updateDto.name);
      expect(cabinet.floor).toEqual(updateDto.floor);
      expect(cabinet.number).toEqual(updateDto.number);
      expect(cabinet.building).toEqual(allBuildings[0]);
      done();
    });
  });

  it("should change cabinet's building", function() {
    api.cabinets
      .update(createdId, { buildingId: allBuildings[1].id })
      .then(updated => {
        expect(updated).toBeTruthy();
        expect(updated.building).toEqual(allBuildings[1]);
      });
  });

  it('should should delete previously created cabinet', function(done) {
    api.cabinets.delete(createdId).then(deleted => {
      expect(deleted).toEqual(createdId);
      done();
    });
  });
});
