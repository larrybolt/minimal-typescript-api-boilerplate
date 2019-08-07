import { getCustomRepository } from "typeorm";
import { Account } from "../../models/Account";
import { AccountRepository } from "../../repositories/AccountRepository";

export const getAccounts = async () => {
  const accountRepository = getCustomRepository(AccountRepository);
  return accountRepository.find();
};
