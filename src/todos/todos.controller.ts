import { Controller, Get, Post, Put, Patch, Delete, Body, Param } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // Lấy tất cả Todo
  @Get()
  getAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  // Lấy 1 Todo theo id
  @Get(':id')
  getOne(@Param('id') id: number): Promise<Todo> {
    return this.todosService.findOne(+id);
  }

  // Thêm Todo mới
  @Post()
  create(@Body() todoData: Partial<Todo>): Promise<Todo> {
    return this.todosService.create(todoData);
  }

  // Update toàn bộ Todo
  @Put(':id')
  update(@Param('id') id: number, @Body() todoData: Partial<Todo>): Promise<Todo> {
    return this.todosService.update(+id, todoData);
  }

  // Toggle isCompleted
  @Patch(':id')
  toggleComplete(@Param('id') id: number, @Body('isCompleted') isCompleted: boolean): Promise<Todo> {
    return this.todosService.update(+id, { isCompleted });
  }

  // Xóa Todo
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.todosService.remove(+id);
  }
}
