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
var API = globalHelper.API;
const asyncStorageLoggedUserEmailKey = globalHelper.asyncStorageLoggedUserEmailKey;

export default class Actes extends React.Component {
  componentDidMount() {
   this.nombreAsistents();
  }
  constructor(props) {
    super(props);
    this.state = {
      nombreAsistents:[],
      nombreAsistentsLoaded: false
    }
  }

  async nombreAsistents(){
    try {
        var id = this.props.identificador
        const response = await fetch(API + '/actes/'+ id + '/assistants');

        const json = await response.json();
        this.state.nombreAsistents = json;
        this.setState({
          nombreAsistentsLoaded: true
        });
    }
    catch (error) {
        console.error(error);
    }
  }

  anulat() {
    if(this.props.anulat=="Suspès"){
        return(
          <Text style={styles.anulat}>
            [ANUL·LAT]
          </Text>
        )
    }
    else return null
  }

  assistents() {
    if(this.props.anulat!="Suspès" ){
        return(
          <View style={styles.ActivitatCobles}>
            <Text style={styles.ActivitatCoblesInterpets}>Nombre d'assistents:</Text>
            <Text style={styles.InfoActeActivitatCobles}>{this.state.nombreAsistents.length}</Text>
          </View>
        )
    }
    else return null
  }

  render() {
    if(this.state.nombreAsistentsLoaded){
      return (
        <View style={styles.containerActe}>
            <View style={styles.WhereWhen}>
              {this.anulat()}
              <Text style={styles.Where}>
                {this.props.nomActivitat}
              </Text>
              <Text style={styles.When}>
                {this.props.when} h
              </Text>
            </View>
            <View style={styles.containerActeIndiv}>
              <View style={styles.containerInfoActe}>
                <View style={styles.ActivitatCobles}>
                  <Text style={styles.ActivitatCoblesInterpets}>Activitat:</Text>
                  <Text style={styles.InfoActeActivitatCobles}>{this.props.activitat}</Text>
                </View>
                <View style={styles.ActivitatCobles}>
                  <Text style={styles.ActivitatCoblesInterpets}>Cobles/Intèrprets:</Text>
                  <Text style={styles.InfoActeActivitatCobles}>{this.props.cobla}</Text>
                </View>
                <View style={styles.ActivitatCobles}>
                  <Text style={styles.ActivitatCoblesInterpets}>On:</Text>
                  <Text style={styles.InfoActeActivitatCobles}>{this.props.where}</Text>
                </View>
                {this.assistents()}
                <View style={{marginTop: 3}}></View>
              </View>

              <View style={styles.containerButtonActe}>
                <TouchableOpacity style={[styles.buttonContainer, styles.InfoButton]}
                                      onPress={() => this.props.navigation.navigate(globalHelper.ActeCompleteID, {id:this.props.identificador})}>
                  <Text style={styles.mesInfoText}>Més informació</Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>
      )
      }
    else return null
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
  containerInfoActe:{
    flexDirection: 'column',
    width:'70%',
  },
  containerActeIndiv:{
    flexDirection: 'row',
    width:'100%',
  },
  Where:{
    marginRight: 2,
    color: '#714170',
    fontWeight: 'bold',
    fontSize: 15,
    width:'55%',
    marginRight:'5%',
  },
  When:{
    color:'grey',
    fontSize: 15,
    width:'auto',
    maxWidth:'20%',
  },
  anulat:{
    marginRight: 10,
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom:10,
    marginTop:2,
    textAlignVertical: 'center',
    width:'auto',
  },
  ActivitatCobles:{
    marginLeft: 10,
    marginTop:5,
    flexDirection:'row',
    width:'100%',
  },
  ActivitatCoblesInterpets:{
    fontWeight: 'bold',
    marginRight:5,
    color:'grey',
    fontSize: 15,
    width:'auto',
  },
  InfoActeActivitatCobles:{
    color:'grey',
    fontSize: 15,
    width:'auto',
    maxWidth:'50%',
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
    width:'100%',
    paddingTop:10,
    paddingBottom:10,
    borderRadius:30,
  },
  InfoButton: {
    backgroundColor: "#714170",
  },
  mesInfoText: {
    color: 'white',
    fontSize: 15,
    width:'90%',
    textAlign:'center',
  },
  containerButtonActe:{
    width:'27%',
    marginRight:'3%',
    marginTop:20,
  }
});
