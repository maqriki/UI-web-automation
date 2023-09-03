import loginPage from "../pageobjects/login.page";

describe('Login saucedemo', function(){
    it('@positive, user should successfully login with valid username and password', async() => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.validateUserLogged();
    });

    it('@negative, user should not login with username empty', async() => {
        await loginPage.open();
        await loginPage.login('', 'secret_sauce');

        const expectedError = await loginPage.validateError('Epic sadface: Username is required');
        expect(expectedError).toBeTruthy();
    });

    it('@negative, user should not login with password empty', async() => {
        await loginPage.open();
        await loginPage.login('standard_user', '');

        const expectedError = await loginPage.validateError('Epic sadface: Password is required');
        expect(expectedError).toBeTruthy();
    });

    it('@negative, user should not login with wrong username or password', async() => {
        await loginPage.open();
        await loginPage.login('standard_user', 'wrong_password');

        const expectedError = await loginPage.validateError('Epic sadface: Username and password do not match any user in this service');
        expect(expectedError).toBeTruthy();
    });

    it('@negative, user should not login with locked out user', async() => {
        await loginPage.open();
        await loginPage.login('locked_out_user', 'secret_sauce');

        const expectedError = await loginPage.validateError('Epic sadface: Sorry, this user has been locked out.');
        expect(expectedError).toBeTruthy();
    });
});