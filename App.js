import React from 'react';
import {StyleSheet} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Perfil from './components/Perfil.js';

import SignUp from './components/SignUpView.js';
import LogIn from './components/LoginView.js';

import {NavigationContainer} from '@react-navigation/native';

import Actes from './components/ListActesSmall.js';

import * as globalHelper from './components/Auxiliars/GlobalHelper.js'

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListPerfilSmall from "./components/ListPerfilSmall";

const Stack = createStackNavigator();

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
                iconName = 'md-person';
              } else if (route.name === globalHelper.ListPerfilScreenID) {
                iconName = 'md-people';
              }
              //return <Ionicons name={iconName} size={size} color={color}     />;
              return <Icon name={iconName} size={size+10} color={color}     />;
            },
          })} tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
        <Tab.Screen name={globalHelper.ActesScreenID} component={Actes} />
        <Tab.Screen name={globalHelper.ListPerfilScreenID} component={ListPerfilSmall} />
        <Tab.Screen name={globalHelper.PerfilScreenID} component={Perfil} />
      </Tab.Navigator>
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
      </AuthStack.Navigator>
  );
}


function myCreateNavigatorFunction() {

  //let storedUserEmail = await globalHelper.getLoggedUserEmailAsync();
  //globalHelper._signOutAsync();
  /*
  let email = async () => {
    let x= await globalHelper.getLoggedUserEmailAsync();
    console.log("email: "+x);
    return  x;
  };

  console.log("email: "+email);
  let home = email === undefined;
*/
/*
  let email;
  this.state.email =
  globalHelper.getLoggedUserEmailAsync().then((token)=>{
    console.log("token: " + token)
    this.state.emai = token;
    return token;
    //check if user is logged in
  })

  console.log("email: "+email);
*/
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
    /*
    let email = async () => {
      let storedUserEmail = await globalHelper.getLoggedUserEmailAsync();
      return storedUserEmail;
    };
    this.state = {
      email:    email,
    };*/


  }

  render() {
    return (/*
      <NavigationContainer>
        <DrawerFiltersPerson/>
      </NavigationContainer>*/
      //<ModifyPerfil/>
      //<Perfil/>
      //<LogIn/>
      //<SignUp/>

/*
      <NavigationContainer>
          <Stack.Navigator initialRouteName={this.state.email === null ? globalHelper.AuthScreenID : globalHelper.HomeScreenID}>
            <Stack.Screen name={globalHelper.AuthScreenID}  component={AuthStackScreen}/>
            <Stack.Screen name={globalHelper.HomeScreenID}  component={HomeTabScreen}/>
          </Stack.Navigator>
      </NavigationContainer>
*/

        <NavigationContainer>
          <AppContainer/>
        </NavigationContainer>



      /*
        <NavigationContainer>
          <HomeTabScreen/>
        </NavigationContainer>
        */

        /*
        <NavigationContainer>
          <HomeStackScreen/>
        </NavigationContainer>
        */
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
