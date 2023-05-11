import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument, User } from "../models/user.schema";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async signup(user: User) {
		const salt = await bcrypt.genSalt();
		const hash = await bcrypt.hash(user.password, salt);

		const body = {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			password: hash,
		};

		const newUser = new this.userModel(body);
		return newUser.save();
	}

	async login(user: User, jwt: JwtService) {
		const foundUser = await this.userModel.findOne({ email: user.email });

		if (foundUser) {
			const { password: hash } = foundUser;
			if (bcrypt.compare(user.password, hash)) {
				const payload = { email: user.email };

				return { token: jwt.sign(payload) };
			}

			throw new HttpException("Incorrect password", HttpStatus.UNAUTHORIZED);
		}

		throw new HttpException("Email is not found", HttpStatus.UNAUTHORIZED);
	}

	async getOneUser(email: string) {
		return await this.userModel.findOne({ email });
	}
}
