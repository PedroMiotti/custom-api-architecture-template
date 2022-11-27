import buildDevLogger from './logger.dev';
import buildProdLogger from './logger.prod';
import { Logger } from "winston";

let logger: Logger;

if(process.env.NODE_ENV === 'development')
    logger = buildDevLogger;
else
    logger = buildProdLogger;

export default logger;