import 'react-native-gesture-handler';
import * as React from 'react';
import {StyleSheet, Text, View, Platform, StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';
//import { Ionicons } from '@expo/vector-icons';
import Drawer from './components/Drawer.js';
import DrawerFilters from './components/DrawerFilters.js';
import DrawerFiltersPerson from './components/DrawerFiltersPerson.js';
import ActeComplete from './components/ActeComplete.js';
import ModifyPerfil from './components/ModifyPerfil.js';
import Perfil from './components/Perfil.js';

import Actes from './components/Actes.js';

import SignUp from './components/SignUpView.js';
import LogIn from './components/LoginView.js';

<<<<<<< HEAD
import * as globalHelper from './components/Auxiliars/GlobalHelper.js'

=======
>>>>>>> cd176dc... Merge
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpView from "./components/SignUpView";

import LoginView from "./components/LoginView";
import {createMaterialTopTabNavigator} from "react-navigation-tabs";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator();

//const AppIndex = createAppContainer(AppNavigator);


//import {HomeStackScreen, AuthStackScreen} from "./routes";
import {HomeNavigator} from "./routes";

const HomeNavigatorIndex = createAppContainer(HomeNavigator);

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();


function HomeTabScreen() {
    return (
        <Tab.Navigator //https://medium.com/wesionary-team/combining-stack-navigator-with-tab-navigator-in-react-native-react-navigation-253656f45181
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {

                    let iconName;

                    if (route.name === globalHelper.ActesScreenID) {
                        iconName = 'md-calendar';
                    } else if (route.name === globalHelper.PerfilScreenID) {
                        iconName = 'md-flame';
                    }
                    //return <Ionicons name={iconName} size={size} color={color}     />;
                    return <Icon name={iconName} size={size+10} color={color}     />;
                },
            })} tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }}>
            <Tab.Screen name={globalHelper.ActesScreenID} component={Actes} />
            <Tab.Screen name={globalHelper.PerfilScreenID} component={Perfil} />
        </Tab.Navigator>
    );
}

function AuthStackScreen() {
  return (
      <AuthStack.Navigator>
        <AuthStack.Screen name={globalHelper.LogInScreenID} component={LoginView} />
        <AuthStack.Screen name={globalHelper.SignUpScreenID} component={SignUpView} />
        <AuthStack.Screen name={globalHelper.HomeScreenID} component={HomeTabScreen} />
      </AuthStack.Navigator>
  );
}



export default class App extends React.Component {
<<<<<<< HEAD
  constructor(props) {
    super(props);
    let email = async () => {
      let storedUserEmail = await globalHelper.getLoggedUserEmailAsync();
      return storedUserEmail;
    };
    this.state = {
      email:    email, //todo
    };
  }







render() {
    return (/* Ho deixo per testejar
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={LogIn} />
        </Stack.Navigator>
      </NavigationContainer>
=======
  render() {
    return (/*
      <NavigationContainer>
        <DrawerFiltersPerson/>
      </NavigationContainer>*/
      <ModifyPerfil/>
>>>>>>> cd176dc... Merge
      //<Perfil/>

     */
        <NavigationContainer>
            <Stack.Navigator initialRouteName={this.state.email === null ? globalHelper.AuthScreenID : globalHelper.HomeScreenID}>
                <Stack.Screen name={globalHelper.AuthScreenID}  component={AuthStackScreen}/>
                <Stack.Screen name={globalHelper.HomeScreenID}  component={HomeTabScreen}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
  }
}

const styles = StyleSheet.create({
  wrapper:{
    flex:1,
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent : 'space-between',
    backgroundColor:'#714170',
    paddingHorizontal: 10,
    paddingTop:5,
  },
});
