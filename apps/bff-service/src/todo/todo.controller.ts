import { Controller, Get, Inject } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    @Inject(TodoService)
    private todoService: TodoService

    @Get("health")
    public async healthCheck() {
        return this.todoService.healthCheck({})
    }
}
