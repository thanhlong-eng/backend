import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { Todo } from './todos/entities/todo.entity';
import { User } from './auth/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, // XAMPP MySQL default
      username: 'root',
      password: '', // XAMPP mặc định không có password
      database: 'todo_app',
      entities: [Todo, User],
      synchronize: true,
    }),
    TodosModule,
    AuthModule,
  ],
})
export class AppModule {}
