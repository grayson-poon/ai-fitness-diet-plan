import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { WINSTON_MODULE_NEST_PROVIDER, WinstonLogger } from "nest-winston";
import * as dotenv from "dotenv";

dotenv.config();

const PORT: string | number = process.env.PORT ?? 2999;
const LOG_CONTEXT = "main.ts";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const logger: WinstonLogger = app.get(WINSTON_MODULE_NEST_PROVIDER);
	app.useLogger(logger);

	await app.listen(PORT, () => {
		logger.log(`server is running on PORT ${PORT}`, LOG_CONTEXT);
		logger.log(`NODE_ENV: ${process.env.NODE_ENV}`, LOG_CONTEXT);
	});
	app.enableCors();
}
bootstrap();
