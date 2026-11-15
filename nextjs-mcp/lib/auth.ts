import { mockGitHub } from "@mockatoo/connect-better-auth";
import { betterAuth } from "better-auth";
import { mcp } from "better-auth/plugins";
import Database from "better-sqlite3";

const useMock = process.env.NODE_ENV !== "production";

export const auth = betterAuth({
	database: new Database("./auth.db"),
	baseURL: "http://localhost:3000",
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: useMock
		? {}
		: {
				github: {
					clientId: process.env.GITHUB_CLIENT_ID ?? "",
					clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
				},
			},
	plugins: [
		mcp({
			loginPage: "/login",
		}),
		...(useMock ? [mockGitHub()] : []),
	],
});
