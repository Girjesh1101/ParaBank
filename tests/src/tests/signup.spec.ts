import test, { expect, Page } from "@playwright/test";
import { SignupPage } from "../pages/SignUpPage";
import { AccountCreationPage } from "../pages/AccountCreationPage";
import { UserData, UserDataBuilder } from "../models/UserData";
import { TestDataGenerator } from "../utils/TestDataGenerator";


test.describe("Signup Test" , async ()=>{

    let page : Page;
    let signupPage : SignupPage;
    let accountCreationPage : AccountCreationPage;
    let userData : ReturnType<typeof UserDataBuilder.default>;

    test.beforeEach(async({browser})=>{

        page = await browser.newPage();
        signupPage = new SignupPage(page);
        accountCreationPage = new AccountCreationPage(page);

        userData = TestDataGenerator.generateUserData();
    });

    test.afterEach(async()=>{
        await page.close();
    });

    test("Successfully user register" , async()=>{

        //Navigate to signup Page

        await signupPage.navigate();
        await expect(signupPage.isPageLoad()).resolves.toBeTruthy();

        await signupPage.takeScreenshot("singup-page-inital");

        await signupPage.completeSignup(userData.build());

        await accountCreationPage.waitForLoadPage();

        await accountCreationPage.fillAccountInformation(userData.build());
        await accountCreationPage.fillAddressInformation(userData.build());

        await accountCreationPage.submitAccountCreation();

        const isAccountCreated = await accountCreationPage.isAccountCreated();
        expect(isAccountCreated).toBeTruthy();

        await accountCreationPage.takeScreenshort('account-creaated-successfully');

        const successMessage = await accountCreationPage.getSuccessMessage();
        expect(successMessage).toContain('Account Created!');

        console.log(`Account created successfully for : ${userData.build().email}`);
        

    })
})