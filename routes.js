import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';


import Perfil from './components/Perfil.js'
import Actes from './components/Actes.js'
import LoginView from './components/LoginView.js'
import SignUpView from './components/SignUpView.js'
import * as globalHelper from "./components/Auxiliars/GlobalHelper";
import { createStackNavigator } from '@react-navigation/stack';


/*
export const HomeNavigator = createMaterialTopTabNavigator({
    Home: {
        screen: Actes,
        navigationOptions: {
            tabBarLabel: "Actes",
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name="home" size={30} color={tintColor} />
            )
        }
    },
    Perfil: {
        screen: Perfil,
        navigationOptions: {
            tabBarLabel: "Perfil",
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name="user" size={30} color={tintColor} />
            )
        }
    }
});*/

export const HomeNavigator = createMaterialTopTabNavigator({
    Home: {
        screen: Actes,
    },
    Perfil: {
        screen: Perfil,
    }
});

/*
const Stack = createStackNavigator();
function MyStack() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            headerMode="screen"
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'tomato' },
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    title: 'Awesome app',
                }}
            />
            <Stack.Screen
                name="Auth"
                component={Auth}
                options={{
                    title: 'My profile',
                }}
            />
        </Stack.Navigator>
    );
}
*/
/*
export const AuthNavigator = createStackNavigator({
    SignUp: {
        screen: SignUpView,
        navigationOptions: {
            title: "Sign Up"
        }
    },
    LogIn: {
        screen: LoginView,
        navigationOptions: {
            title: "Sign In"
        }
    }
});
*/



/*
const HomeTabNavigator = createBottomTabNavigator(
    {
        CurrentList: {
            screen: CurrentList,
            navigationOptions: {
                title: 'Liste de la semaine',
                tabBarIcon: () => (
                    <Image
                        source={require('../Images/ic_modifier_liste.jpg')}
                        style={styles.icon}
                    />
                ),
            },
        },
        OthersList: {
            screen: OthersList,
            navigationOptions: {
                title: 'Anciennes listes',
                tabBarIcon: () => (
                    <Image
                        source={require('../Images/ic_afficher_liste.png')}
                        style={style.icon}
                    />
                ),
            },
        },
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD',
            inactiveBackgroundColor: '#FFFFFF',
            showLabel: false,
            showIcon: true,
        },
    },
);
*/


