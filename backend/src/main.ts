import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { WinstonLogger } from "nest-winston";
import * as dotenv from "dotenv";
import { winstonLogger } from "./utils/winston-logger";

dotenv.config();

const PORT: string | number = process.env.PORT ?? 2999;
const logContext = "main.ts";

export const logger: WinstonLogger | undefined = winstonLogger();

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger,
	});

	await app.listen(PORT, () => {
		if (logger) {
			logger.log(`server is running on PORT ${PORT}`, logContext);
			logger.log(`NODE_ENV: ${process.env.NODE_ENV}`, logContext);
		} else {
			console.error("Unable to create winston logger.");
		}
	});
	app.enableCors();
}
bootstrap();
