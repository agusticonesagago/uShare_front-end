import React from 'react';
import {
    AsyncStorage,
} from 'react-native';

import { NavigationActions, StackActions } from 'react-navigation';

/*
 * ID of the screens
 */
export var AuthScreenID = "Auth";
export var SignUpScreenID = "Registre";
export var LogInScreenID = "Login";

export var HomeScreenID = "Home";
export var ActesScreenID = "Actes";
export var PerfilScreenID = "Perfil";
export var ListPerfilScreenID = "ListPerfil";


/*
 *  Reset Navigation
 */



/*
 * API Endpoint candidates
 */
export var myPC = 'http://192.168.1.12:8080/api'; //NO posar localhost, posar la IP del PC
export var sardapp='https://sardapp.herokuapp.com/api'; // Per veure si va: SI


/*
 * API to call
 */
export var API = sardapp;
export var API_USER = API + '/users/';

/*
 * KEYS
 */
export var asyncStorageLoggedUserEmailKey = "LoggedUserEmail";


/*
 * API CODES
 */

export var API_USER_CREATED_CODE = 201;
export var API_SUCESSFUL_LOGIN_CODE = 200;






/*
 * Set Value from AsyncStorage
 */

export async function signInAsync(key, value) {
    await AsyncStorage.setItem(key, value);
    //this.props.navigation.navigate('App');
}

export async function signInStoreLoggedUserEmailAsync(value) {
    await AsyncStorage.setItem(asyncStorageLoggedUserEmailKey, value);
    //this.props.navigation.navigate('App');
}



/*
 * Get Value from AsyncStorage
 */

// Fetch the value from storage
export async function getValueFromAsyncStorage(key) {
    return await AsyncStorage.getItem(key);
}

// Fetch the email from storage
export async function getLoggedUserEmailAsync() {
    console.log("entra getLoggedUserEmailAsync");
    try {
        return await getValueFromAsyncStorage(asyncStorageLoggedUserEmailKey);
    } catch (e) {
        console.error("error:" +e.message());
    }
}



 // TODO: make it an    export async function
    export async function _signOutAsync() {
        await AsyncStorage.clear();
        //this.props.navigation.navigate('Auth');
    };








