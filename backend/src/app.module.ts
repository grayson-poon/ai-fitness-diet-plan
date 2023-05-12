import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "./modules/user.module";
import { WinstonModule, utilities as winstonUtilities } from "nest-winston";
import * as winston from "winston";
import * as dotenv from "dotenv";
import { DietPlanModule } from "./modules/diet-plan.module";

dotenv.config();

@Module({
	imports: [
		WinstonModule.forRoot({
			transports: [
				new winston.transports.Console({
					format: winston.format.combine(
						winston.format.timestamp(),
						winston.format.ms(),
						winstonUtilities.format.nestLike("fitness-diet-plan BACKEND", {
							colors: true,
							prettyPrint: true,
						}),
					),
				}),
			],
			exitOnError: false,
		}),
		MongooseModule.forRoot(process.env.MONGO_DB_URI),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: "2h" },
		}),
		UserModule,
		DietPlanModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
