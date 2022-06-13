import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/create-todo.dto';
import { Todo } from './schemas/todo.schema';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    await this.todoService.create(createTodoDto);
  }

  @Put(':id')
  async update(@Body() updateTodoDto: UpdateTodoDto) {
    await this.todoService.update(updateTodoDto);
  }

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}