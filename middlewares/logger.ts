import winston from 'winston';
const format = winston.format;

export const getRoute = (c: any) => {
  const { method, url , path} = c.request;
  return `${method} ${url}${path}`;
}

export const logger = winston.createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf((info : any) => `[${info.level}] - ${info.timestamp} - ${info.message}`),
    format.errors({ stack: true }),
    //format.json()
  ),
  transports: [
    new winston.transports.Console({ level: 'debug' }),
    new winston.transports.File({ filename: './log/error.log', level: 'error' }),
    new winston.transports.File({ filename: './log/warning.log', level: 'warning' }),
    new winston.transports.File({ filename: './log/info.log', level: 'info' })
  ]
});

