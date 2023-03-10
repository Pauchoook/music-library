import { ObjectId } from "mongoose";

export class CreateCommentDto {
  readonly user_id: ObjectId;
  readonly track_id: ObjectId;
  readonly body: string;
}