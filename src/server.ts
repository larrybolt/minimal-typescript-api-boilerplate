import 'reflect-metadata';
import { Express } from 'express'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { getFromContainer, MetadataStorage } from 'class-validator' // tslint:disable-line
import {createConnection, useContainer as typeormUseContainer} from "typeorm";
import {createExpressServer, getMetadataArgsStorage, useContainer as routingControllerUseContainer} from "routing-controllers";
import { routingControllersToSpec } from 'routing-controllers-openapi'

import SwaggerUIExpress from 'swagger-ui-express'

import {Container} from "typedi";
import swaggerUiExpress = require('swagger-ui-express');

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});
 
typeormUseContainer(Container);
routingControllerUseContainer(Container);
createConnection(); 

const routingControllersOptions = {
  controllers: [__dirname + "/controllers/*.js"],
  // middlewares: [__dirname + "/middlewares/*.js"],
  // interceptors: [__dirname + "/interceptors/*.js"],
};
const app: Express = createExpressServer(routingControllersOptions);

// Parse class-validator classes into JSON Schema:
const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas
const schemas = validationMetadatasToSchemas(metadatas, {
  refPointerPrefix: '#/components/schemas/'
})

// Parse routing-controllers classes into OpenAPI spec:
const storage = getMetadataArgsStorage()
const spec = routingControllersToSpec(storage, routingControllersOptions, {
  components: {
    schemas,
    securitySchemes: {
      basicAuth: {
        scheme: 'basic',
        type: 'http'
      }
    }
  },
  info: {
    description: 'Generated with `routing-controllers-openapi`',
    title: 'A sample API',
    version: '1.0.0'
  }
})

app.get('/', (_req, res) => { res.redirect('/api-docs') });
app.get('/swagger.json', (_req, res) => res.json(spec));
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(null, {
  swaggerOptions: {
    url: '/swagger.json'
  }
}));

const { PORT = 3000 } = process.env;
app.listen(PORT)
