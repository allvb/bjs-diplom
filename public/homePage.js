const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

logoutButton.action = ApiConnector.logoutButton((responce) => { // Кнопка выхода
    if(responce.success) {
        location.reload();
    } else {
        favoritesWidget.setMessage(response.success, response.error);
    }
});

ApiConnector.current(responce => { // Получение инфонмации о клиенте
    if(responce.success) {
        ProfileWidget.showProfile(responce.data);
    }
});

ApiConnector.getStocks(responce => { //Обновляем таблицу курсов валют
    if(responce.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(responce.data);
    }
});

setInterval (() => { //Задаем интервал обновления таблицы курсов валют
    ApiConnector.getStocks(responce => {
        if(responce.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(responce.data);
        }
    });
}, 10000);

moneyManager.addMoneyCallback = data => { // Запрос на пополнение баланса
    ApiConnector.addMoney(data, responce => {
        if(responce.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Счёт успешно пополнен");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};
        
        
moneyManager.conversionMoneyCallback = data => { // Запрос на конвертацию баланса
    ApiConnector.convertMoney(data, responce => {
        if(responce.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Выполнелась конвертация валют");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

moneyManager.sendMoneyCallback = data => { // Запрос на перевод валюты
    ApiConnector.transferMoney(data, responce => {
        if(responce.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Выполнен перевод валюты");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

ApiConnector.getFavorites(responce => { // Запрос на получение списка избранного
    if(responce.success) {
        favoritesWidge.clearTable();
        favoritesWidge.fillTable(responce.data);
        moneyManager. updateUsersList(responce.data);
    } else {
        favoritesWidget.setMessage(response.success, response.error);
    }
});

favoritesWidget.addUserCallback = data => { // Запрос на добавление пользователя в избранное
    ApiConnector.addUserToFavorites(data, responce => {
        if(responce.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(responce.data);
            moneyManager. updateUsersList(responce.data);
            favoritesWidge.setMessage("Добавился пользователь в фавориты");
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
}

favoritesWidge.removeUserCallback = data => { // Запрос на удаление пользователя из избранного
    ApiConnector.removeUserFromFavorites(data, responce => {
        if(responce.success) {
            favoritesWidge.clearTable();
            favoritesWidge.fillTable(responce.data);
            moneyManager. updateUsersList(responce.data);
            favoritesWidge.setMessage("Удалили пользователя из фаворитов");
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
}