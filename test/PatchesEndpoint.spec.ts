import ApiClient, { EntityType, LessonType, UpdatePatchDto } from '../src';
import { createLesson, createPatch, EntityLoader } from '../src/shared';

describe('RegularTimetableEndpoint', () => {
  let api: ApiClient;
  let entities: { [key in EntityType]: any[] };

  beforeAll(async () => {
    api = new ApiClient({ baseURL: process.env.API_URL });
    await api.auth.login(
      process.env.ROOT_USER as string,
      process.env.ROOT_PASSWORD as string
    );
    const loader = EntityLoader.getInstance();
    entities = await loader.loadEntities(api, [
      EntityType.Subject,
      EntityType.Cabinet,
      EntityType.Teacher,
    ]);
  });

  it('should add a patch in a timetable for a test group', async function() {
    const { group, patch } = await createPatch(api);
    expect(patch.id).toBeDefined();
    expect(patch.subject).toEqual(entities[EntityType.Subject][0]);
    expect(patch.cabinet).toEqual(entities[EntityType.Cabinet][0]);
    expect(patch.teachers).toHaveLength(1);
    expect(patch.teachers[0]).toEqual(entities[EntityType.Teacher][0]);
    return api.groups.delete(group.id);
  });

  it('should change a patch', async function() {
    const { group, patch } = await createPatch(api);
    const toUpdate: UpdatePatchDto = {
      cabinetId: entities[EntityType.Cabinet][1].id,
      index: 1,
      subjectId: entities[EntityType.Subject][1].id,
      type: LessonType.Lab,
      teacherIds: [entities[EntityType.Teacher][1].id],
      dates: [
        new Date(2020, 10, 11).toISOString(),
        new Date(2020, 10, 12).toISOString(),
      ],
    };
    const updated = await api.patches.update(patch.id, toUpdate);
    expect(updated.id).toEqual(patch.id);
    expect(updated.cabinet).toEqual(entities[EntityType.Cabinet][1]);
    expect(updated.type).toEqual(toUpdate.type);
    expect(updated.subject).toEqual(entities[EntityType.Subject][1]);
    expect(updated.teachers).toHaveLength(1);
    expect(updated.teachers[0]).toEqual(entities[EntityType.Teacher][1]);
    expect(updated.dates).toHaveLength(2);
    return api.groups.delete(group.id);
  });

  it('should delete a patch from a timetable', async function() {
    const { group, lesson } = await createLesson(api);
    const deletedId = await api.patches.delete(lesson.id);
    expect(deletedId).toEqual(lesson.id);
    await expect(api.patches.get(lesson.id)).rejects.toEqual({
      statusCode: 404,
      message: 'Занятие не найдено',
      error: 'Not Found',
    });
    return api.groups.delete(group.id);
  });

  it('should fetch all patches for the group', function() {
    return api.groups
      .getAll()
      .then(groups => {
        return api.patches.getForGroup(groups[0].id);
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
