import React , {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';

import Actes from './Actes.js';
import Drawer from './Drawer.js';
import PerfilSmall from './PerfilSmall.js';

export default class ListActesSmall extends React.Component {
  render() {
    let actes = []
    for (let i = 0; i < 8; ++i) {
     actes.push(<Actes/>)
    }
    return (
      <View style={styles.container}>
        <View style={styles.containerNavigator}>
          <Image source={require("../img/logorodo.png")} style={styles.image}></Image>
          <Text style={styles.titleNavigator}> Actes </Text>
        </View>
        <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange} showVerticalScrollIndicator={false}>
          {actes}
        </ScrollView>
      </View>
    );
  }
}

ListActesSmall.navigationOptions = {
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  scrollView:{
    flex:1,
    width:'100%',
  },
  containerNavigator: {
    backgroundColor: '#714170',
    height: '12%',
    width:'100%',
    flexDirection:'row',
  },
  titleNavigator:{
    color:'white',
    fontSize:30,
    paddingTop:20,
    width:'50%',
  },
  image:{
    borderRadius:100,
    overflow: 'hidden',
    position: 'relative',
    height:60,
    width:60,
    marginTop:10,
    marginBottom:10,
    marginLeft:20,
    marginRight:20,
  },
});
