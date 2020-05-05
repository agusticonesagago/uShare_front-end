import React , {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';

import Drawer from './Drawer.js';

import * as globalHelper from './Auxiliars/GlobalHelper.js'

var API = globalHelper.API;
const asyncStorageLoggedUserEmailKey = globalHelper.asyncStorageLoggedUserEmailKey;

export default class ActeComplete extends React.Component {
  componentDidMount() {
   this.getInfoActe();
  }
  constructor(props) {
        super(props)
        this.state = {
           idActe: '179878',
           when: '',
           where: '',
           activitat: '',
           llocFaMalTemps: '',
           extraInfo:'',
           cobles:'',
           acteLoaded: false,
           imatge:''
        }
  }

  onChangeState = (key, val) => {
      this.setState({ [key]: val })
  }

  async getInfoActe() {
      try {
          const response = await fetch(API + '/actes/' + this.state.idActe);

          const json = await response.json();

          if(json.hora2 === '') this.onChangeState("when", json.dia + ' a les ' + json.hora1 + 'h' );
          else this.onChangeState("when", json.dia + ' de ' + json.hora1 + 'h' + ' a ' + json.hora2 + 'h');
          this.onChangeState("where", json.poblacioMitjana + ' - ' + json.lloc);
          this.onChangeState("activitat", json.tipus);

          if(json.llocSiPlou === '') this.onChangeState("llocFaMalTemps", "No n'hi ha");
          else this.onChangeState("llocFaMalTemps", json.llocSiPlou);

          if(json.mesDades === '') this.onChangeState("extraInfo", json.nomActivitat);
          else this.onChangeState("extraInfo", json.nomActivitat + ' | ' + json.mesDades);

          this.onChangeState("cobles", json.cobla1);
          this.onChangeState("imatge", json.imatge);
          this.setState({
            acteLoaded: true
          });
      }
      catch (error) {
          console.error(error);
      }
  }

  render() {
    if(this.state.acteLoaded){
      let Image_Http_URL = {uri: this.state.imatge};
      return (
        <View style={styles.containerActe}>
            <Image source={Image_Http_URL} style={styles.image} rezideMode="center"></Image>
            <View style={styles.containerInfoActe}>
              <View style={styles.WhereWhen}>
                <Text style={styles.Where}>
                  {/*RIPOLL. Plaça de l'Ajuntament*/}
                  {this.state.where}
                </Text>
                <Text style={styles.When}>
                  {/*11.05.2020 12:00h i 17:30h*/}
                  {this.state.when}
                </Text>
              </View>
              <View style={styles.ActivitatCobles}>
                <Text style={styles.ActivitatCoblesInterpets}>Activitat:</Text>
                <Text style={styles.InfoActeActivitatCobles}>{/*Ballada*/}{this.state.activitat}</Text>
              </View>
              <View style={styles.ActivitatCobles}>
                <Text style={styles.ActivitatCoblesInterpets}>Cobles/Intèrprets:</Text>
                <Text style={styles.InfoActeActivitatCobles}>{/*La Selvatana*/}{this.state.cobles}</Text>
              </View>
              <View style={styles.ActivitatCobles}>
                <Text style={styles.ActivitatCoblesInterpets}>Lloc si fa mal temps:</Text>
                <Text style={styles.InfoActeActivitatCobles}>{/*CEIP Sant Cristòfor*/}{this.state.llocFaMalTemps}</Text>
              </View>
              <View style={{marginTop: 3}}></View>
              <Text style={styles.ExtraInfoActe}>{/*Festa Major. A les 12h sardanes d'honor i ballada de 3 sardanes. A les 17:30h, ballada a la Plaça Gran (sardana de 7 tirades)*/}
              {this.state.extraInfo}</Text>
          </View>
        </View>
      )
    }
    else {
     return null;
    }
  }
}

ActeComplete.navigationOptions = {
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
  containerActe: {
    backgroundColor: 'grey',
    width:'100%',
    backgroundColor: "beige",
  },
  image:{
    width:'100%',
    height:'50%',
  },
  containerInfoActe:{
    height:'50%',
    width:'97%',
    justifyContent: 'center',
  },
  WhereWhen:{
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 20,
    marginTop:15,
  },
  Where:{
    marginRight: 2,
    color: '#714170',
    fontWeight: 'bold',
    fontSize: 20,
  },
  When:{
    color:'grey',
    fontSize: 20,
    color: '#714170',
    fontWeight: 'bold',
    marginTop:10,
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
  scrollView:{
    flex:1,
    width:'100%',
  },
});
