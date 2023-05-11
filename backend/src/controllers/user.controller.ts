import { Body, Controller, Post, HttpStatus, Res } from "@nestjs/common";
import { User } from "../models/user.schema";
import { Response } from "express";
import { UserService } from "src/services/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserInterface } from "src/utils/interfaces";

@Controller("")
export class UserController {
	constructor(
		private readonly userService: UserService,
		private jwtService: JwtService,
	) {}

	@Post("/signup")
	async signup(@Res() response: Response, @Body() user: UserInterface) {
		const newUser = await this.userService.signup(user);
		return response.status(HttpStatus.CREATED).json({ newUser });
	}

	@Post("/login")
	async login(@Res() response: Response, @Body() user: UserInterface) {
		const jwt = await this.userService.login(user, this.jwtService);
		return response.status(HttpStatus.OK).json({ jwt });
	}
}
