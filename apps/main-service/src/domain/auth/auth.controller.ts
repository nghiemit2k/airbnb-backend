import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from '../../common/decorator/public.decorator';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    // TODO: swagger
    @Public()
    @Post('auth/sign-in')
    signIn(@Body() data: SignInDto) {
        return this.authService.signIn(data.email, data.password);
    }
}