import ApiClient from '../src';
import {
  CreateFacultyDto,
  Faculty,
  UpdateFacultyDto,
} from '../src/interfaces/Faculty';

describe('FacultiesEndpoint', function() {
  let api: ApiClient;
  let createdId: number;
  let allFaculties: Faculty[];
  beforeAll(() => {
    api = new ApiClient({ baseURL: process.env.API_URL });
  });

  it('should fetch all faculties from API', function(done) {
    api.faculties.getAll().then(faculties => {
      expect(faculties).toBeTruthy();
      expect(faculties instanceof Array).toEqual(true);
      allFaculties = faculties;
      done();
    });
  });

  it('should fetch one faculty', function(done) {
    api.faculties.get(allFaculties[0].id).then(faculty => {
      expect(faculty).toBeTruthy();
      expect(Array.isArray(faculty)).toEqual(false);
      done();
    });
  });

  it('should create a faculty', function(done) {
    const facultyDto: CreateFacultyDto = {
      name: 'TEST_FACULTY',
    };
    api.faculties.create(facultyDto).then(faculty => {
      expect(faculty).toBeTruthy();
      expect(faculty.id).toBeDefined();
      expect(faculty.name).toEqual(facultyDto.name);
      createdId = faculty.id;
      done();
    });
  });

  it("should change faculty's name, floor and number", function(done) {
    const updateDto: UpdateFacultyDto = {
      name: 'NEW_CABINET_NAME',
    };
    api.faculties.update(createdId, updateDto).then(faculty => {
      expect(faculty).toBeTruthy();
      expect(faculty.name).toEqual(updateDto.name);
      done();
    });
  });

  it('should should delete previously created faculty', function(done) {
    api.faculties.delete(createdId).then(deleted => {
      expect(deleted).toEqual(createdId);
      done();
    });
  });
});
