import test, { Browser, chromium, expect, Page } from "@playwright/test";
import { waitForDebugger } from "inspector";
import  { faker } from "@faker-js/faker";

test.skip('login Successfully' , async()=>{

    const browser : Browser = await chromium.launch({headless:false});
    const page : Page = await browser.newPage();

    const url : string = "https://parabank.parasoft.com/parabank/index.htm";
    const username : string = "prem";
    const password :string ="Test@112233";

    await page.goto(url);

    await page.locator("input[name='username']").fill(username);
    await page.locator("input[name='password']").fill(password);
    await page.locator("input[type='submit']").click()

    await expect (page.locator(".smallText")).toContainText("Welcome");

})

test('invalid successfully' , async()=>{

    const browser : Browser = await chromium.launch({headless : false});
    const page :Page = await browser.newPage();

    const url : string = "https://parabank.parasoft.com/parabank/index.htm";
    const username : string = "prem";
    const password :string ="Test@112233";

    await page.goto(url);

    await page.locator("input[name='username']").fill("invalid");
    await page.locator("input[name='password']").fill("invalid");
    await page.locator("input[type='submit']").click()

    await expect( page.locator(".error")).toHaveText("The username and password could not be verified.")
})

test("register new Account ", async ()=>{

    const browser : Browser = await chromium.launch({headless: false});
    const page : Page = await browser.newPage();

    const url : string = "https://parabank.parasoft.com/parabank/index.htm";

    const firstName : string  = faker.person.firstName();
    const lastName :string = faker.person.lastName();
    const address : string = faker.location.streetAddress();
    const city : string = faker.location.city();
    const state: string = faker.location.state();
    const zipCode : string = faker.location.zipCode();
    const phone :string = faker.number.int({max:10}).toString();
    const username : string= "Testing";
    const password : string= "Test@112233";
    const confirmPassword :string = "Test@112233";
    const ssn = "Testing "



    await page.goto(url);
    await page.locator("a[href='register.htm']").click();
    await page.locator("#customer.firstName").fill(firstName);
    await page.locator("#customer.lastName").fill(lastName);
    await page.locator("#customer.address.street").fill(address);
    await page.locator("#customer.address.city").fill(city);
    await page.locator("#customer.address.state").fill(state)
    await page.locator("#customer.address.zipCode").fill(zipCode)
    await page.locator("#customer.phoneNumber").fill(phone);
    await page.locator("#customer.ssn").fill(ssn);
    await page.locator("#customer.username").fill(username);
    await page.locator("#customer.password").fill(password);
    await page.locator("#repeatedPassword").fill(confirmPassword);

    await page.locator("#input[value='Register']").click

    console.log("completated successfully");
    

})
