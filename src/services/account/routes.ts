import { Request, Response } from "express";
import { getAccounts } from "./AccountController";

export default [
  {
    path: "/api/v1/accounts",
    method: "get",
    handler: [
      async ({ }: Request, res: Response) => {
        const result = await getAccounts();
        res.status(200).send(result);
      }
    ]
  }
];
