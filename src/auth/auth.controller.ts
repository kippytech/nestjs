import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  //HttpException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
//import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
//import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  //@UseGuards(AuthGuard('local'))
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   const user = this.authService.create(createAuthDto);
  //   //if (!user) throw new HttpException('invalid creds', 401);
  //   return user;
  //}

  @Get()
  @UseGuards(JwtGuard)
  status(@Req() req: Request) {
    console.log('req.user', req.user);
    return req.user;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}