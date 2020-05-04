import React , {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';

import Drawer from './Drawer.js';


export default class PerfilSmall extends React.Component {
  render() {
    return (
        <View style={styles.containerPerfil}>
          {this.props.photo && (
            <Image source={{uri: `data:image/gif;base64,${this.props.photo}`}} style={styles.imageProfile}></Image>
          )}
          {!this.props.photo && (<Image source={require("../img/interface.png")} style={styles.imageProfile} rezideMode="center"></Image>)}
          <View style={styles.containerInfoProfile}>
            <Text style={styles.nameProfile}>{this.props.nomCognom}</Text>
            <Text style={styles.descriptionProfile}>{this.props.description}</Text>
          </View>
        </View>
    );
  }
}

PerfilSmall.navigationOptions = {
  tabBarIcon: ({tintColor,focused}) => (
    <Icon
      //name={focused ? 'md-calendar' : 'ios-calendar'}
      name={'md-calendar'}
      size={28}
      color={tintColor}
    />
  )
}

const styles = StyleSheet.create({
  containerPerfil: {
    backgroundColor: 'grey',
    width:'100%',
    backgroundColor: "beige",
    borderWidth: 0.5,
    flexDirection:'row',
  },
  imageProfile:{
    overflow: 'hidden',
    position: 'relative',
    height:120,
    width:120,
    marginTop:10,
    marginBottom:10,
    marginLeft:20,
    marginRight:20,
  },
  containerInfoProfile:{
    overflow: 'hidden',
    position: 'relative',
    flexDirection:'column',
    marginTop:30,
    marginBottom:10,
    marginLeft:0,
    marginRight:20,
    width:'60%',
  },
  nameProfile:{
    fontWeight: 'bold',
    marginRight:5,
    color:'grey',
    fontSize: 19,
  },
  descriptionProfile:{
    width:'100%',
    marginTop: 10,
    color:'grey',
  },


});
