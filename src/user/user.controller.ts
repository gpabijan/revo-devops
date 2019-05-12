import {Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Put} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDTO} from './dto/create-user.dto';
import {User} from './entity/user.entity';
import {Validator} from 'class-validator';

const validator = new Validator();

@Controller('/')
export class UserController {

    constructor(private usersService: UserService) {}

    @Get('hello/:username')
    findUser(@Param('username') username) {
        return this.usersService.calculateIfBirth(username);
    }

    @Put('hello/:username')
    async newUser(@Param('username') username, @Body() requestData: CreateUserDTO): Promise<any> {

        Logger.log('Adding new user');
        const userData = new User();
        userData.username = username;
        userData.birthDate = new Date(requestData.dateOfBirth);

        if (! validator.maxDate(userData.birthDate, new Date())) {
            this.badRequest('birthday must be before today');
        }
        if (! validator.isAlpha(userData.username)) {
            this.badRequest('username must contain only letters (a-zA-Z)');
        }
        return this.usersService.addExtraUser(userData);
    }

    badRequest(message: string) {
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: message,
        }, 400);
    }

}
