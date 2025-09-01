import{UserData}  from "../models/UserData";
import {Locator, Page } from "@playwright/test"

export class SignupPage{

    private page : Page;
    private url :string  = "https://automationexercise.com/";

    // Locator
    private nameInput : Locator;
    private emailInput :Locator;
    private signupButton : Locator;
    private headerSingupBtn : Locator;

    constructor(page : Page){

        this.page = page;
        this.nameInput = page.locator("input[name='name']");
        this.emailInput = page.locator("form[action='/signup'] input[name='email']");
        this.signupButton = page.locator('button[data-qa="signup-button"]');
        this.headerSingupBtn = page.locator("a[href='/login']");
    }

    async navigate(): Promise<void>{
        await this.page.goto(this.url , {waitUntil:'networkidle'});

    }

    async isPageLoad(): Promise<boolean>{
        return await this.headerSingupBtn.isVisible();
    }

    async headerSignUp(): Promise<void>{
        return await this.headerSingupBtn.click()
    }

    async fillSignUpForm(name :string , email : string){
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
    }

    async submitSignupForm(): Promise<void>{
        await this.signupButton.click();
    }

    async completeSignup(userData :UserData ): Promise<void>{
        await this.headerSignUp();
        await this.fillSignUpForm(userData.name, userData.email);
        await this.submitSignupForm();
    }

    async takeScreenshot(filename: string):Promise<void>{
        await this.page.screenshot({
            path:`screenshot/${filename}.png`,
            fullPage:true
        })
    }
}