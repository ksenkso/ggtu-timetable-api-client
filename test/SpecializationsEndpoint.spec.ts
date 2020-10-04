import ApiClient from '../src';
import {
  CreateSpecializationDto,
  Specialization,
  UpdateSpecializationDto,
} from '../src/interfaces/Specialization';

describe('SpecializationsEndpoint', function() {
  let api: ApiClient;
  let createdId: number;
  let allFaculties: Specialization[];
  beforeAll(() => {
    api = new ApiClient({ baseURL: process.env.API_URL });
  });

  it('should fetch all specs from API', function() {
    return api.specs.getAll().then(specs => {
      expect(specs).toBeTruthy();
      expect(specs instanceof Array).toEqual(true);
      allFaculties = specs;
    });
  });

  it('should fetch one spec', function() {
    return api.specs.get(allFaculties[0].id).then(spec => {
      expect(spec).toBeTruthy();
      expect(Array.isArray(spec)).toEqual(false);
    });
  });

  it('should create a spec', function() {
    const specDto: CreateSpecializationDto = {
      name: 'TEST_SPEC',
      code: '00.00.00',
    };
    return api.specs.create(specDto).then(spec => {
      expect(spec).toBeTruthy();
      expect(spec.id).toBeDefined();
      expect(spec.name).toEqual(specDto.name);
      createdId = spec.id;
    });
  });

  it("should change spec's name, floor and number", function() {
    const updateDto: UpdateSpecializationDto = {
      name: 'NEW_SPEC_NAME',
      code: '99.99.99',
    };
    return api.specs.update(createdId, updateDto).then(spec => {
      expect(spec).toBeTruthy();
      expect(spec.name).toEqual(updateDto.name);
    });
  });

  it('should should delete previously created spec', function() {
    return api.specs.delete(createdId).then(deleted => {
      expect(deleted).toEqual(createdId);
    });
  });
});
