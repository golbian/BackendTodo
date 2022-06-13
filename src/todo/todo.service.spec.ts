import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { getModelToken } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import { Model } from 'mongoose';

const mockTodo = {
  title: 'Todo #1',
  description: 'Desc #1',
  state: false,
};

describe('TodoService', () => {
  let service: TodoService;
  let model: Model<Todo>;

  const todoArray = [
    {
      title: 'Todo #1',
      description: 'Desc #1',
      state: true,
    },
    {
      title: 'Todo #2',
      description: 'Desc #2',
      state: false,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken('Todo'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockTodo),
            constructor: jest.fn().mockResolvedValue(mockTodo),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    model = module.get<Model<Todo>>(getModelToken('Todo'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all todo', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(todoArray),
    } as any);
    const todo = await service.findAll();
    expect(todo).toEqual(todoArray);
  });

  it('should insert a new todo', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        title: 'Todo #1',
        description: 'Desc #1',
        state: false,
      }),
    );
    const newTodo = await service.create({
      title: 'Todo #1',
      description: 'Desc #1',
      state: true,
    });
    expect(newTodo).toEqual(mockTodo);
  });
});