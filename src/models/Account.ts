import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import { IsString, IsOptional, IsNumber, IsInt } from "class-validator";

@Entity()
export class Account {
    @IsInt()
    @IsOptional()
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @Column()
    name: string;

    @IsOptional()
    @IsString()
    @Column()
    description: string;
}