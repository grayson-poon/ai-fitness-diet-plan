import { JwtService } from "@nestjs/jwt";
import {
	Injectable,
	NestMiddleware,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UserService } from "./services/user.service";

interface UserRequest extends Request {
	user: any;
}

@Injectable()
export class isAuthenticated implements NestMiddleware {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
	) {}

	async use(req: UserRequest, _: Response, next: NextFunction) {
		try {
			if (
				req.headers.authorization &&
				req.headers.authorization.startsWith("Bearer")
			) {
				const token = req.headers.authorization.split(" ")[1];
				const decoded = await this.jwtService.verify(token);

				const user = await this.userService.getOneUser(decoded.email);
				if (user) {
					req.user = user;
					next();
				} else {
					throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
				}
			} else {
				throw new HttpException("No token found", HttpStatus.NOT_FOUND);
			}
		} catch (error) {
			throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
		}
	}
}
