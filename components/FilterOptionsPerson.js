import React , {Component, Fragment} from 'react';
import {StyleSheet, Text, TextInput, View, Picker, ScrollView, TouchableHighlight} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';

import Drawer from './Drawer.js';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';

import Autocomplete from 'react-native-dropdown-autocomplete-textinput';


import * as globalHelper from './Auxiliars/GlobalHelper.js'
import * as globalHelperData from './Auxiliars/GlobalHelperData.js'
import ListPerfilSmall from "./ListPerfilSmall";



export default class FilterOptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        comarca:   null,
        edatMax: null,
        edatMin: null,

        eventsAplecs: null,
        eventsBallades: null,
        eventsConcerts: null,
        eventsCursets: null,
        eventsAltres: null,

        //events: [], // Should be 'aplecs', 'ballades', 'concerts', 'concursos', 'cursets' or 'altres'
        //habilitats: [], // Should be 'comptar' or 'competidor' or 'coblaCompeticio'

        habilitatsComptar: null,
        habilitatsCompetidor: null,
        habilitatsCoblaCompeticio: null,


        vehicle: false,
        ordenar: null,


      first: true,// flag de control

      Users:[], // Dades
    }


    this.onChangeState.bind(this);
  }

  onChangeState = (key, val) => {
    this.setState({ [key]: val })
  };



  addParameter(url, key, val) {
    if(val === null) return url;
    else if(this.state.first===true) {
      this.state.first = false;
      console.log(this.state.first);
      return url + "?" + key + "=" + val;
    }
    else return url + "&" + key + "=" + val;
    
  }

    addParameterEvents(API_USER_FILTER) {
        let events = [];
        if(this.state.eventsAplecs)     events.push("aplecs");
        if(this.state.eventsBallades)   events.push("ballades");
        if(this.state.eventsConcerts)   events.push("concerts");
        if(this.state.eventsCursets)    events.push("cursets");
        if(this.state.eventsAltres)     events.push("altres");
        for(let i = 0; i < events.length; ++i) {
            API_USER_FILTER = this.addParameter(API_USER_FILTER, "events", events[i])
        }
        return API_USER_FILTER;
    }

    addParameterHabilitats(url) {
        let habilitats = [];
        if(this.state.habilitatsComptar)     habilitats.push("comptar");
        if(this.state.habilitatsCompetidor)   habilitats.push("competidor");
        if(this.state.habilitatsCoblaCompeticio)   habilitats.push("coblaCompeticio");
        for(let i = 0; i < habilitats.length; ++i) {
            url = this.addParameter(url, "habilitats", habilitats[i])
        }
        return url;
    }

    buildURL() {
        let API_USER_FILTER = globalHelper.API_USER + "filters";
        API_USER_FILTER = this.addParameter(API_USER_FILTER,"comarca",this.state.comarca);
        API_USER_FILTER = this.addParameter(API_USER_FILTER,"edatMax",this.state.edatMax);
        API_USER_FILTER = this.addParameter(API_USER_FILTER,"edatMin",this.state.edatMin);

        API_USER_FILTER = this.addParameterEvents(API_USER_FILTER);
        API_USER_FILTER = this.addParameterHabilitats(API_USER_FILTER);

        //API_USER_FILTER = this.addParameter(API_USER_FILTER,"vehicle",this.state.vehicle);
        //API_USER_FILTER = this.addParameter(API_USER_FILTER,"ordenar",this.state.ordenar);


        this.onChangeState("first", true); // reset control flag
        return API_USER_FILTER;
    }


  async filterUsers() {
    try {
        let API_USER_FILTER = this.buildURL();
        console.log('\n\nfetch URL = ' + API_USER_FILTER+'\n\n');
        const response = await fetch(API_USER_FILTER);
        console.log('\n\nAfter Fetch \n\n');
        const json = await response.json();
        console.log("\n\n");
        console.log(response);
        console.log("\n\n");
        //console.log(json);
        console.log("\n\n");
        console.log('\n\nFinal \n\n');

        this.state.Users = json;

        //console.log(this.state.Users);
        //this.props.navigation.navigate(globalHelper.ListPerfilScreenID);

         //TODO Que faig aqui...
        return json;
    }
    catch (error) {
        console.log('\n\nError:'  + error+ '\n\n');
        console.error(error);
    }

}

  render() {
    const text = (this.state.disabled) ? 'Enable' : 'Disable';
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Text style={styles.titleFilter}>Filtres</Text>
        <View style={{marginTop: 20, marginRight:20}}>
          <Autocomplete
            data={globalHelperData.DataOrder}
            displayKey="name"
            placeholder={<Text style={styles.titleOrder}>Ordenar per</Text>}
            placeholderColor={'black'}
            dropDownIconColor	={'#714170'}
            onSelect={val => this.onChangeState('ordenar', val)}
            maxHeight={500}
          />
        </View>

          <View style={{marginTop: 20, marginRight:20}}>
              <Autocomplete
                  data={globalHelperData.DataComarques}
                  displayKey="name"
                  placeholder={<Text style={styles.titleOrder}>Comarca</Text>}
                  placeholderColor={'black'}
                  dropDownIconColor	={'#714170'}
                  onSelect={val => this.onChangeState('comarca', val)}
                  maxHeight={500}
              />
          </View>

        <View style={styles.text}>
          <TextInput
              style={styles.text}
              keyboardType = 'number-pad'
              placeholder='Edat minima'
              autoCapitalize="none"
              onChangeText={val => this.onChangeState('edatMin', val)}
              multiline={true} // More than one line
            />
        </View>

          <View style={styles.text}>
              <TextInput
                  style={styles.text}
                  keyboardType = 'number-pad'
                  placeholder='Edat maxima'
                  autoCapitalize="none"
                  onChangeText={val => this.onChangeState('edatMax', val)}
                  multiline={true} // More than one line
              />
          </View>

        <View style={styles.checkBox}>
          <CheckBox
            title='ComptarIRepartir'
            value={this.state.comptarIRepartir}
            onValueChange={val => this.onChangeState('comptarIRepartir', val)}
          />
          <Text style={styles.text}>Comptar i repartir</Text>
        </View>

        <View style={styles.checkBox}>
          <CheckBox
            title='SardaCompeticio'
            value={this.state.sardaCompeticio}
            onValueChange={val => this.onChangeState('sardaCompeticio', val)}
          />
          <Text style={styles.text}>Sardanista competició</Text>
        </View>
        <View style={styles.checkBox}>
          <CheckBox
            title='CoblaCompeticio'
            value={this.state.coblaCompeticio}
            onValueChange={val => this.onChangeState('coblaCompeticio', val)}
          />
          <Text style={styles.text}>Cobla competició</Text>
        </View>
        <View style={styles.checkBox}>
          <CheckBox
            title='eventsAplecs'
            value={this.state.eventsAplecs}
            onValueChange={val => this.onChangeState('eventsAplecs', val)}
          />
          <Text style={styles.text}>Aplecs</Text>
        </View>
          <View style={styles.checkBox}>
              <CheckBox
                  title='eventsBallades'
                  value={this.state.eventsBallades}
                  onValueChange={val => this.onChangeState('eventsBallades', val)}
              />
              <Text style={styles.text}>Ballades</Text>
          </View>

          <View style={styles.checkBox}>
              <CheckBox
                  title='eventsConcerts'
                  value={this.state.eventsConcerts}
                  onValueChange={val => this.onChangeState('eventsConcerts', val)}
              />
              <Text style={styles.text}>Concerts</Text>
          </View>

          <View style={styles.checkBox}>
              <CheckBox
                  title='eventsCursets'
                  value={this.state.eventsCursets}
                  onValueChange={val => this.onChangeState('eventsCursets', val)}
              />
              <Text style={styles.text}>Cursets</Text>
          </View>

          <View style={styles.checkBox}>
              <CheckBox
                  title='eventsAltres'
                  value={this.state.eventsAltres}
                  onValueChange={val => this.onChangeState('eventsAltres', val)}
              />
              <Text style={styles.text}>Altres</Text>
          </View>

          <View style={styles.checkBox}>
              <CheckBox
                  title='DisponibilitatVehicle'
                  value={this.state.disponibilitatVehicle}
                  onValueChange={val => this.onChangeState('disponibilitatVehicle', val)}
              />
              <Text style={styles.text}>Vehicle</Text>
          </View>

        <TouchableHighlight style={styles.buttonContainer}
                                    onPress={() => this.filterUsers() }>
            <Text>Filtra</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 20,
    marginRight: 30,
  },
  checkBox:{
    flexDirection: 'row',
    marginTop:7,
  },
  text:{
    fontSize:22,
    marginLeft:15,
  },
  titleOrder:{
    fontSize:20,
    marginTop:15,
  },
  titleFilter:{
    fontSize:30,
  },
  picker:{
    flex: 1,
    width:'80%',
  },
  buttonContainer: {
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    borderRadius:30,
    width:'80%',
    marginLeft:'10%',
    marginRight:'10%',
  },
});
