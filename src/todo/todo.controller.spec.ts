import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoService } from './todo.service';

describe('Todo Controller', () => {
  let controller: TodoController;
  let service: TodoService;
  const createTodoDto: CreateTodoDto = {
    title: 'Todo #1',
    state: false,
    description: '',
  };

  const mockTodo = {
    title: 'Todo #1',
    state: false,
    description: '',
    _id: 'a id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                title: 'Todo #1',
                state: false,
                description: '',
              },
              {
                title: 'Todo #2',
                state: false,
                description: 'descritpion1',
              },
              {
                title: 'Todo #3',
                state: true,
                description: 'descritpion2',
              },
            ]),
            create: jest.fn().mockResolvedValue(createTodoDto),
          },
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  describe('create()', () => {
    it('should create a new todo', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockTodo);

      await controller.create(createTodoDto);
      expect(createSpy).toHaveBeenCalledWith(createTodoDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of todo', async () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          title: 'Todo #1',
          state: false,
          description: '',
        },
        {
          title: 'Todo #2',
          state: false,
          description: 'descritpion1',
        },
        {
          title: 'Todo #3',
          state: true,
          description: 'descritpion2',
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});