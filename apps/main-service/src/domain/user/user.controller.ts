import { Controller, Post, Body, Get } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UserReq } from "../../common/decorator/user.decorator";
import { User } from "@prisma/client";
import { Public } from "../../common/decorator/public.decorator";

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }
    // @Public()
    @Get('/me')
    getMe(@UserReq() user: User) {
        return user;
    }
}