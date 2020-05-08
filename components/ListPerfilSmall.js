import React , {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';

import Drawer from './Drawer.js';
import PerfilSmall from './PerfilSmall.js';

import * as globalHelper from './Auxiliars/GlobalHelper.js'

var API_USER = globalHelper.API_USER;
const asyncStorageLoggedUserEmailKey = globalHelper.asyncStorageLoggedUserEmailKey;

export default class ListPerfilSmall extends React.Component {

  componentDidMount() {
   this.getInfoPersones();
  }

  constructor(props) {
        super(props);
        this.state = {
          'persones': [],
           personesLoaded: false
        }
  }

  async getInfoPersones() {
      try {
          const response = await fetch(API_USER);

          const json = await response.json();
          this.state.persones = json;

          this.setState({
            personesLoaded: true
          });
          //console.log(this.state.actpersoneses); //Per veure quines persones hi ha
      }
      catch (error) {
          console.error(error);
      }
  }

  render() {

      if (this.state.personesLoaded) {
          let profiles = [];
          for (let i = 0; i < this.state.persones.length; ++i) {
              profiles.push(<PerfilSmall nomCognom={this.state.persones[i].name}
                                         description={this.state.persones[i].description}
                                         photo={this.state.persones[i].image}
              />)
          }

          return (
              <View style={styles.container}>
                  <View style={styles.containerNavigator}>
                      <Image source={require("../img/logorodo.png")} style={styles.image}></Image>
                      <Text style={styles.titleNavigator}> Perfils </Text>
                  </View>
                  <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange}
                              showVerticalScrollIndicator={false}>
                      {profiles}
                  </ScrollView>
              </View>
          )
      }
    else {
     return null;
    }
  }
}

/*ListPerfilSmall.navigationOptions = {
  tabBarIcon: ({tintColor,focused}) => (
    <Icon
      //name={focused ? 'md-calendar' : 'ios-calendar'}
      name={'md-calendar'}
      size={28}
      color={tintColor}
    />
  )
}*/

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
