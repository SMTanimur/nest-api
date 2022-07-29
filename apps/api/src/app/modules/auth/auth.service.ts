import { LoginRequestDto } from './dto/login.user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDocument } from '../user/models/user.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.usersService.findOne(email);

    if (user && (await user.comparePassword(password))) {
      return user;
    }
    return null;
  }

  async login(loginRequestDto: LoginRequestDto) {
    const user = await this.validateUser(
      loginRequestDto.email,
      loginRequestDto.password
    );
    if(!user) throw new UnauthorizedException('email or password is incorrect')
    return user
  }
}
