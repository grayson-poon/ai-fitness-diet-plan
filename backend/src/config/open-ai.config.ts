import { Configuration, OpenAIApi } from "openai";

import * as dotenv from "dotenv";
dotenv.config();

const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY ?? "";
const OPENAI_ORGANIZATION: string = process.env.OPENAI_ORGANIZATION ?? "";

const configuration = new Configuration({
	apiKey: OPENAI_API_KEY,
	organization: OPENAI_ORGANIZATION,
});

export const openai: OpenAIApi = new OpenAIApi(configuration);
