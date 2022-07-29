;
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from './guards/local.auth.guard';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login.user.dto';



@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



  
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'Logged in successfully.',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)


  async login(@Body() loginRequestDto: LoginRequestDto) {
    return this.authService.login(loginRequestDto)
  }

}

