import ApiClient, { Subject } from '../src';
import { CreateSubjectDto } from '../src/interfaces/Subject';

describe('SubjectsEndpoint', function() {
  let api: ApiClient;
  let createdId: number;
  let allSubjects: Subject[];
  beforeAll(async () => {
    api = new ApiClient({ baseURL: process.env.API_URL });
    await api.auth.login(process.env.ROOT_USER as string, process.env.ROOT_PASSWORD as string)
  });

  it('should fetch all subjects from API', function(done) {
    api.subjects.getAll().then(subjects => {
      expect(subjects).toBeTruthy();
      expect(subjects instanceof Array).toEqual(true);
      allSubjects = subjects;
      done();
    });
  });

  it('should fetch one subject', function(done) {
    api.subjects.get(allSubjects[0].id).then(subject => {
      expect(subject).toBeTruthy();
      expect(Array.isArray(subject)).toEqual(false);
      done();
    });
  });

  it('should create a subject', function(done) {
    const subjectDto: CreateSubjectDto = {
      name: 'TEST_SUBJECT',
    };
    api.subjects.create(subjectDto).then(subject => {
      expect(subject).toBeTruthy();
      expect(subject.id).toBeDefined();
      expect(subject.name).toEqual(subjectDto.name);
      createdId = subject.id;
      done();
    });
  });

  it("should change subject's name", function(done) {
    const newName = 'NEW_TEST_NAME';
    api.subjects.update(createdId, { name: newName }).then(subject => {
      expect(subject).toBeTruthy();
      expect(subject.name).toEqual(newName);
      done();
    });
  });

  it('should should delete previously created subject', function(done) {
    api.subjects.delete(createdId).then(deleted => {
      expect(deleted).toEqual(createdId);
      done();
    });
  });
});
