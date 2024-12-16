import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../../database/database.service";
import { CreateUserDto } from "./dto/create-user.dto";
import bcrypt from "bcrypt";
@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService) { }

    async createUser(createUserDto: CreateUserDto) {
        const hashedPassword = await this.hashPassword(createUserDto.password);
        const userData = {
            email: createUserDto.email,
            password: hashedPassword,
            username: createUserDto.username,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
        }

        return await this.databaseService.user.create({
            data: userData,
        });
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
    comparePassword(password: string, hashedPassword: string) {
        return bcrypt.compare(password, hashedPassword);
    }

    async findOneOrFailByEmail(email: string) {
        const user = await this.databaseService.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}
