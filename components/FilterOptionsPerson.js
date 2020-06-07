import React , {Component, Fragment} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Picker,
    ScrollView,
    TouchableHighlight,
    SafeAreaView,
    TouchableOpacity, Switch
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


import Autocomplete from 'react-native-dropdown-autocomplete-textinput';


import * as globalHelper from './Auxiliars/GlobalHelper.js'
import * as globalHelperData from './Auxiliars/GlobalHelperData.js'
import * as globalHelperAPI from './Auxiliars/GlobalHelperAPIs/GlobalHelperAPI_Users.js'
import * as globalHelperAPI_ACTES from './Auxiliars/GlobalHelperAPIs/GlobalHelperAPI_Actes.js'

import MyCheckBox from "./CheckBox/MyCheckBox";
import MyAutoComplete from "./MyAutoComplete/MyAutoComplete";



export default class FilterOptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        comarca:   null,
        edatMax: null,
        edatMin: null,

        //events: [], // Should be 'aplecs', 'ballades', 'concerts', 'concursos', 'cursets' or 'altres'
        eventsAplecs: false,
        eventsBallades: false,
        eventsConcerts: false,
        eventsCursets: false,
        eventsConcursos:false,
        eventsAltres: false,

        //habilitats: [], // Should be 'comptar' or 'competidor' or 'coblaCompeticio'
        habilitatsComptar: false,
        habilitatsCompetidor: false,

        vehicle: false,
        ordenar: null,

      first: true,// flag de control

        isActeAssistants:false,
        acteID:null,

      Users:[], // Dades
    }

    if(props.route.params.isActeAssistants) {
        this.state.isActeAssistants = true;
        this.state.acteID = this.props.route.params.acteID;
    }

    this.onChangeState.bind(this);
  }

  onChangeState = (key, val) => {
    this.setState({ [key]: val })
  };


    filterUsers() {
        if(!this.state.isActeAssistants) {
            globalHelperAPI.filterUsers(this.state)
                .then( (jsonData) => {
                        this.props.navigation.navigate(globalHelper.ListPerfilScreenID, {data:jsonData, acteID:this.state.acteID})
                    }
                )
        }
        else {
            globalHelperAPI_ACTES.filterUsersOfActe(this.state)
                .then( (jsonData) => {
                        this.props.navigation.navigate(globalHelper.ListPerfilScreenID, {data:jsonData, acteID:this.state.acteID})
                    }
                )
        }

    }

  render() {
      return (

          <View style={styles.container}>
              <View style={styles.headerBar}>
                  <Text style={styles.titleNavigator}> Filtrar persones </Text>
              </View>
             <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange} showVerticalScrollIndicator={false}>
                 <View style={styles.Filter}>
                     <View style={{flexDirection: 'row', marginBottom:20}}>
                         <Icon name={"md-people"} size={40} color={"purple"}/>
                         <Text style={styles.titleFilter}> {"Rang d'edats"}</Text>
                     </View>

                     <View style={styles.inputContainer}>
                         <Icon name={'md-arrow-dropdown-circle'} size={28} style={styles.Icon} />
                         <TextInput
                             style={styles.text}
                             placeholder='       Edat mínima'
                             keyboardType = 'number-pad'
                             onChangeText={val => this.onChangeState('edatMin', val)}
                         />
                     </View>

                     <View style={styles.inputContainer}>
                         <Icon name={'md-arrow-dropup-circle'} size={28} style={styles.Icon} />
                         <TextInput
                             style={styles.text}
                             placeholder='       Edat màxima'
                             keyboardType = 'number-pad'
                             onChangeText={val => this.onChangeState('edatMax', val)}
                         />
                     </View>


                     <View style={{flexDirection: 'row', marginTop:80}}>
                         <Icon name={"md-flame"} size={40} color={"#e84f30"}/>
                         <Text style={styles.titleFilter}> {"Habilitats"}</Text>
                     </View>

                     <View style={styles.columnCheckBoxHabilitats}>
                         <MyCheckBox title="Comptar i repartir"
                                     checkBoxKey="comptarIRepartir"
                                     onChangeState={this.onChangeState}>
                         </MyCheckBox>

                         <MyCheckBox title="Sardanista competició"
                                     checkBoxKey="sardaCompeticio"
                                     onChangeState={this.onChangeState}>
                         </MyCheckBox>

                     </View>

                     <View style={{flexDirection: 'row', marginTop:80}}>
                         <Icon name={"md-eye"} size={40} color={"green"}/>
                         <Text style={styles.titleFilter}> {"Actes"}</Text>
                     </View>
                     <View style={styles.rowCheckBox}>
                         <View style={styles.columnCheckBox}>
                             <MyCheckBox title="Aplecs"
                                         checkBoxKey="eventsAplecs"
                                         onChangeState={this.onChangeState}>
                             </MyCheckBox>

                             <MyCheckBox title="Concursos"
                                         checkBoxKey="eventsConcursos"
                                         onChangeState={this.onChangeState}>
                             </MyCheckBox>
                         </View>

                         <View style={styles.columnCheckBox}>
                             <MyCheckBox title="Ballades"
                                         checkBoxKey="eventsBallades"
                                         onChangeState={this.onChangeState}>
                             </MyCheckBox>

                             <MyCheckBox title="Cursets"
                                         checkBoxKey="eventsCursets"
                                         onChangeState={this.onChangeState}>
                             </MyCheckBox>
                         </View>

                         <View style={styles.columnCheckBox}>
                             <MyCheckBox title="Concerts"
                                         checkBoxKey="eventsConcerts"
                                         onChangeState={this.onChangeState}>
                             </MyCheckBox>

                             <MyCheckBox title="Altres"
                                         checkBoxKey="eventsAltres"
                                         onChangeState={this.onChangeState}>
                             </MyCheckBox>
                         </View>
                     </View>


                     <View style={{flexDirection: 'row', marginTop:80}}>
                         <Icon name={"md-car"} size={40} color={"blue"}/>
                         <Text style={styles.titleFilter}> {"Vehicle"}</Text>
                     </View>

                     <View style={styles.vehicleSwitchView}>
                         <Switch style={styles.vehicleSwitch} onValueChange={val => this.onChangeState('vehicle', val)} value = {this.state.vehicle}/>
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
                                           this.filterUsers()
                                       }}>
                         <Text style={styles.buttonText}>{"Filtrar"}</Text>
                     </TouchableOpacity>
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
  },
    headerBar:{
        width:'100%',
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
        marginTop: 35
    },

    rowCheckBox:{
        flexDirection: 'row',
    },
    columnCheckBox:{
        flexDirection: 'column',
    },
    columnCheckBoxHabilitats:{
        flexDirection: 'column',
        marginLeft:40,
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
    inputContainer: {
        borderColor:'#FF0000',
        borderRadius:30,
        borderBottomWidth: 2,
        width:"80%",
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center',
        marginTop:5,
    },
    Icon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height:45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:50,
        marginBottom: 20,
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
    },
    vehicleSwitchView:{
        flexDirection: 'row',
    },
    vehicleSwitch:{
        transform:[{scaleX:1.5}, {scaleY:1.5}],
        marginTop:8,
        marginLeft:8,
    }
});
