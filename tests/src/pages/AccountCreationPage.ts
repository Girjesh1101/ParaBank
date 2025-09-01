import { Locator, Page } from "@playwright/test";
import { UserData } from "../models/UserData";

export class AccountCreationPage {

    private page : Page;

    private titleRadio : Locator;
    private inputPassword : Locator;
    private selectDay : Locator;
    private selectMonth : Locator;
    private selectYears : Locator;
    private newslatterCheckbox : Locator;
    private offerCheckbox : Locator;
    private inputFirstName : Locator;
    private inputLastName : Locator;
    private inputCompanyName : Locator;
    private inputAddress1 : Locator;
    private selectCountry : Locator;
    private inputState : Locator;
    private inputCity : Locator;
    private inputZipcode : Locator;
    private inputMobile : Locator;
    private createAccountBtn : Locator;
    private successMessage : Locator;

    constructor(page : Page){

        this.page = page;
        this.titleRadio = page.locator("#id_gender1");
        this.inputPassword = page.locator("#password");

        this.selectDay = page.locator('#days');
        this.selectMonth = page.locator("#months")
        this.selectYears = page.locator("#years");
        this.newslatterCheckbox = page.locator("#newsletter");
        this.offerCheckbox = page.locator("#optin");
        this.inputFirstName = page.locator("#first_name");
        this.inputLastName = page.locator("#last_name");
        this.inputCompanyName = page.locator("#company");
        this.inputAddress1 = page.locator("#address1");
        this.inputState= page.locator("#state");
        this.inputCity = page.locator("#city");
        this.inputZipcode = page.locator("#zipcode");
        this.inputMobile = page.locator("#mobile_number");
        this.selectCountry = page.locator("select[data-qa='country']");
        this.createAccountBtn = page.getByText("Create Account");
        this.successMessage = page.locator("div[class='col-sm-9 col-sm-offset-1'] h2");
        
    }

    async waitForLoadPage():Promise<void>{
        await this.page.waitForSelector("#password" , {timeout: 1000});
    }

    async fillAccountInformation(userData : UserData):Promise<void>{

        const titleLocator = userData.title === 'Mr' ? '#id_gender1' : '#id_gender2';
        await this.page.click(titleLocator);
        await this.inputPassword.fill(userData.password);
        await this.selectDay.selectOption(userData.day);
        await this.selectMonth.selectOption(userData.month);
        await this.selectYears.selectOption(userData.year);

        await this.newslatterCheckbox.check();
        await this.offerCheckbox.check();

    }

    async fillAddressInformation(userData : UserData): Promise<void>{

        await this.inputFirstName.fill(userData.firstName);
        await this.inputLastName.fill(userData.lastName);
        await this.inputCompanyName.fill(userData.company);
        await this.inputAddress1.fill(userData.address1);
        await this.selectCountry.selectOption(userData.country);
        await this.inputState.fill(userData.state);
        await this.inputCity.fill(userData.city);
        await this.inputZipcode.fill(userData.zipcode);
        await this.inputMobile.fill(userData.mobileNumber);
    }

    async submitAccountCreation():Promise<void>{
        await this.createAccountBtn.click();
    }

    async isAccountCreated():Promise<boolean>{
        await this.successMessage.waitFor({state: 'visible'});
        const message = await this.successMessage.textContent();
        return message?.includes('Account Created!') || false ;
    }

    async getSuccessMessage():Promise<string | null >{
        return await this.successMessage.textContent();
    }

    async takeScreenshort(filename :string):Promise<void>{
        await this.page.screenshot({
            path : `screenshots/${filename}.png`,
            fullPage: true
        })
    }
}