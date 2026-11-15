import { expect, test } from "@playwright/test";

const email = process.env.MOCKATOO_TEST_EMAIL;
const password = process.env.MOCKATOO_TEST_PASSWORD;

test("GitHub sign-in reaches Mockatoo", async ({ page }) => {
	await page.goto("/login");
	await page.getByRole("button", { name: "Sign in with GitHub" }).click();
	await expect(page.getByLabel("Email")).toBeVisible();
	await expect(page.getByRole("button", { name: "Log in with password" })).toBeVisible();
});

test("GitHub sign-in completes with Mockatoo credentials", async ({ page }) => {
	test.skip(
		!email || !password,
		"MOCKATOO_TEST_EMAIL and MOCKATOO_TEST_PASSWORD are required",
	);
	await page.goto("/login");
	await page.getByRole("button", { name: "Sign in with GitHub" }).click();
	await page.getByLabel("Email").fill(email as string);
	await page.getByLabel("Password").fill(password as string);
	await page.getByRole("button", { name: "Log in with password" }).click();
	await page.getByRole("button", { name: "Authorize" }).click();
	await expect(page.getByText(email as string)).toBeVisible();
});
