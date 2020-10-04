import ApiClient, {
  Cabinet,
  CreateLessonDto,
  Day,
  Subject,
  Teacher,
  TimetableEntryType,
  Week,
} from '../src';

describe('RegularTimetableEndpoint', () => {
  let api: ApiClient;
  let allTeachers: Teacher[];
  let allSubjects: Subject[];
  let allCabinets: Cabinet[];

  beforeAll(async () => {
    api = new ApiClient({ baseURL: process.env.API_URL });
    allTeachers = await api.teachers.getAll();
    allSubjects = await api.subjects.getAll();
    allCabinets = await api.cabinets.getAll();
  });

  it('should add a lesson in a timetable for a test group', async function() {
    await api.auth.login(
      process.env.ROOT_USER as string,
      process.env.ROOT_PASSWORD as string
    );
    const group = await api.groups.create({
      name: 'TEST_GROUP',
      facultyId: 1,
      specializationId: 1,
      entranceYear: 2020,
    });
    const lesson: CreateLessonDto = {
      cabinetId: allCabinets[0].id,
      day: Day.Monday,
      groupId: group.id,
      index: 0,
      subjectId: allSubjects[0].id,
      type: TimetableEntryType.Lecture,
      week: Week.Top,
      teacherIds: [allTeachers[0].id],
    };
    const created = await api.timetable.create(lesson);
    expect(created.id).toBeDefined();
    expect(created.subject).toEqual(allSubjects[0]);
    expect(created.cabinet).toEqual(allCabinets[0]);
    expect(created.teachers).toHaveLength(1);
    expect(created.teachers[0]).toEqual(allTeachers[0]);
    return api.groups.delete(created.id);
  });

  it('should fetch all lessons for the group', function() {
    return api.groups
      .getAll()
      .then(groups => {
        return api.timetable.getForGroup(groups[0].id);
      })
      .then(lessons => {
        expect(lessons).toBeTruthy();
        expect(Array.isArray(lessons)).toEqual(true);
        expect(
          lessons.every(lesson => {
            return (
              lesson.teachers &&
              lesson.teachers.length &&
              lesson.cabinet &&
              lesson.cabinet.name &&
              lesson.subject &&
              lesson.subject.name
            );
          })
        ).toEqual(true);
      });
  });
});
