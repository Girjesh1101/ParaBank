import { Locator, Page } from "@playwright/test";

export class HomePage{

    protected page : Page;
    protected homeBtn : Locator;
    protected productsBtn : Locator;
    protected cartBtn : Locator;
    protected logoutBtn : Locator;
    protected deleteAccountBtn : Locator;
    protected contactUs : Locator;
    protected LoggedInAs : Locator;
    protected featuresItem : Locator;
    protected subscriptionEmailInput : Locator;
    protected subscriptionBtn : Locator;
    protected subscriptionMessage : Locator;


    constructor(page : Page){

        this.page = page ;
        this.homeBtn = page.getByText(" Home");
        this.productsBtn = page.locator("a[href='/products']");
        this.cartBtn = page.locator("li a[href='/view_cart']");
        this.logoutBtn = page.locator("li a[href='/logout']");
        this.deleteAccountBtn = page.locator("li a[href='/delete_account']");
        this.contactUs = page.locator("li a[href='/contact_us']");
        this.LoggedInAs = page.locator("a >> text=Logged in as");
        this.featuresItem = page.locator(".features_items .col-sm-4");
        this.subscriptionEmailInput = page.locator("#susbscribe_email");
        this.subscriptionBtn = page.locator("#subscribe");
        this.subscriptionMessage = page.locator(".alert-success");
    }

    async navigateToHome():Promise<void>{
        await this.homeBtn.click();
    }

    async navigateToProduct():Promise<void>{
        await this.productsBtn.click();
    }

    async navigateToCart():Promise<void>{
        await this.cartBtn.click();
    }

    async isLoggedInAs():Promise<boolean>{
        return this.LoggedInAs.isVisible();
    }

    async logout():Promise<void>{

        if(await this.isLoggedInAs()){
            await this.logoutBtn.click();
        }
    }

    async deleteAccount():Promise<void>{
        await this.deleteAccountBtn.click();
    }

    async navigateToContactUs(): Promise<void>{
        await this.contactUs.click();
    }

    async getFeaturedItemCount():Promise<number>{
        return await this.featuresItem.count()
    }

    async subscribeToNewsLetter(email:string):Promise<void>{
        await this.subscriptionEmailInput.fill(email);
        await this.subscriptionBtn.click();
    }

    async isSubscriptionSuccessVisible():Promise<boolean>{
        return await this.subscriptionMessage.isVisible();
    }
    
   
}