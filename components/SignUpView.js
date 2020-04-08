
import React , {Component} from 'react';
import {StyleSheet, Text, TextInput, View, Image, 
  Button,
  TouchableHighlight,
  Alert, ScrollView} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

import Icon from 'react-native-vector-icons/Ionicons';

import DatePicker from 'react-native-datepicker'

var movie = 'https://reactnative.dev/movies.json'; // Per veure si va: SI 

var myPC = 'http://192.168.1.12:8080/api'; //NO posar localhost, posar la IP del PC
var sardapp='https://sardapp.herokuapp.com/api'; // Per veure si va: SI

var endpoint = sardapp;
// TODO: Refactor codi de la API
// TODO: Quan s'hagi decidit el ordre de les pantalles i eso, implementar el canvi de pantalla
// TODO: Imatge
// TODO: Preferencies --> Posarles en el registre, o demanar-les al fer login? Registre sembla millor
export default class SignUp extends React.Component {

   
  constructor(props) {
    super(props);
    this.state = {
      // Usuari
      email:    null,
      password: null,

      // Personal Info
      nom:      null,
      cognom:   null,
      birthday: "2016-05-16",
      description: null,
      photo: null, // correct type?

      // Other info
      hasCar:      true, // Checkbox(yes or no)
      mobileNumber: null, 

      // Preferences(Actes)
      aplecs:   true, // Checkbox(bool)
      concerts: true, // Checkbox(bool)
      ballades: true,
      concursos: true,
      cursets: true,
      altres: true,



      // More...
    }
  }

  /*
   * Crida la API i registra el usuari a partir del this.state
   */
   async registerUser() {
    try {
      const response = await fetch(endpoint+'/users', 
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            altres: this.state.altres,
            aplecs: this.state.aplecs,
            ballades: this.state.ballades,
            birthday: this.state.birthday,
            comptarRepartir: true, // Default per ara
            concerts: this.state.concerts,
            concursos: this.state.concursos,
            cursets: this.state.cursets,
            description: this.state.description,
            edat: true, // Default per ara
            email: this.state.email,
            experienciaBallades: true, // Default per ara
            interesActes: true, // Default per ara
            name: this.state.nom,
            password: this.state.password,
            proximitat: true, // Default per ara
            qualitatActe: true, // Default per ara
            surname: this.state.cognom,
            vehicle: this.state.hasCar
        }),
      });
      const json = await response.json();
      console.log('\n');
      console.log('\n');
      console.log(json)
      return json;
    }
    catch (error) {
      console.error(error);
    }
  }

  
  async getUsers() {
    try {
      const response = await fetch(endpoint+'/users');
      console.log('\n');

      const json = await response.json();
      console.log(json);

      return json;
    }
    catch (error) {
      console.error(error);
    }
  }

  

  onChangeState = (key, val) => {
    this.setState({ [key]: val })
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }


  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange} showVerticalScrollIndicator={false}>
          <View style={styles.form} >
            <Text style={styles.titols}>DADES</Text>

            <View style={styles.imageSelector}>
              <Text >[Image Selector Section]</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder='Nom'
              autoCapitalize="none"
              onChangeText={val => this.onChangeText('nom', val)}
            />
            <TextInput
              style={styles.input}
              placeholder='Cognom'
              autoCapitalize="none"
              onChangeText={val => this.onChangeText('cognom', val)}
            />
            
            <View style={styles.selectBirthday}>
              <Text style={styles.text}> Data de naixement </Text>
              <DatePicker
                style={{
                  width: 200, 
                  backgroundColor: '#FFDFDF',
                  marginBottom: 15,
                  marginLeft:5
                }}
                date={this.state.birthday}
                mode="date"
                placeholder="Select date"
                format="YYYY-MM-DD"
                minDate="1900-01-01"
                maxDate="2020-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"

                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(birthday) => {this.setState({birthday: birthday})}}
              />
            </View>

            <View style={styles.checkBox}>
              <Text style={styles.text}> Tens cotxe? </Text>    
              <CheckBox
                title='Click Here '
                value={this.state.hasCar}
                onValueChange={val => this.onChangeState('hasCar', val)}
              />
            </View> 

            <TextInput
              style={styles.input}
              placeholder='Telefon mòvil'
              autoCapitalize="none"
              onChangeText={val => this.onChangeText('mobileNumber', val)}
            />

            <TextInput
              style={styles.input}
              placeholder='Descripció'
              autoCapitalize="none"
              onChangeText={val => this.onChangeText('description', val)}
              multiline={true} // More than one line
            />

            <TextInput
              style={styles.input}
              placeholder='Email'
              autoCapitalize="none"
              onChangeText={val => this.onChangeText('email', val)}
            />

            <TextInput
              style={styles.input}
              placeholder='Contrasenya'
              autoCapitalize="none"
              secureTextEntry={true}
              underlineColorAndroid='transparent'

              onChangeText={val => this.onChangeText('password', val)}
            />

            <View style={styles.actes}>
              <Text style={styles.titols}>ACTES</Text>

              <View style={styles.checkBox}>
                <CheckBox
                  title='Click Here '
                  value={this.state.aplecs}
                  onValueChange={val => this.onChangeState('aplecs', val)}
                />
                <Text style={styles.text}> Aplecs </Text>    
              </View> 

              <View style={styles.checkBox}>
                <CheckBox
                  title='Click Here '
                  value={this.state.ballades}
                  onValueChange={val => this.onChangeState('ballades', val)}
                />
                <Text style={styles.text}> Ballades </Text>    

              </View> 

              <View style={styles.checkBox}>
                <CheckBox
                  title='Click Here '
                  value={this.state.concerts}
                  onValueChange={val => this.onChangeState('concerts', val)}
                />
                <Text style={styles.text}> Concerts </Text>    
              </View> 

              <View style={styles.checkBox}>
                <CheckBox
                  title='Click Here '
                  value={this.state.concursos}
                  onValueChange={val => this.onChangeState('concursos', val)}
                />
                <Text style={styles.text}> Concursos </Text>    
              </View> 



              <View style={styles.checkBox}>
                <CheckBox
                  title='Click Here '
                  value={this.state.cursets}
                  onValueChange={val => this.onChangeState('cursets', val)}
                />
                <Text style={styles.text}> Cursets </Text>    
              </View> 

              <View style={styles.checkBox}>
                <CheckBox
                  title='Click Here '
                  value={this.state.altres}
                  onValueChange={val => this.onChangeState('altres', val)}
                />
                <Text style={styles.text}> Altres </Text>    
              </View> 

            </View>


            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} 
              onPress={() => this.registerUser()}>

              <Text style={styles.loginText}>Uneix-te!</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
}

SignUp.navigationOptions = {
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

  

  logo:{
    height:180,
    width:180,
    borderRadius:100,
    overflow: 'hidden',
    margin: 30
  },


  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  scrollView:{
    width:'100%',
  },

  form:{
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',
},

checkBox:{
  flexDirection: 'row',
},
    imageSelector:{
      width:undefined,
      height:undefined,
      alignItems: 'center',
    },
      input: {
        width: 300,
        height: 55,
        backgroundColor: '#ffffff',
        margin: 10,
        padding: 8,
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
      },

      actes:{
        marginTop: 20
      },
      titols:{
        fontSize:40,
      },
      text:{
        fontSize:25,
      },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      marginTop: 30,
      width:250,
      borderRadius:30,
    },
      loginButton: {
        backgroundColor: "#00b5ec",
        //width: 300,
      },
        loginText: {
          color: 'white',
          fontSize: 20,
        }

    
});
 




