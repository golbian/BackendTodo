import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto, UpdateTodoDto } from './dto/create-todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = await this.todoModel.create(createTodoDto);
    return createdTodo;
  }

  async update(updateTodoDto: UpdateTodoDto) {
    const res =  await this.todoModel.updateOne({_id: updateTodoDto._id} , updateTodoDto).exec();
    return res;
  }

  async findAll(): Promise<Todo[]> {
    const res = await this.todoModel.find().exec();
    return res;
  }

  async findOne(id: string): Promise<Todo> {
     const res = await this.todoModel.findOne({ _id: id }).exec();
     return res;
  }

  async delete(id: string) {
    const deletedTodo = await this.todoModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedTodo;
  }
}