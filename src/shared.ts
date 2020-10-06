import ApiClient, {
  CreateLessonDto,
  CreatePatchDto,
  Day,
  EntityType,
  Group,
  Lesson,
  LessonType,
  Patch,
  Week,
} from './index';
import { GroupCreateDto } from './interfaces/Group';

export class EntityLoader {
  private entities: Partial<Record<EntityType, any[]>> = {};

  private static instance?: EntityLoader;

  private constructor() {
    this.reset();
  }

  static getInstance(): EntityLoader {
    if (!EntityLoader.instance) {
      EntityLoader.instance = new EntityLoader();
    }
    return EntityLoader.instance;
  }

  reset() {
    this.entities = {};
  }

  loaded(type: EntityType): boolean {
    return !!this.entities[type];
  }

  async loadEntities(
    api: ApiClient,
    types: EntityType[],
    forceAll = false
  ): Promise<{ [key in EntityType]: any[] }> {
    await Promise.all(
      types
        .filter(type => forceAll || !this.loaded(type))
        .map(type => api.getEndpoint(type).getAll())
    ).then(results => {
      results.forEach((result, index) => {
        this.entities[types[index]] = result;
      });
    });
    return this.entities as { [key in EntityType]: any[] };
  }
}

export async function createPatch(
  api: ApiClient,
  patchOptions: Partial<CreatePatchDto> = {}
): Promise<{ group: Group; patch: Patch }> {
  const loader = EntityLoader.getInstance();
  const entities = await loader.loadEntities(api, [
    EntityType.Subject,
    EntityType.Cabinet,
    EntityType.Teacher,
  ]);
  const group = await createGroup(api);
  const patch: CreatePatchDto = Object.assign(
    {
      cabinetId: entities[EntityType.Cabinet][0].id,
      dates: [new Date(2020, 10, 10).toISOString()],
      groupId: group.id,
      index: 0,
      subjectId: entities[EntityType.Subject][0].id,
      type: LessonType.Lab,
      teacherIds: [entities[EntityType.Teacher][0].id],
    },
    patchOptions
  );
  const created = await api.patches.create(patch);
  return { group, patch: created };
}

export async function createGroup(
  api: ApiClient,
  groupOptions: Partial<GroupCreateDto> = {}
) {
  const loader = EntityLoader.getInstance();
  const entities = await loader.loadEntities(api, [
    EntityType.Faculty,
    EntityType.Specialization,
  ]);
  return api.groups.create(
    Object.assign(
      {
        name: 'TEST_GROUP',
        facultyId: entities[EntityType.Faculty][0].id,
        specializationId: entities[EntityType.Specialization][0].id,
        entranceYear: 2020,
      },
      groupOptions
    )
  );
}

export async function createLesson(
  api: ApiClient,
  lessonOptions: Partial<CreateLessonDto> = {}
): Promise<{ group: Group; lesson: Lesson }> {
  const loader = EntityLoader.getInstance();
  const entities = await loader.loadEntities(api, [
    EntityType.Subject,
    EntityType.Cabinet,
    EntityType.Teacher,
  ]);
  const group = await createGroup(api);
  const lesson: CreateLessonDto = Object.assign(
    {
      cabinetId: entities[EntityType.Cabinet][0].id,
      day: Day.Monday,
      groupId: group.id,
      index: 0,
      subjectId: entities[EntityType.Subject][0].id,
      type: LessonType.Lecture,
      week: Week.Top,
      teacherIds: [entities[EntityType.Teacher][0].id],
    },
    lessonOptions
  );
  const created = await api.timetable.create(lesson);
  return { group, lesson: created };
}
