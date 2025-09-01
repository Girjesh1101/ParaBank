import { faker } from "@faker-js/faker";
import test, { Browser, chromium, expect, Page } from "@playwright/test";

test("registration", async()=>{

    const browser :Browser = await chromium.launch({headless:false});
    const page: Page = await browser.newPage();


    const url :string = "https://automationexercise.com/";
    const firstName : string  = faker.person.firstName();
    const lastName :string = faker.person.lastName();
    const address : string = faker.location.streetAddress();
    const city : string = faker.location.city();
    const state: string = faker.location.state();
    const zipCode : string = faker.location.zipCode();
    const phone :string = faker.number.int({max:10}).toString();
    const username : string= "Testing1"+faker.number.int().toString();
    const password : string= "Test@112233";
    const confirmPassword :string = "Test@112233";
    const ssn = "Testing "
    const amount : string  = faker.number.int().toString();
    const email = faker.internet.email({provider:"automation.com"});
    const company = faker.company.name();

    await page.goto(url);
    expect(await page.title()).toBe("Automation Exercise");

    await page.locator("a[href='/login']").click();
    await page.locator("input[name='name']").fill(firstName);
    await page.locator("form[action='/signup'] input[name='email']").fill(email);
    await page.locator('button[data-qa="signup-button"]').click();

    //form
    await page.locator("#password").fill(password);
    await page.locator('#days').selectOption({value:"1"});
    await page.locator("#months").selectOption({value:"11"});
    await page.locator("#years").selectOption({value:"2000"});
    await page.locator("#newsletter").check();
    await page.locator("#optin").check();
    await page.locator("#first_name").fill(firstName);
    await page.locator("#last_name").fill(lastName)  ;
    await page.locator("#company").fill(company);
    await page.locator("#address1").fill(address);
    await page.locator("#state").fill(state);
    await page.locator("#city").fill(city);
    await page.locator("#zipcode").fill(zipCode);
    await page.locator("#mobile_number").fill(phone);
    await page.getByText("Create Account").click();

    expect(page.locator("div[class='col-sm-9 col-sm-offset-1'] h2")).toHaveText("Account Created!");
    console.log("Account created successfully");
    

})