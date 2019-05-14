import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from './entity/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateResponseDTO} from './dto/create-response.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async getUser(username: string) {
        return this.userRepository.findOne(
            {username},
        );
    }

    async calculateIfBirth(username: string) {
        const user = await this.getUser(username);
        if (!user) {
            this.noUser('user: ' + username + ' not exist in database');
        }
        const result = this.checkIfBday(user.birthDate, this.getToday());
        const response = new CreateResponseDTO();
        if (result === 0 ) {
            response.message = 'Hello, ' + username + '! Happy birthday!';
        } else {
            response.message = 'Hello, ' + username + '! Your birthday is in ' + result + ' day(s)';
        }
        return response;
    }

    checkIfBday(userDate: Date, today: Date) {
        if (today.getMonth() === userDate.getMonth()) {
            if (today.getDate() === userDate.getDate()) {
                return 0;
            }
        }
        let diff =  today.getDate() - userDate.getDate();
        if (diff < 0) {
            const year = new Date();
            year.setMonth(11, 31);
            diff = this.countDaysinYear(year) + diff;
        }
        return diff;
    }

    getToday() {
        return new Date();
    }

    countDaysinYear(date) {
        return (Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
    }

    async addExtraUser(user: User): Promise<any> {

        return await this.userRepository.save(user);
    }

    noUser(message: string) {
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: message,
        }, 400);
    }
}
