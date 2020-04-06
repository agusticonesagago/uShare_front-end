import React , {Component} from 'react';
import {StyleSheet, Text, View, Platform, StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';

import AppNavigator from './routes.js';
import Icon from 'react-native-vector-icons/Ionicons';

import Drawer from './components/Drawer.js';
import {NavigationContainer} from '@react-navigation/native';

const AppIndex = createAppContainer(AppNavigator);


export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer/>
      </NavigationContainer>
    );
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
  }
});
