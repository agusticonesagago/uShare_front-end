import React , {Component, Fragment} from 'react';
import {StyleSheet, Text, View, Picker, ScrollView, TouchableHighlight} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';

import Drawer from './Drawer.js';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';

import MyDatePicker from "./DatePicker/MyDatePicker";

import Autocomplete from 'react-native-dropdown-autocomplete-textinput';
import * as globalHelperData from "./Auxiliars/GlobalHelperData";
import * as globalHelperAPI_ACTES from "./Auxiliars/GlobalHelperAPIs/GlobalHelperAPI_Actes";
import * as globalHelper from "./Auxiliars/GlobalHelper";
import {bind} from "lodash";


export default class FilterOptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      aplecs:   true,
      ballades: true,
      concerts: true,
      concursos: true, // todo: afegir al registrar-se
      cursets: true,
      altres: true,


    diaMinim:"",
      diaMaxim:"",
      comarca:null,

      first:true,
    }

    bind(this.onChangeState)
  }

  onChangeState = (key, val) => {
    this.setState({ [key]: val })
  };

  filterActes() {
    globalHelperAPI_ACTES.filterActes(this.state)
        .then( (jsonData) => {
              this.props.navigation.navigate(globalHelper.ListActesScreenID, {data:jsonData})
            }
        )
  }

  render() {
    const text = (this.state.disabled) ? 'Enable' : 'Disable';
    console.log(this.state);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange} showVerticalScrollIndicator={false}>
            <View style={styles.Filter}>
              <Text style={styles.titleFilter}>Filtres</Text>
              <MyDatePicker text = "Entre el"
                            dateKey = "diaMinim"
                            placeholder = "Escollir data inici"
                            onChangeState = {this.onChangeState}>
              </MyDatePicker>
              <MyDatePicker text = "i el        "
                            dateKey = "diaMaxim"
                            placeholder = "Escollir data final"
                            onChangeState = {this.onChangeState}>
              </MyDatePicker>

              <View style={{marginTop: 20, marginRight:20}}>
                <Autocomplete
                    data={globalHelperData.DataComarques}
                    displayKey="name"
                    placeholder={<Text style={styles.titleOrder}>Comarca</Text>}
                    placeholderColor={'black'}
                    dropDownIconColor	={'#714170'}
                    onSelect={val => {
                      let name = val.name;
                      console.log("name: " + name);
                      this.onChangeState('comarca', name);
                    }}
                    maxHeight={500}
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
