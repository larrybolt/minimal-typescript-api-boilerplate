import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController
} from "routing-controllers";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Account } from "../models/Account";
import { ResponseSchema } from "routing-controllers-openapi";

@JsonController("/accounts")
export class AccountController {
  @InjectRepository(Account)
  private repository: Repository<Account>;

  @Get("/")
  @ResponseSchema(Account)
  getAll() {
    return this.repository.find();
  }
}
