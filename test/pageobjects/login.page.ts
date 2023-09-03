import { $ } from '@wdio/globals';
import Page from './page';

class LoginPage extends Page {
    private get inputUserName() { return $('#user-name'); }
    private get inputPassword() { return $('#password'); }
    private get btnSubmit() { return $('#login-button'); }
    private get warningError() { return $('//h3[@data-test="error"]'); }
    private get burgerNav(){ return $('#react-burger-menu-btn'); }
    private get shoppingCart(){ return $('#shopping_cart_container'); }
    private get listItem(){ return $('.inventory_list'); }

    public async login (username: string = '', password: string = '') {
        await (await this.btnSubmit).waitForDisplayed();
        await (await this.inputUserName).setValue(username);
        await (await this.inputPassword).setValue(password);
        await (await this.btnSubmit).click();
    }

    public async validateError(expectedErrorText:string = '') {
        let expectedError = false;
        await (await this.warningError).waitForDisplayed();
        const textError = await (await this.warningError).getText();
        if(textError==expectedErrorText) expectedError = true;
        return expectedError;
    }

    public async validateUserLogged() {
        await (await this.burgerNav).waitForDisplayed();
        await (await this.shoppingCart).waitForDisplayed();
        await (await this.listItem).waitForDisplayed();
    }
}

export default new LoginPage();
