import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Perfil from './components/Perfil.js'
import Actes from './components/Actes.js'
import LoginView from './components/LoginView.js'
import SignUpView from './components/SignUpView.js'



const AppNavigator = createMaterialTopTabNavigator(
  {
    Perfil: Perfil,
    Actes: Actes,
    LoginView: LoginView,
    SignUpView: SignUpView
  },
  {
    tabBarOptions:{
      activeTintColor: 'white',
      inactiveTintColor: '#b883b7',
      showIcon : true,
      // showLabel: false, si volem nomes iconos
      style: {
        backgroundColor: '#714170'
      }
    },
  }
)

export default AppNavigator;
