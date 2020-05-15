import React from 'react';
import {
    Alert,
    AsyncStorage,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';

import Drawer from './Drawer.js';

import * as globalHelper from './Auxiliars/GlobalHelper.js'

var API_USER = globalHelper.API_USER;
const asyncStorageLoggedUserEmailKey = globalHelper.asyncStorageLoggedUserEmailKey;

export default class Actes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <View style={styles.containerActe}>
          <View style={styles.WhereWhen}>
            <Text style={styles.Where}>
              {/*RIPOLL. Plaça de l'Ajuntament*/}
              {this.props.where}
            </Text>
            <Text style={styles.When}>
              {/*11.05.2020 12:00h i 17:30h*/}
              {this.props.when} h
            </Text>
          </View>
          <View style={styles.ActivitatCobles}>
            <Text style={styles.ActivitatCoblesInterpets}>Activitat:</Text>
            <Text style={styles.InfoActeActivitatCobles}>{/*Ballada*/} {this.props.activitat}</Text>
          </View>
          <View style={styles.ActivitatCobles}>
            <Text style={styles.ActivitatCoblesInterpets}>Cobles/Intèrprets:</Text>
            <Text style={styles.InfoActeActivitatCobles}>{/*La Selvatana*/}{this.props.cobla}</Text>
          </View>
          <View style={{marginTop: 3}}></View>
          <Text style={styles.ExtraInfoActe}>{/*Festa Major. A les 12h sardanes d'honor i ballada de 3 sardanes. A les 17:30h, ballada a la Plaça Gran (sardana de 7 tirades)*/}{this.props.description}</Text>
          <TouchableOpacity style={[styles.buttonContainer, styles.InfoButton]}
                                onPress={() => this.props.navigation.navigate(globalHelper.ActeCompleteID, {id:this.props.identificador})}>
            <Text style={styles.loginText}>Més informació</Text>
          </TouchableOpacity>
      </View>
    );
  }
}
/*
Actes.navigationOptions = {
  tabBarIcon: ({tintColor,focused}) => (
    <Icon
      //name={focused ? 'md-calendar' : 'ios-calendar'}
      name={'md-calendar'}
      size={28}
      color={tintColor}
    />
  )
}
*/
const styles = StyleSheet.create({
  containerActe: {
    width:'100%',
    backgroundColor: "beige",
    borderWidth: 0.5,
  },
  WhereWhen:{
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 20,
    marginTop:15,
  },
  Where:{
    marginRight: 2,
    color: '#714170',
    fontWeight: 'bold',
    fontSize: 15,
    width:'80%',
  },
  When:{
    color:'grey',
    fontSize: 15,
  },
  ActivitatCobles:{
    marginLeft: 10,
    marginTop:5,
    flexDirection:'row',
  },
  ActivitatCoblesInterpets:{
    fontWeight: 'bold',
    marginRight:5,
    color:'grey',
    fontSize: 15,
  },
  InfoActeActivitatCobles:{
    color:'grey',
    fontSize: 15,
  },
  ExtraInfoActe:{
    marginLeft: 10,
    color:'grey',
    marginBottom:10,
    fontSize: 15,
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  InfoButton: {
    backgroundColor: "purple",
  },
});
