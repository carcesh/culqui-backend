import "reflect-metadata";
import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Merchant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}