import React , {Component, Fragment} from 'react';
import {StyleSheet, Text, View, Picker, ScrollView,
  TouchableHighlight, SafeAreaView, Button, TouchableOpacity} from 'react-native';

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
import MyCheckBox from "./CheckBox/MyCheckBox";
import MyAutoComplete from "./MyAutoComplete/MyAutoComplete";


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
    return <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.titleNavigator}> Filtrar actes </Text>
      </View>
      <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange}
                  showVerticalScrollIndicator={false}>
        <View style={styles.Filter}>

          <View style={{flexDirection: 'row',marginBottom:10}}>
           <Icon name={"md-time"} size={40} color={"blue"}/>
            <Text style={styles.titleFilter}> {"Dates"}</Text>
          </View>
          <MyDatePicker text="Entre el"
                        dateKey="diaMinim"
                        placeholder="Escollir data inici"
                        onChangeState={this.onChangeState}>
          </MyDatePicker>
          <MyDatePicker text="i el        "
                        dateKey="diaMaxim"
                        placeholder="Escollir data final"
                        onChangeState={this.onChangeState}>
          </MyDatePicker>

          <View style={styles.rowCheckBox}>
            <View style={styles.columnCheckBox}>
              <MyCheckBox title="Aplecs"
                          checkBoxKey="aplecs"
                          initialValue={this.state.aplecs}
                          onChangeState={this.onChangeState}>
              </MyCheckBox>

              <MyCheckBox title="Concursos"
                          checkBoxKey="concursos"
                          initialValue={this.state.concursos}
                          onChangeState={this.onChangeState}>
              </MyCheckBox>
            </View>

            <View style={styles.columnCheckBox}>
              <MyCheckBox title="Ballades"
                          checkBoxKey="ballades"
                          initialValue={this.state.ballades}
                          onChangeState={this.onChangeState}>
              </MyCheckBox>

              <MyCheckBox title="Cursets"
                          checkBoxKey="cursets"
                          initialValue={this.state.cursets}
                          onChangeState={this.onChangeState}>
              </MyCheckBox>
            </View>

            <View style={styles.columnCheckBox}>
              <MyCheckBox title="Concerts"
                          checkBoxKey="concerts"
                          initialValue={this.state.concerts}
                          onChangeState={this.onChangeState}>
              </MyCheckBox>

              <MyCheckBox title="Altres"
                          checkBoxKey="altres"
                          initialValue={this.state.altres}
                          onChangeState={this.onChangeState}>
              </MyCheckBox>
            </View>
          </View>




          <SafeAreaView style={{marginTop: 40, marginRight: 20}}>
            <MyAutoComplete title="Comarca"
                            placeholder=""
                            autoCompleteKey="comarca"
                            data={globalHelperData.DataComarques}
                            onChangeState={this.onChangeState}
                            iconName = "md-pin"
                            iconSize = {40}
                            iconColor = "red">>
            </MyAutoComplete>
          </SafeAreaView>

          <TouchableOpacity style={styles.buttonContainer}
                              onPress={() => {
                                this.filterActes()
                              }}>
            <Text style={styles.buttonText}>{"Filtrar"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>;
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  containerNavigator: {
    backgroundColor: '#714170',
    height: '13.2%',
    width:'100%',
    flexDirection:'row',
  },
  headerBar:{
    width:'100%',
    //height: '13.2%',
    height: 56,
    flexDirection:'row',
    backgroundColor: '#714170',
  },
  titleNavigator:{
    color:'white',
    fontSize:30,
    paddingTop:10,
    width:'100%',
    textAlign: 'center'

  },
  scrollView:{
    width:'100%',
  },
  Filter:{
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 20
  },
  titleFilter:{
    fontSize:30,
  },
  rowCheckBox:{
    flexDirection: 'row',
  },
  columnCheckBox:{
    flexDirection: 'column',
  },
  titleOrder:{
    fontSize:30,
  },
  buttonContainer: {
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:50,
    borderRadius:10,
    width:'30%',
    marginLeft:'10%',
    marginRight:'10%',
    backgroundColor: '#714170',
  },

  buttonText:{
    color:"white",
    fontSize: 28,
    fontStyle:"normal"
  }

});
