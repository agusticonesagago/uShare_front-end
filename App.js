import React from 'react';
import {StyleSheet} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Perfil from './components/Profile/Perfil.js';
import PerfilExtern from './components/Profile/PerfilExtern.js';
import PerfilSmall from './components/Profile/PerfilSmall.js';

import SignUp from './components/Authentication/SignUpView.js';
import LogIn from './components/Authentication/LoginView.js';
import ModifyPassword from './components/Profile/ModifyPassword.js';
import ModifyPerfil from './components/Profile/ModifyPerfil.js';
import ActeComplete from './components/Event/ActeComplete.js';

import ListActesSmall from './components/Event/ListActesSmall.js';

import {NavigationContainer} from '@react-navigation/native';

import Actes from './components/Event/Actes.js';

import * as globalHelper from './components/Auxiliars/GlobalHelper.js'

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListPerfilSmall from "./components/Profile/ListPerfilSmall";
import FilterOptionsPerson from "./components/Profile/FilterOptionsPerson";
import FilterOptions from "./components/Event/FilterOptions";

import {YellowBox} from "react-native"

const Stack = createStackNavigator();

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabScreen() {
  return (
      <Tab.Navigator //https://medium.com/wesionary-team/combining-stack-navigator-with-tab-navigator-in-react-native-react-navigation-253656f45181
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {

              let iconName;

              if (route.name === globalHelper.ActesStackScreenID) {
                iconName = 'md-calendar';
              } else if (route.name === globalHelper.PerfilScreenID) {
                iconName = 'md-person';
              } else if (route.name === globalHelper.ListPerfilStackScreenID) {
                iconName = 'md-people';
              }
              return <Icon name={iconName} size={size+10} color={color}     />;
            },
          })} tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
        <Tab.Screen name={globalHelper.ListPerfilStackScreenID} component={ListPerfilStackScreen} />
        <Tab.Screen name={globalHelper.ActesStackScreenID} component={ListActesStackScreen} />
        <Tab.Screen name={globalHelper.PerfilScreenID} component={PerfilStackSreen} />
      </Tab.Navigator>
  );
}

function PerfilStackSreen() {
  return (
      <AuthStack.Navigator>
        <AuthStack.Screen name={globalHelper.PerfilScreenID} component={Perfil}
        options={{ title: '', headerTransparent: true }} />
        <AuthStack.Screen name={globalHelper.ModifyPasswordID} component={ModifyPassword} options={{ title: '', headerTransparent: true , headerTintColor:'white'}} />
        <AuthStack.Screen name={globalHelper.ModifyPerfilID} component={ModifyPerfil} options={{ title: '', headerTransparent: true , headerTintColor:'white'}} />
        <AuthStack.Screen name={globalHelper.ActeCompleteID} component={ActeComplete} options={{ title: '', headerTransparent: true , headerTintColor:'white'}}/>
      </AuthStack.Navigator>
  );
}



function HomeStackScreen() {
  return (
    // Hide header
    //https://stackoverflow.com/questions/61185135/react-native-navigation-error-the-action-navigate-with-payload-name-192-168
      <AuthStack.Navigator>
        <AuthStack.Screen name={globalHelper.HomeTabScreenID} component={HomeTabScreen}
        options={{ title: '', headerTransparent: true }} />
      </AuthStack.Navigator>
  );
}

function AuthStackScreen() {
  return (
      <AuthStack.Navigator>
        <AuthStack.Screen name={globalHelper.LogInScreenID} component={LogIn} options={{ title: '', headerTransparent: true }}/>
        <AuthStack.Screen name={globalHelper.SignUpScreenID} component={SignUp} options={{ title: '', headerTransparent: true }} />
        <AuthStack.Screen name={globalHelper.HomeStackScreenID} component={HomeStackScreen} options={{ title: '', headerTransparent: true }} />
        <AuthStack.Screen name={globalHelper.ModifyPasswordID} component={ModifyPassword} options={{ title: '', headerTransparent: true , headerTintColor:'white' }} />
        <AuthStack.Screen name={globalHelper.ModifyPerfilID} component={ModifyPerfil} options={{ title: '', headerTransparent: true , headerTintColor:'white' }} />
      </AuthStack.Navigator>
  );
}

function ListActesStackScreen() {
  return (
      <AuthStack.Navigator>
          <AuthStack.Screen name={globalHelper.ListActesScreenID} component={ListActesSmall} options={{ title: '', headerTransparent: true, headerTintColor:'white' }} />
          <AuthStack.Screen name={globalHelper.ActeCompleteID} component={ActeComplete} options={{ title: '', headerTransparent: true, headerTintColor:'white' }}/>
          <AuthStack.Screen name={globalHelper.ActesScreenID} component={Actes} options={{ title: '', headerTransparent: true, headerTintColor:'white' }}/>
          <AuthStack.Screen name={globalHelper.FilterListActesScreenID} component={FilterOptions} options={{ title: '', headerTransparent: true, headerTintColor:'white' }} />

          <AuthStack.Screen name={globalHelper.ListPerfilScreenID} component={ListPerfilSmall} options={{title: '', headerTransparent: true, headerTintColor:'white'}}
          />
          <AuthStack.Screen name={globalHelper.FilterListPerfilScreenID} component={FilterOptionsPerson} options={{ title: '', headerTransparent: true, headerTintColor:'white' }} />
          <AuthStack.Screen name={globalHelper.PerfilExternScreenID} component={PerfilExtern} options={{ title: '', headerTransparent: true, headerTintColor:'white' }} />
          <AuthStack.Screen name={globalHelper.PerfilSmallScreenID} component={PerfilSmall} options={{ title: '', headerTransparent: true, headerTintColor:'white' }} />

      </AuthStack.Navigator>
  );
}

function ListPerfilStackScreen() {
    return (
        // Hide header
        //https://stackoverflow.com/questions/61185135/react-native-navigation-error-the-action-navigate-with-payload-name-192-168
        <AuthStack.Navigator>
            <AuthStack.Screen name={globalHelper.ListPerfilScreenID} component={ListPerfilSmall}
                              options={{
                                  title: '',
                                  headerTransparent: true, headerTintColor:'white'
                              }}
            />
            <AuthStack.Screen name={globalHelper.FilterListPerfilScreenID} component={FilterOptionsPerson} options={{ title: '', headerTransparent: true, headerTintColor:'white' }} />
            <AuthStack.Screen name={globalHelper.PerfilExternScreenID} component={PerfilExtern} options={{ title: '', headerTransparent: true, headerTintColor:'white' }} />
            <AuthStack.Screen name={globalHelper.PerfilSmallScreenID} component={PerfilSmall} options={{ title: '', headerTransparent: true, headerTintColor:'white' }} />
        </AuthStack.Navigator>
    );
}


function myCreateNavigatorFunction() {
    let home=false;
    const rootSwitch = createSwitchNavigator(
      {
        [globalHelper.HomeStackScreenID]: HomeStackScreen,
        [globalHelper.AuthScreenID]: AuthStackScreen,
      },
      {
        initialRouteName: home ?  globalHelper.HomeStackScreenID : globalHelper.AuthScreenID
      }
  );

  return rootSwitch;
}

const RootSwitch = myCreateNavigatorFunction();


const AppContainer = createAppContainer(RootSwitch);

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.disableYellowBox=true;
    return (
       <NavigationContainer>
          <AppContainer/>
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
