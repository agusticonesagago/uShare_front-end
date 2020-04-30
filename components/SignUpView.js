import React , {Component} from 'react';
import {StyleSheet, Text, TextInput, View, Image, 
  Button,
  TouchableHighlight,
  Alert, ScrollView} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

import Icon from 'react-native-vector-icons/Ionicons';

import DatePicker from 'react-native-datepicker'
import ImagePicker from 'react-native-image-picker'
import * as globalHelper from "./Auxiliars/GlobalHelper";


var API_USER = globalHelper.API_USER;



// TODO: Refactor codi de la API
// TODO: Quan s'hagi decidit el ordre de les pantalles i eso, implementar el canvi de pantalla
/*
<Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
        style={styles.images}
      />

    PER MOSTRA LA IMATGE:
      <Image source={{ uri: 'data:' + photo.type + ';base64,' + this.state.photo.data }}
        style={styles.images} //TODO: Demanar en backend un atribut pel tipus?
                              // TODO: O potser passa a base64 tot i recuperar-ho tot
                              // TODO: O potser afegir el tipus al enviar-ho(concatenat)
      />
 */
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
        photo: null,
        photoType: null,

        // Falta fer, els poso default
        coblaCompeticio: true, // todo
        comarca: "string", // todo
        competidor: true, // todo

        // Other info
        hasCar:      true, // Checkbox(yes or no)
        mobileNumber: null,
        comptarRepartir: false,
        experienciaBallades: false,

        // Preferences(Actes)
        aplecs:   true, // Checkbox(bool)
        concerts: true,
        ballades: true,
        concursos: true,
        cursets: true,
        altres: true,

        preferenciaEdat: null, // Edat similar?  Es confos, l'hauria d'escollir en el buscador
        preferenciaInteresActes: null, // Esta interessat en assistir als actes? --> Ja es veu en els actes que ha escollit
        preferenciaProximitat: null, // Bool? Es confos: l'hauria d'escollir en el buscador
        preferenciaQualitatActe: null, // La cobla la escollira en el buscador

      // More...
    }
  }

  /*
   * Crida la API i registra el usuari a partir del this.state
   */
   async registerUser() {
    try {
        var photoBase64 =  null;
        if(this.state.photo) photoBase64 = this.state.photo.data;

        var jsonBody = JSON.stringify({
            altres: this.state.altres,
            aplecs: this.state.aplecs,
            ballades: this.state.ballades,
            birthday: this.state.birthday,
            coblaCompeticio: true, // todo
            comarca: "string", // todo
            competidor: true, // todo
            comptarRepartir: this.state.comptarRepartir,
            concerts: this.state.concerts,
            concursos: this.state.concursos,
            cursets: this.state.cursets,
            description: this.state.description,
            email: this.state.email,
            image: photoBase64,
            imageType: this.state.imageType,
            name: this.state.nom,
            password: this.state.password,
            phoneNumber: this.state.mobileNumber,
            publicProfile: true, // per defecte
            surname: this.state.cognom,
            vehicle: this.state.hasCar
        });

        const response = await fetch(API_USER,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: jsonBody
      });

        var text = response.text()
        if(response.status === globalHelper.API_USER_CREATED_CODE) {
            console.log("TEXT ", text);
            console.log("Upload succes: ", response);
            //console.log("Sended JSON BODY: ", jsonBody);
            //alert("Upload success!");
            this.props.navigation.navigate(globalHelper.LogInScreenID);
        }
        else {
            alert("No s'ha pogut registra l'usuari!");
            console.log("TEXT ", text);
            console.log("Upload failed: ", response);
        }
    }
    catch (error) {
      console.error(error);
        alert("Upload failed!");
        console.log("Sended JSON BODY: ", jsonBody);
    }
  }


  async getUsers() {
    try {
      const response = await fetch(API_USER);
      console.log('\n');

      const json = await response.json();
      console.log(json);

      return json;
    }
    catch (error) {
      console.error(error);
    }
  }

    async getUser(email) {
        try {
            const response = await fetch(API_USER + email);
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

  handleChoosePhoto = () => {
    const options = {
      noData: false,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        console.log('\n\n\nStart-----------------------------------------------------')
        console.log(response.uri)
        console.log('\n')
        console.log(response)
        this.onChangeState('photo', response);
        this.onChangeState('photoType', response.type)

      }
    })
  }


  render() {
    return (


      <View style={styles.container}>
        <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange} showVerticalScrollIndicator={false}>
          <View style={styles.form} >
            <Text style={styles.titols}>DADES</Text>

            <View style={styles.imageSelector}>
              <Text style={styles.text}>Foto</Text>
              <View >
                {this.state.photo && (
                  <Image
                    source={ { uri: this.state.photo.uri }}
                    style={{ width: 300, height: 300 }}
                  />
                )}
                <Button title="Escull una foto de perfil" onPress={this.handleChoosePhoto} />
              </View>
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
                <Text style={styles.text}> En quins actes assisteixes?  </Text>


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
            <View style={styles.capacitatsPersonals}>
              <View style={styles.checkBox}>
                  <CheckBox
                      title='Click Here '
                      value={this.state.comptarRepartir}
                      onValueChange={val => this.onChangeState('comptarRepartir', val)}
                  />
                  <Text style={styles.text}> Saps comptar i repartir? </Text>
              </View>

              <View style={styles.checkBox}>
                  <CheckBox
                      title='Click Here '
                      value={this.state.experienciaBallades}
                      onValueChange={val => this.onChangeState('experienciaBallades', val)}
                  />
                  <Text style={styles.text}> Tens experiencia ballant? </Text>
              </View>
            </View>

            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => this.registerUser()}
                >

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
    capacitatsPersonals:{
          marginTop: 8,
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
        marginTop: 20,
      },
      titols:{
        fontSize:40,
          alignItems: 'center',

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
 




