import ApiClient, { Group } from '../src';
import { GroupCreateDto } from '../src/interfaces/Group';
import { Specialization } from '../src/interfaces/Specialization';
import { Faculty } from '../src/interfaces/Faculty';

describe('GroupsEndpoint', function() {
  let api: ApiClient;
  let createdId: number;
  let allGroups: Group[];
  let allSpecs: Specialization[];
  let allFaculties: Faculty[];
  beforeAll(() => {
    api = new ApiClient({ baseURL: process.env.API_URL });
    return Promise.all([
      api.specs.getAll().then(specs => {
        allSpecs = specs;
      }),
      api.faculties.getAll().then(faculties => {
        allFaculties = faculties;
      }),
    ]);
  });

  it('should fetch all groups from API', function(done) {
    api.groups.getAll().then(groups => {
      expect(groups).toBeTruthy();
      expect(groups instanceof Array).toEqual(true);
      allGroups = groups;
      done();
    });
  });

  it('should fetch one group', function(done) {
    api.groups.get(allGroups[0].id).then(group => {
      expect(group).toBeTruthy();
      expect(Array.isArray(group)).toEqual(false);
      done();
    });
  });

  it('should create a group', function(done) {
    const mockGroup: GroupCreateDto = {
      name: 'TEST_GROUP',
      facultyId: allFaculties[0].id,
      specializationId: allSpecs[0].id,
      entranceYear: 2019,
    };
    api.groups.create(mockGroup).then(group => {
      expect(group).toBeTruthy();
      expect(group.id).toBeDefined();
      expect(group.name).toEqual(mockGroup.name);
      expect(group.entranceYear).toEqual(mockGroup.entranceYear);
      expect(group.facultyId).toEqual(mockGroup.facultyId);
      expect(group.faculty).toEqual(allFaculties[0]);
      expect(group.specializationId).toEqual(mockGroup.specializationId);
      expect(group.specialization).toEqual(allSpecs[0]);
      createdId = group.id;
      done();
    });
  });

  it("should change group's name", function(done) {
    const newName = 'NEW_TEST_NAME';
    api.groups.update(createdId, { name: newName }).then(group => {
      expect(group).toBeTruthy();
      expect(group.name).toEqual(newName);
      done();
    });
  });

  it('should change specialization of the group', function(done) {
    api.groups
      .update(createdId, { specializationId: allSpecs[1].id })
      .then(updated => {
        expect(updated).toBeTruthy();
        expect(updated.specialization).toEqual(allSpecs[1]);
        done();
      });
  });
  it('should change faculty of the group', function(done) {
    api.groups
      .update(createdId, { facultyId: allFaculties[1].id })
      .then(updated => {
        expect(updated).toBeTruthy();
        expect(updated.faculty).toEqual(allFaculties[1]);
        done();
      });
  });

  it('should delete previously created group', function() {
    api.groups.delete(createdId).then(deletedId => {
      expect(deletedId).toEqual(createdId);
    });
  });
});
