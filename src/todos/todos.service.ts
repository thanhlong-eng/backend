import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  // Lấy tất cả Todo
  findAll(): Promise<Todo[]> {
    return this.todoRepository.find({ order: { id: 'DESC' } });
  }

  // Lấy 1 Todo, ném lỗi nếu không tìm thấy
  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
    return todo;
  }

  // Tạo Todo mới
  async create(todoData: Partial<Todo>): Promise<Todo> {
    if (todoData.isCompleted === undefined) todoData.isCompleted = false;
    const todo = this.todoRepository.create(todoData);
    return this.todoRepository.save(todo);
  }

  // Cập nhật Todo
  async update(id: number, todoData: Partial<Todo>): Promise<Todo> {
    const todo = await this.findOne(id); // sẽ ném NotFoundException nếu không tồn tại
    Object.assign(todo, todoData);
    return this.todoRepository.save(todo);
  }

  // Xóa Todo
  async remove(id: number): Promise<void> {
    const result = await this.todoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
  }
}
