import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {IsAlpha, MaxDate} from 'class-validator';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    @IsAlpha()
    username: string;

    @Column()
    birthDate: Date;

}
