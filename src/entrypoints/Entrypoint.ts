import {AxiosInstance} from "axios";
import {WithId} from "../interfaces";

export default class Entrypoint<T> {
    constructor(protected axios: AxiosInstance, protected route: string) {

    }
    getAll(): Promise<WithId<T>[]> {
        return this.axios.get(this.route).then(res => res.data as WithId<T>[]);
    }

    get(id: number): Promise<WithId<T>> {
        return this.axios.get(`${this.route}/${id}`).then(res => res.data as WithId<T>);
    }

    delete(id: number): Promise<number> {
        return this.axios.delete(`${this.route}/${id}`).then(res => res.data as number);
    }

    update(id: number, data: Partial<T>): Promise<WithId<T>> {
        return this.axios.patch(`${this.route}/${id}`, data).then(res => res.data as WithId<T>);
    }

    create(data: T): Promise<WithId<T>> {
        return this.axios.post(this.route, data).then(res => res.data as WithId<T>);
    }
}
