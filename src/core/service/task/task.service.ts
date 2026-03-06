import {api} from "@/core/api/api-client";
import {TaskQueryParams} from "@/core/dto/task/task-query.params";

export class TaskService {
    private readonly path: string = 'v1/Task'

    async getAll(query: TaskQueryParams) {
        return await api.get(this.path, {
            params: query
        });
    }

}