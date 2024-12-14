import { Controller, Post, Body } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }
}