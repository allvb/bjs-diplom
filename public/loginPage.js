"use strict";

let logIn = new UserForm();

logIn.loginFormCallback = data => {
    ApiConnector.login(data, responce => {
        if(responce.success) {
            location.reload();
        } else {
            logIn.setLoginErrorMessage(responce.error);
        }
    });
};

logIn.registerFormCallback = data => {
    ApiConnector.register(data, responce => {
        if(responce.success) {
            location.reload();
        } else {
            logIn.setRegisterErrorMessage(responce.error);
        }
    })
}