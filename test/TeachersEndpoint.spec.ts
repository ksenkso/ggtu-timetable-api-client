import ApiClient, { Teacher } from '../src';
import { CreateTeacherDto } from '../src/interfaces/Teacher';

describe('TeachersEndpoint', function() {
  let api: ApiClient;
  let createdId: number;
  let allTeachers: Teacher[];
  beforeAll(async () => {
    api = new ApiClient({ baseURL: process.env.API_URL });
    await api.auth.login(
      process.env.ROOT_USER as string,
      process.env.ROOT_PASSWORD as string
    );
  });

  it('should fetch all teachers from API', function(done) {
    api.teachers.getAll().then(teachers => {
      expect(teachers).toBeTruthy();
      expect(teachers instanceof Array).toEqual(true);
      allTeachers = teachers;
      done();
    });
  });

  it('should fetch one teacher', function(done) {
    api.teachers.get(allTeachers[0].id).then(teacher => {
      expect(teacher).toBeTruthy();
      expect(Array.isArray(teacher)).toEqual(false);
      done();
    });
  });

  it('should create a teacher', function(done) {
    const teacherDto: CreateTeacherDto = {
      name: 'TEST_TEACHER',
    };
    api.teachers.create(teacherDto).then(teacher => {
      expect(teacher).toBeTruthy();
      expect(teacher.id).toBeDefined();
      expect(teacher.name).toEqual(teacherDto.name);
      createdId = teacher.id;
      done();
    });
  });

  it("should change teacher's name", function(done) {
    const newName = 'NEW_TEST_NAME';
    api.teachers.update(createdId, { name: newName }).then(teacher => {
      expect(teacher).toBeTruthy();
      expect(teacher.name).toEqual(newName);
      done();
    });
  });

  it('should should delete previously created teacher', function(done) {
    api.teachers.delete(createdId).then(deleted => {
      expect(deleted).toEqual(createdId);
      done();
    });
  });
});
