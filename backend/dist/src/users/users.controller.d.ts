import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./dto/user-response.dto").UserResponseDto>;
    findAll(): Promise<import("./dto/user-response.dto").UserResponseDto[]>;
    findOne(id: string): Promise<import("./dto/user-response.dto").UserResponseDto>;
    update(id: string, dto: UpdateUserDto): Promise<import("./dto/user-response.dto").UserResponseDto>;
    remove(id: string): Promise<import("./dto/user-response.dto").UserResponseDto>;
}
