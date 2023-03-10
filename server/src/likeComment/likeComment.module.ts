import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Comment, CommentSchema } from "src/track/schemas/comment.schema";
import { LikeCommentController } from "./likeComment.controller";
import { LikeCommentService } from "./likeComment.service";
import { LikeComment, LikeCommentSchema } from "./schemas/likeComment.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}]),
    MongooseModule.forFeature([{name: LikeComment.name, schema: LikeCommentSchema}])
  ],
  controllers: [LikeCommentController],
  providers: [LikeCommentService]
})
export class LikeCommentModule {}