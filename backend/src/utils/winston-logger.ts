import { WinstonLogger, utilities as winstonUtilities } from "nest-winston";
import * as winston from "winston";

export const winstonLogger = (): WinstonLogger | undefined => {
	try {
		const logger = winston.createLogger({
			transports: [
				new winston.transports.Console({
					format: winston.format.combine(
						winston.format.timestamp(),
						// winston.format.ms(),
						winstonUtilities.format.nestLike("fitness-diet-plan BACKEND", {
							colors: true,
							prettyPrint: true,
						}),
					),
				}),
			],
			exitOnError: false,
		});

		return new WinstonLogger(logger);
	} catch (error) {
		console.error(`Unable to create winston logger`);
		return undefined;
	}
};
