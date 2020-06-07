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

export var HomeStackScreenID = "HomeStack";
export var HomeTabScreenID = "HomeTab";

export var PerfilScreenID = "Perfil";
export var ModifyPasswordID = "ModifyPassword";
export var ModifyPerfilID = "ModifyPerfil";

export var ListPerfilStackScreenID = "Sardanistes";
export var ListPerfilScreenID = "Sardanistes2";
export var FilterListPerfilScreenID = "FilterListPerfil";
export var PerfilSmallScreenID = "PerfilSmall";
export var PerfilExternScreenID = "PerfilExtern";

export var ListActesScreenID = "ListActesSmall";
export let FilterListActesScreenID = "FilterListActes";

export var ActeCompleteID = "ActeComplete";
export var ActesStackScreenID = "Actes";
export var ActesScreenID = "ActesScreen";



/*
 *  Reset Navigation
 */
export var first_alert_show = true;


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
export var API_ACTES = API + '/actes/';



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
        let tmp = await getValueFromAsyncStorage(asyncStorageLoggedUserEmailKey);;
        console.log("Email:" + tmp);
        return tmp;
    } catch (e) {
        console.error("error:" + e.message());
    }
}



 // TODO: make it an    export async function
    export async function _signOutAsync() {
        await AsyncStorage.clear();
        //this.props.navigation.navigate('Auth');
    };
