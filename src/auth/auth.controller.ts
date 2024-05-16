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
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
// if you want to guard the whole controller
// @UseGuards(AuthGuard) // AuthGuard not yet defined
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

  @Get('daggy')
  @Roles(['ADMIN', 'OWNER'])
  @UseGuards(AuthGuard, RolesGuard)
  getUser() {
    return { username: 'daggy' };
  }

  @Get('test')
  @UseGuards(AuthGuard)
  getUserTest() {
    return { test: 'test' };
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
