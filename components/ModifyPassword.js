import React , {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image,TextInput , Alert, TouchableHighlight, Switch, Button} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';

import Autocomplete from 'react-native-dropdown-autocomplete-textinput';
import ImagePicker from 'react-native-image-picker'

import * as globalHelper from './Auxiliars/GlobalHelper.js'

var API_USER = globalHelper.API_USER;
const asyncStorageLoggedUserEmailKey = globalHelper.asyncStorageLoggedUserEmailKey;


export default class ModifyPassword extends React.Component {

  constructor(props) {
        super(props)
        this.state = {
          textMail:'',
          passwordPrimer: "",
          passwordSegon: "",
          passwordAntic: "",
        }
        this.handleTextSubmit = this.handleTextSubmit.bind(this);
  }


  handleTextSubmit() {
     Alert.alert(
     "Canvis fets",
     this.state.textSobreMi,
     [
         {
           text: "CANCELAR",
           onPress: () => console.log("Cancel Pressed"),
           style: "cancel"
         },
         { text: "ACORD", onPress: () => console.log("OK Pressed") }
       ],
       { cancelable: false }
    );
  }

  onChangeState = (key, val) => {
    this.setState({ [key]: val })
  }

  buttonPress() {
   console.log('TouchableHighlight pressed...');
 }

  async sendChanges() {
    try {
          var email = this.props.route.params.email;
          var pasnew = this.state.passwordPrimer;
          var pasantic = this.state.passwordAntic;

          if(this.state.passwordPrimer !== this.state.passwordSegon){
            Alert.alert("Vigila!", "Les contrasenyes introduïdes no coincideixen");
          }
          else{
              var ModifyProfilelUri = API_USER + email + '/updatePassword?newPassword=' + pasnew +  '&oldPassword=' + pasantic;
              const response = await fetch(ModifyProfilelUri,
              {
                  method: 'PUT',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: null,
              });

              console.log(this.state.passwordAntic);
              console.log(this.state.passwordPrimer);
              console.log(this.state.passwordSegon);

              console.log(response.status);
              var text = response.text()
              console.log("TEXT ", text);


              if(response.status === globalHelper.API_SUCESSFUL_LOGIN_CODE) {
                  alert("Modify success!");
              }
              else {
                  alert("Contrasenya actual no coincideix");
                  console.log('\n');
                  console.log("Status: ", response.status);
              }
            }
    }
    catch (error) {
      console.error(error);
        alert("Changes failed!");
        console.log("Sended JSON BODY: ", jsonBody);
    }
  }

  render() {
    return (
      <View style={styles.containerActeProva}>
        <View style={styles.containerFlecha}>
          <View style={styles.container}>

          <Text style={styles.titleApartats}>CANVIAR CONTRASENYA</Text>
          <View style={styles.imagePassword}>
            <Icon name={'md-lock'} size={40} color={'blue'}  />
            <TextInput  secureTextEntry={true} placeholder="Introdueix la contrasenya actual" style={styles.numberPassword}
            onChangeText={(passwordAntic) => this.setState({passwordAntic})}>{this.state.passwordAntic}
            </TextInput>
          </View>
          <View style={styles.imagePassword}>
            <Icon name={'md-lock'} size={40} color={'purple'}  />
            <TextInput  secureTextEntry={true} placeholder="Introdueix la nova contrasenya" style={styles.numberPassword}
            onChangeText={(passwordPrimer) => this.setState({passwordPrimer})}>{this.state.passwordPrimer}</TextInput>
          </View>
          <View style={styles.imagePassword}>
            <Icon name={'md-lock'} size={40} color={'purple'}  />
            <TextInput secureTextEntry={true} placeholder="Nova contrasenya (verificació)" style={styles.numberPassword}
            onChangeText={(passwordSegon) => this.setState({passwordSegon})}>{this.state.passwordSegon}</TextInput>
          </View>
          <TouchableHighlight style={[styles.passwordButtonContainer, styles.modifyButton]}
                              onPress={() => this.sendChanges()}>
            <Text style={styles.modifyText}>GUARDAR CANVIS</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>

    );
  }
}

ModifyPassword.navigationOptions = {
  tabBarIcon: ({tintColor,focused}) => (
    <Icon
      name={'md-calendar'}
      size={28}
      color={tintColor}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePassword:{
    marginTop:10,
    flexDirection:'row',
    justifyContent: 'flex-start',
    width:'70%',
  },
  numberPassword:{
    marginTop:0,
    marginLeft:30,
    fontSize:15,
  },
  titleApartats:{
    fontWeight:'bold',
    fontSize:24,
    marginTop:20,
    marginBottom:25,
  },
  passwordButtonContainer: {
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    borderRadius:30,
    width:'80%',
    marginLeft:'10%',
    marginRight:'10%',
  },
  modifyButton: {
    backgroundColor: "#714170",
  },
  modifyText: {
    color: 'white',
  },
  containerFlecha: {
    width:'100%',
    backgroundColor: "beige",
    minHeight:552,
  },
  containerActeProva:{
    flex: 1,
    backgroundColor: '#714170',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:'14%',
  },
});
