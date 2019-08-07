import 'reflect-metadata';

import {createConnection, useContainer as typeormUseContainer} from "typeorm";
import {createExpressServer, useContainer as routeringControllerUseContainer} from "routing-controllers";
import {Container} from "typedi";

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});
 
typeormUseContainer(Container);
routeringControllerUseContainer(Container);
createConnection(); 

const { PORT = 3000 } = process.env;

createExpressServer({
  controllers: [__dirname + "/controllers/*.js"],
  // middlewares: [__dirname + "/middlewares/*.js"],
  // interceptors: [__dirname + "/interceptors/*.js"],
}).listen(PORT);