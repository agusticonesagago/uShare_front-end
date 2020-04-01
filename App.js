import React , {Component} from 'react';
import {StyleSheet, Text, View, Platform, StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';

import AppNavigator from './routes.js';
import Icon from 'react-native-vector-icons/Ionicons';
const AppIndex = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex : 1}}>
      <StatusBar
        backgroundColor='black'
        barStyle='light-content'
      />
        <View style={styles.header}>
          <Icon name="ios-camera" size={28} color={"white"}/>
          <Icon name="ios-menu" size={28} color={"white"}/>
        </View>
        <AppIndex/>
      </View>
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
