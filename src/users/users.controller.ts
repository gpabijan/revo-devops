import {Body, Controller, Get, Logger, Param, Put} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDTO} from './dto/create-user.dto';
import {User} from './entity/user.entity';
import {validate} from 'class-validator';

@Controller('/')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('hello/:username')
    findUser(@Param('username') username): Promise<User> {
        return this.usersService.getUser(username);
    }

    @Get('hello')
    findUser1(): Promise<User> {
        return this.usersService.getUser('bla');
    }

    @Put('hello/:username')
    async newUser(@Param('username') username, @Body() requestData: CreateUserDTO): Promise<any> {

        Logger.log('Adding new user');
        const userData = new User();
        userData.username = username;
        // birthDate = YYYY-MM-DD
        userData.birthDate = requestData.dateOfBirth;
        validate(userData).then(errors => {
            // ...
        });
    }
}
