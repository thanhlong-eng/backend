import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/entities/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,         // port MySQL docker của bạn
      username: 'root',
      password: '123456',
      database: 'todo_app',
      entities: [Todo],
      synchronize: true,   // tự tạo bảng, chỉ dùng dev
    }),
    TodosModule,
  ],
})
export class AppModule {}
