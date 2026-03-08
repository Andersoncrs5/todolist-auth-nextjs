import {api} from "@/core/api/api-client";
import {TaskQueryParams} from "@/core/dto/task/task-query.params";
import {CreateTaskDto} from "@/core/dto/task/create-task.dto";

export class TaskService {
    private readonly path: string = 'v1/Task'

    async getAll(query: TaskQueryParams) {
        return await api.get(this.path, {
            params: query
        });
    }

    async delete(id: number) {
        return await api.delete(this.path+"/"+id)
    }

    async create(dto: CreateTaskDto) {
        return await api.post(this.path, dto);
    }

}