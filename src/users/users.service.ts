import {Injectable} from '@nestjs/common';
import {User} from './entity/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async getUser(username: string): Promise<User> {
        return this.userRepository.findOne({username: username});
    }

    async addExtraUser(user: User): Promise<any> {

        return await this.userRepository.save(user);
    }
}
