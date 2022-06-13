import { ObjectId } from "mongoose";

export class CreateTodoDto {
    readonly title: string;
    readonly state: boolean;
    readonly description: string;
  }

  export class UpdateTodoDto {
    _id: string;
    title: string;
    state: boolean;
    description: string;
  }