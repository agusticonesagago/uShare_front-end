import React , {Component, Fragment} from 'react';
import {StyleSheet, Text, View, Picker, ScrollView, TouchableHighlight} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';

import Drawer from './Drawer.js';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';

import Autocomplete from 'react-native-dropdown-autocomplete-textinput';
import * as globalHelperData from "./Auxiliars/GlobalHelperData";
import * as globalHelperAPI_ACTES from "./Auxiliars/GlobalHelperAPIs/GlobalHelperAPI_Actes";
import * as globalHelper from "./Auxiliars/GlobalHelper";

const DataIndrets = [
  {code: 'Barcelona', name: 'Barcelona'},
  {code: 'Girona', name: 'Girona'},
];

const DataCobles = [
  {code: 'Amoga', name: 'Amoga'},
  {code: 'Amsterdam', name: 'Amsterdam'},
];

export default class FilterOptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      aplecs:   true,
      ballades: true,
      concerts: true,
      concursos: true,
      cursets: true,
      altres: true,
      dateEnd:"",
      dateStart:"",
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
        <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange} showVerticalScrollIndicator={false}>
            <View style={styles.Filter}>
              <Text style={styles.titleFilter}>Filtres</Text>
              <View style={styles.containerAgenda}>
                <Text style={styles.titleBetweenAgenda}>Entre el</Text>
                <DatePicker
                  style={{
                    width: 190,
                  }}
                  date={this.state.dateStart}
                  mode="date"
                  placeholder="Escollir data inici"
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateInput: {
                      marginLeft: 5,
                    }
                  }}
                  onDateChange={(dateStart) => {this.setState({dateStart: dateStart})}}
                />
              </View>
              <View style={styles.containerAgenda}>
                <Text style={styles.titleBetweenAgenda}>i el</Text>
                <DatePicker
                  style={{
                    width: 190,
                    marginLeft:38,
                  }}
                  date={this.state.dateEnd}
                  mode="date"
                  placeholder="Escollir data final"
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateInput: {
                      marginLeft:5,
                    }
                  }}
                  onDateChange={(dateEnd) => {this.setState({dateEnd: dateEnd})}}
                />
              </View>
                <View style={styles.checkBox}>
                  <CheckBox
                    title='Aplecs'
                    value={this.state.aplecs}
                    onValueChange={val => this.onChangeState('aplecs', val)}
                  />
                  <Text style={styles.text}>Aplecs</Text>
                </View>
                <View style={styles.checkBox}>
                  <CheckBox
                    title='Ballades'
                    value={this.state.ballades}
                    onValueChange={val => this.onChangeState('ballades', val)}
                  />
                  <Text style={styles.text}>Ballades</Text>
                </View>

                <View style={styles.checkBox}>
                  <CheckBox
                    title='Concerts'
                    value={this.state.concerts}
                    onValueChange={val => this.onChangeState('concerts', val)}
                  />
                  <Text style={styles.text}>Concerts</Text>
                </View>
                <View style={styles.checkBox}>
                  <CheckBox
                    title='Concursos'
                    value={this.state.concursos}
                    onValueChange={val => this.onChangeState('concursos', val)}
                  />
                  <Text style={styles.text}>Concursos</Text>
                </View>
                <View style={styles.checkBox}>
                  <CheckBox
                    title='Cursets'
                    value={this.state.cursets}
                    onValueChange={val => this.onChangeState('cursets', val)}
                  />
                  <Text style={styles.text}>Cursets</Text>
                </View>
                <View style={styles.checkBox}>
                  <CheckBox
                    title='Altres'
                    value={this.state.altres}
                    onValueChange={val => this.onChangeState('altres', val)}
                  />
                  <Text style={styles.text}>Altres</Text>
                </View>
                <View style={{marginTop: 20, marginRight:20}}>
                  <Autocomplete
                    data={DataIndrets}
                    displayKey="name"
                    placeholder={'Indret'}
                    placeholderColor={'black'}
                    dropDownIconColor	={'#714170'}
                    onSelect={value => console.log('value', value)}
                    maxHeight={200}
                  />
                  <View style={{marginTop: 3}}></View>
                  <Autocomplete
                    data={DataCobles}
                    displayKey="name"
                    placeholder={'Cobla'}
                    placeholderColor={'black'}
                    dropDownIconColor	={'#714170'}
                    onSelect={value => console.log('value', value)}
                    maxHeight={200}
                  />
                </View>

                <TouchableHighlight style={styles.buttonContainer}
                                    onPress={() => { this.filterActes()
                                    } }>
                  <Text>Filtra</Text>
                </TouchableHighlight>
            </View>
          </ScrollView>
      </View>
    );
  }

  filterActes() {
    globalHelperAPI_ACTES.filterActes(this.state)
        .then( (jsonData) => {
              this.props.navigation.navigate(globalHelper.ListActesScreenID, {data:jsonData})
            }
        )
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
  },
  scrollView:{
    width:'100%',
  },
  Filter:{
    alignItems: 'center',
  },
  titleFilter:{
    fontSize:30,
  },
  checkBox:{
    flexDirection: 'row',
    marginTop:25,
  },
  text:{
    fontSize:22,
    marginLeft:15,
  },
  titleOrder:{
    fontSize:30,
  },
  containerAgenda:{
    flex:1,
    flexDirection:'row',
    marginTop:10,
  },
  titleBetweenAgenda:{
    fontSize:18,
    paddingTop:7,
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
