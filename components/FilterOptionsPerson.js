import React , {Component, Fragment} from 'react';
import {StyleSheet, Text, View, Picker, ScrollView} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';

import Drawer from './Drawer.js';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';

import Autocomplete from 'react-native-dropdown-autocomplete-textinput';


const DataOrder = [
  {code: 'Proximitat', name: 'Proximitat'},
  {code: 'Edat', name: 'Edat'},
];

export default class FilterOptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      proximitat:   true,
      edat: true,
      comptarIRepartir: true,
      nivellInteres: true,
      nivellExperiencia: true,
      qualitatActe: true,
      sardaCompeticio:true,
      coblaCompeticio:true,
      disponibilitatVehicle:true,
    }
  }

  onChangeState = (key, val) => {
    this.setState({ [key]: val })
  };



  render() {
    const text = (this.state.disabled) ? 'Enable' : 'Disable';
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Text style={styles.titleFilter}>Filtres</Text>
        <View style={{marginTop: 20, marginRight:20}}>
          <Autocomplete
            data={DataOrder}
            displayKey="name"
            placeholder={<Text style={styles.titleOrder}>Ordenar per</Text>}
            placeholderColor={'black'}
            dropDownIconColor	={'#714170'}
            onSelect={value => console.log('value', value)}
            maxHeight={500}
          />
        </View>
        <View style={styles.checkBox}>
          <CheckBox
            title='Proximitat'
            value={this.state.proximitat}
            onValueChange={val => this.onChangeState('proximitat', val)}
          />
          <Text style={styles.text}>Proximitat</Text>
        </View>
        <View style={styles.checkBox}>
          <CheckBox
            title='Edat'
            value={this.state.edat}
            onValueChange={val => this.onChangeState('edat', val)}
          />
          <Text style={styles.text}>Edat</Text>
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
            title='NivellInteres'
            value={this.state.nivellInteres}
            onValueChange={val => this.onChangeState('nivellInteres', val)}
          />
          <Text style={styles.text}>Nivell d'interès en actes sardanistes</Text>
        </View>
        <View style={styles.checkBox}>
          <CheckBox
            title='NivellExperiencia'
            value={this.state.nivellExperiencia}
            onValueChange={val => this.onChangeState('NivellExperiencia', val)}
          />
          <Text style={styles.text}>Nivell d'experiència en ballades</Text>
        </View>
        <View style={styles.checkBox}>
          <CheckBox
            title='QualitatActe'
            value={this.state.qualitatActe}
            onValueChange={val => this.onChangeState('qualitatActe', val)}
          />
          <Text style={styles.text}>Qualitat acte</Text>
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
            title='DisponibilitatVehicle'
            value={this.state.disponibilitatVehicle}
            onValueChange={val => this.onChangeState('disponibilitatVehicle', val)}
          />
          <Text style={styles.text}>Vehicle</Text>
        </View>
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
  }
});
