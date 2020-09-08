export type WithId<T> = T & {id: number};

export enum EntityType {
    Teacher,
    Cabinet,
    Building,
    Lesson,
    PatchEntry,
    Group,
    TimetableEntry
}
