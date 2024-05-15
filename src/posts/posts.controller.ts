import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateGroupPostDto } from './dto/create-group-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() { employeeId, ...createPostDto }: CreatePostDto) {
    return this.postsService.create(employeeId, createPostDto);
  }

  // /posts/group
  @Post('group')
  @UsePipes(ValidationPipe)
  createGroupPost(
    @Body() { employeeIds, ...createGroupPostDto }: CreateGroupPostDto,
  ) {
    return this.postsService.createGroupPost(employeeIds, createGroupPostDto);
  }

  @Get('group')
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
