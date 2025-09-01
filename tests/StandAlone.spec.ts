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
    const username : string= "Testing1"+faker.number.int().toString();
    const password : string= "Test@112233";
    const confirmPassword :string = "Test@112233";
    const ssn = "Testing "
    const amount : string  = faker.number.int().toString();

    console.log("username :",username);
    

    await page.goto(url);
    await page.waitForLoadState();
    await page.getByText("Register").click();
    await page.locator("input[id='customer.firstName']").fill(firstName);
    await page.locator("input[id='customer.lastName']").fill(lastName);
    await page.locator("input[id='customer.address.street']").fill(address);
    await page.locator("input[id='customer.address.city']").fill(city);
    await page.locator("input[id='customer.address.state']").fill(state)
    await page.locator("input[id='customer.address.zipCode']").fill(zipCode)
    await page.locator("input[id='customer.phoneNumber']").fill(phone);
    await page.locator("input[id='customer.ssn']").fill(ssn);
    await page.locator("input[id='customer.username']").fill(username);
    await page.locator("input[id='customer.password']").fill(password);
    await page.locator("input[id='repeatedPassword']").fill(confirmPassword);

    await page.locator("input[value='Register']").click();

    await expect(page.locator(".smallText")).toContainText('Welcome');
    console.log("completated successfully");

     // open account 
     await page.locator("a[href='openaccount.htm']").click();
     await expect(page.locator("div[id='openAccountForm'] h1[class='title']")).toHaveText('Open New Account');
     await page.locator("select[id='type']").selectOption({value:"1"});
     console.log("Account Created Successfully");

     await page.locator("#fromAccountId").first().click();
     await page.locator("input[value='Open New Account']").click();

    await expect(page.locator("#openAccountResult > p:nth-child(2)")).toContainText('Congratulations, your account is now open.');

    const accountNo = await page.locator("#newAccountId").first().innerText();

    console.log("Account No : ", accountNo);
    
    // transfer fund

    await page.locator('a[href="transfer.htm"]').click();
    await page.locator("input[id='amount']").fill(amount);
    await page.locator("select[id='fromAccountId']").selectOption({value:accountNo});
    await page.locator("select[id='toAccountId']").selectOption({value:accountNo});
    await page.locator("input[value='Transfer']").click();
    await expect(page.locator("div[id='showResult'] h1")).toHaveText("Transfer Complete!");

    console.log("transfer done");

    
})

test('Open Account Successfully' , async()=>{

    const browser : Browser = await chromium.launch({headless:false});
    const page : Page = await browser.newPage();

    const url : string = "https://parabank.parasoft.com/parabank/index.htm";
    const username : string = "prem";
    const password :string ="Test@112233";

    const amount : string  = faker.number.int({max:3}).toString();

    await page.goto(url);

    await page.locator("input[name='username']").fill(username);
    await page.locator("input[name='password']").fill(password);
    await page.locator("input[type='submit']").click()

    await expect (page.locator(".smallText")).toContainText("Welcome");

     // open account 
     await page.locator("a[href='openaccount.htm']").click();
     await expect(page.locator("div[id='openAccountForm'] h1[class='title']")).toHaveText('Open New Account');
     await page.locator("select[id='type']").selectOption({value:"1"});
     console.log("Account Created Successfully");

     await page.locator("#fromAccountId").first().click();
     await page.locator("input[value='Open New Account']").click();

    await expect(page.locator("div[id='openAccountResult'] p")).toContainText('Congratulations, your account is now open.');

    // const accountNo = await page.locator("a[id='newAccountId']").innerText();
    const accountNo : string = await page.locator("#newAccountId").innerText();

    console.log("Account No : ", accountNo);
    
    // transfer fund

    await page.locator('a[href="transfer.htm"]').click();
    await page.locator("input[id='amount']").fill(amount);
    await page.locator("select[id='fromAccountId']").selectOption({value:accountNo});
    await page.locator("select[id='toAccountId']").selectOption({value:accountNo});
    await page.locator("input[value='Transfer']").click();
    await expect(page.locator("div[id='showResult'] h1")).toHaveText("Transfer Complete!");

    console.log("transfer done");
    

})


