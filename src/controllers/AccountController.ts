import {Controller, Param, Body, Get, Post, Put, Delete} from "routing-controllers";
import {Repository} from "typeorm";
import {InjectRepository} from "typeorm-typedi-extensions";
import { Account } from "../models/Account";

@Controller("/accounts")
export class UserController {
    @InjectRepository(Account)
    private repository: Repository<Account>;

    @Get("/")
    getAll() {
        return this.repository.find();
    }
}