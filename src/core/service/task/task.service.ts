import {api} from "@/core/api/api-client";
import {TaskQueryParams} from "@/core/dto/task/task-query.params";
import {CreateTaskDto} from "@/core/dto/task/create-task.dto";
import {UpdateTaskDto} from "@/core/dto/task/update-task.dto";

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

    async getById(id: number) {
        return await api.get(this.path+"/"+id);
    }

    async update(id: number, dto: UpdateTaskDto) {
        return await api.put(this.path + "/" + id, dto);
    }

    async changeStatus(id: number) {
        return await api.get(this.path+"/"+id+"/status/done")
    }
}