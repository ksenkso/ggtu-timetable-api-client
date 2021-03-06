import ApiClient, {
  Cabinet,
  CreateLessonDto,
  Day,
  Group,
  Lesson,
  Subject,
  Teacher,
  LessonType,
  UpdateLessonDto,
  Week,
} from '../src';

describe('RegularTimetableEndpoint', () => {
  let api: ApiClient;
  let allTeachers: Teacher[];
  let allSubjects: Subject[];
  let allCabinets: Cabinet[];

  async function createLesson(): Promise<{ group: Group; lesson: Lesson }> {
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
      type: LessonType.Lecture,
      week: Week.Top,
      teacherIds: [allTeachers[0].id],
    };
    const created = await api.timetable.create(lesson);
    return { group, lesson: created };
  }

  beforeAll(async () => {
    api = new ApiClient({ baseURL: process.env.API_URL });
    await api.auth.login(
      process.env.ROOT_USER as string,
      process.env.ROOT_PASSWORD as string
    );
    allTeachers = await api.teachers.getAll();
    allSubjects = await api.subjects.getAll();
    allCabinets = await api.cabinets.getAll();
  });

  it('should add a subject in a timetable for a test group', async function() {
    const { group, lesson } = await createLesson();
    expect(lesson.id).toBeDefined();
    expect(lesson.subject).toEqual(allSubjects[0]);
    expect(lesson.cabinet).toEqual(allCabinets[0]);
    expect(lesson.teachers).toHaveLength(1);
    expect(lesson.teachers[0]).toEqual(allTeachers[0]);
    return api.groups.delete(group.id);
  });

  it('should change a subject', async function() {
    const { group, lesson } = await createLesson();
    const toUpdate: UpdateLessonDto = {
      cabinetId: allCabinets[1].id,
      day: Day.Friday,
      week: Week.Bottom,
      index: 1,
      subjectId: allSubjects[1].id,
      type: LessonType.Lab,
      teacherIds: [allTeachers[1].id],
    };
    const updated = await api.timetable.update(lesson.id, toUpdate);
    expect(updated.id).toEqual(lesson.id);
    expect(updated.cabinet).toEqual(allCabinets[1]);
    expect(updated.day).toEqual(toUpdate.day);
    expect(updated.type).toEqual(toUpdate.type);
    expect(updated.subject).toEqual(allSubjects[1]);
    expect(updated.teachers).toHaveLength(1);
    expect(updated.teachers[0]).toEqual(allTeachers[1]);
    return api.groups.delete(group.id);
  });

  it('should delete a subject from a timetable', async function() {
    const { group, lesson } = await createLesson();
    const deletedId = await api.timetable.delete(lesson.id);
    expect(deletedId).toEqual(lesson.id);
    await expect(api.timetable.get(lesson.id)).rejects.toEqual({
      statusCode: 404,
      message: 'Занятие не найдено',
      error: 'Not Found',
    });
    return api.groups.delete(group.id);
  });

  it('should fetch all lessons for the group', function() {
    return api.groups
      .getAll()
      .then(groups => {
        return api.timetable.getForGroup(groups[0].id);
      })
      .then(lessons => {
        expect(lessons).toBeTruthy();
        expect(Object.keys(lessons)).toHaveLength(2);
        expect(lessons[Week.Top]).toBeDefined();
        expect(lessons[Week.Bottom]).toBeDefined();
        const isValidTimetable = Object.keys(lessons).every(weekIndex => {
          const week = lessons[(weekIndex as unknown) as Week];
          return Object.keys(week).every(dayIndex => {
            const day = week[(dayIndex as unknown) as Day];
            return day.every(lesson => {
              return (
                lesson === null ||
                (lesson.teachers &&
                  lesson.teachers.length &&
                  lesson.cabinet &&
                  lesson.cabinet.name &&
                  lesson.subject &&
                  lesson.subject.name)
              );
            });
          });
        });
        expect(isValidTimetable).toEqual(true);
      });
  });
});
