import winston, { format } from "winston";

const customFormat = format.printf(info => {
  const date = new Date();
  const formatedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })

  return `[${formatedDate}] ${info.service} - ${info.level.toUpperCase()}: ${info.message}`;
})

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      customFormat
    ),
    defaultMeta: { service: 'myBackendAPI' },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'log/combine.log' })
    ]
});

export default logger;