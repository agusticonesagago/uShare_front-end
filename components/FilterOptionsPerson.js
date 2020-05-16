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
import * as globalHelperAPI from './Auxiliars/GlobalHelperAPIs/GlobalHelperAPI_Users.js'

import ListPerfilSmall from "./ListPerfilSmall";



export default class FilterOptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        comarca:   null,
        edatMax: null,
        edatMin: null,

        //events: [], // Should be 'aplecs', 'ballades', 'concerts', 'concursos', 'cursets' or 'altres'
        eventsAplecs: null,
        eventsBallades: null,
        eventsConcerts: null,
        eventsCursets: null,
        eventsAltres: null,

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


    filterUsers() {
        globalHelperAPI.filterUsers(this.state)
            .then( (jsonData) => {
                    this.props.navigation.navigate(globalHelper.ListPerfilScreenID, {users:jsonData})
                }
            )


        //this.props.navigation.navigate(globalHelper.ListPerfilScreenID, jsonData);
    }

  render() {/*
    const text = (this.state.disabled) ? 'Enable' : 'Disable';
    console.log(this.state);
    console.log("\n\n\n\n");
    console.log(this.props.dummy);*/
      console.log("\n\n");
      console.log("\n\n");
      console.log("\n\n");
      return (

          <View style={styles.container}>
             <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange} showVerticalScrollIndicator={false}>
                 <View style={styles.Filter}>
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
                                                onPress={() => { this.filterUsers()
                                                } }>
                        <Text>Filtra</Text>
                    </TouchableHighlight>
                 </View>
             </ScrollView>
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
    //marginLeft: 20,
    //marginTop: 20,
   //marginRight: 30,
  },scrollView:{
      width:'100%',
  },
    Filter:{
        alignItems: 'center',
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
