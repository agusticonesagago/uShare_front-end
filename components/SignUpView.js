import React , {Component} from 'react';
import {StyleSheet, Text, TextInput, View, Image,
  Button,
  TouchableHighlight,
  Alert, ScrollView, ImageBackground, Divider } from 'react-native';

import CheckBox from '@react-native-community/checkbox';

import Icon from 'react-native-vector-icons/Ionicons';

import Autocomplete from 'react-native-dropdown-autocomplete-textinput';
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


 const DataComarques = [
   {code: 'Alt Camp', name: 'Alt Camp'},
   {code: 'Alt Empordà', name: 'Alt Empordà'},
   {code: 'Alt Penedès', name: 'Alt Penedès'},
   {code: 'Alt Urgell', name: 'Alt Urgell'},
   {code: 'Alta Cerdanya', name: 'Alta Cerdanya'},
   {code: 'Alta Ribagorça', name: 'Alta Ribagorça'},
   {code: 'Andorra', name: 'Andorra'},
   {code: 'Anoia', name: 'Anoia'},
   {code: 'Bages', name: 'Bages'},
   {code: 'Baix Camp', name: 'Baix Camp'},
   {code: 'Baix Ebre', name: 'Baix Ebre'},
   {code: 'Baix Empordà', name: 'Baix Empordà'},
   {code: 'Baix Llobregat', name: 'Baix Llobregat'},
   {code: 'Baix Penedès', name: 'Baix Penedès'},
   {code: 'Baixa Cerdanya', name: 'Baixa Cerdanya'},
   {code: 'Barcelonès', name: 'Barcelonès'},
   {code: 'Berguedà', name: 'Berguedà'},
   {code: 'Capcir', name: 'Capcir'},
   {code: 'Conca de Barberà', name: 'Conca de Barberà'},
   {code: 'Conflent', name: 'Conflent'},
   {code: 'Fenolleda', name: 'Fenolleda'},
   {code: 'Garraf', name: 'Garraf'},
   {code: 'Garrigues', name: 'Garrigues'},
   {code: 'Garrotxa', name: 'Garrotxa'},
   {code: 'Gironès', name: 'Gironès'},
   {code: 'Illes Balears', name: 'Illes Balears'},
   {code: 'Maresme', name: 'Maresme'},
   {code: 'Montsià', name: 'Montsià'},
   {code: 'Noguera', name: 'Noguera'},
   {code: 'Osona', name: 'Osona'},
   {code: 'País Valencià', name: 'País Valencià'},
   {code: 'Pallars Jussà', name: 'Pallars Jussà'},
   {code: 'Pallars Sobirà', name: 'Pallars Sobirà'},
   {code: 'Pla Estany', name: 'Pla Estany'},
   {code: 'Pla Urgell', name: 'Pla Urgell'},
   {code: 'Priorat', name: 'Priorat'},
   {code: 'Resta Estat Espanyol', name: 'Resta Estat Espanyol'},
   {code: 'Resta Estat Francès', name: 'Resta Estat Francès'},
   {code: 'Resta Món', name: 'Resta Món'},
   {code: 'Ribera Ebre', name: 'Ribera Ebre'},
   {code: 'Ripollès', name: 'Ripollès'},
   {code: 'Roselló', name: 'Roselló'},
   {code: 'Segarra', name: 'Segarra'},
   {code: 'Segrià', name: 'Segrià'},
   {code: 'Selva', name: 'Selva'},
   {code: 'Solsonès', name: 'Solsonès'},
   {code: 'Tarragonès', name: 'Tarragonès'},
   {code: 'Terra Alta', name: 'Terra Alta'},
   {code: 'Urgell', name: 'Urgell'},
   {code: 'Val Aran', name: 'Val Aran'},
   {code: 'Vallès Occidental', name: 'Vallès Occidental'},
   {code: 'Vallès Oriental', name: 'Vallès Oriental'},
   {code: 'Vallespir', name: 'Vallespir'},
 ];

export default class SignUp extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
        // Usuari
        email:    null,
        password: null,
        confirmarPassword: null,

        // Personal Info
        nom:      null,
        cognom:   null,
        birthday: "",
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

        DataActualdos:  {
          code: '', name:  ''
        },
      // More...
    }
  }

  changeComarca = (inputName, inputValue) => {
     console.log(inputName);
     console.log(inputValue);
     this.setState(state => ({
      ...state,
      DataActualdos: {
        name: inputValue.name,
        code: inputValue.code,
      }
    }))
  }

  onChangeState = (key, val) => {
    this.setState({ [key]: val })
  }

  /*
   * Crida la API i registra el usuari a partir del this.state
   */
   async registerUser() {
    try {
        if(this.state.password !== this.state.confirmarPassword){
          Alert.alert("Vigila!", "Les contrasenyes introduïdes no coincideixen");
        }
        else{
          var photoBase64 =  null;
          if(this.state.photo) photoBase64 = this.state.photo.data;

          var jsonBody = JSON.stringify({
              altres: this.state.altres,
              aplecs: this.state.aplecs,
              ballades: this.state.ballades,
              birthday: this.state.birthday,
              coblaCompeticio: true, // todo
              comarca: "Comarca", // todo
              competidor: this.state.competidor, // todo
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
              vehicle: this.state.hasCar,
              comarca: this.state.DataActualdos.name,
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
              alert("No s'ha pogut registrar l'usuari!");
              console.log("TEXT ", text);
              console.log("Upload failed: ", response);
          }
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
            <Image source={require("../img/logorodo.png")} style={styles.imageLogo}></Image>
            <View style={styles.containerHeader}>
              <View style={styles.lineLeft} />
              <Text style={styles.titols}>Registrat</Text>
              <View style={styles.lineRight} />
            </View>
            <View style={styles.imageSelector}>
              <Icon name={'md-camera'} size={55} color={'#5564eb'} onPress={this.handleChoosePhoto} />
              <View>
                {this.state.photo && (
                  <Image
                    source={ { uri: this.state.photo.uri }}
                    style={{ width: 300, height: 300 }}
                  />
                )}
                <Button style={styles.button} title="Escull una foto de perfil" color="#4040ff" onPress={this.handleChoosePhoto} />
              </View>
            </View>



            <View style={styles.inputContainerPrimer}>
              <Icon name={'md-person'} size={28} style={styles.Icon} />
              <TextInput
                style={styles.inputs}
                placeholder='Nom i Cognom'
                autoCapitalize="none"
                onChangeText={val => this.onChangeText('nom', val)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name={'md-mail'} size={28} style={styles.Icon} />
              <TextInput
                style={styles.inputs}
                placeholder='Email'
                keyboardType="email-address"
                onChangeText={val => this.onChangeText('email', val)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name={'md-key'} size={28} style={styles.Icon} />
              <TextInput
                style={styles.inputs}
                placeholder='Contrasenya'
                autoCapitalize="none"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={val => this.onChangeText('password', val)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name={'md-lock'} size={28} style={styles.Icon} />
              <TextInput
                style={styles.inputs}
                placeholder='Confirmar Contrasenya'
                autoCapitalize="none"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={val => this.onChangeText('confirmarPassword', val)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name={'md-calendar'} size={28} style={styles.Icon} />
              <View style={styles.selectBirthday}>
                <DatePicker
                  style={{
                    width: 200,
                    //backgroundColor: '#ffffff',
                    //marginBottom: 15,
                    //marginLeft:5,
                    borderRadius: 14,
                    border:0,
                    //height:50,
                  }}
                  showIcon={false}
                  date={this.state.birthday}
                  mode="date"
                  placeholder="Data de naixement"
                  //format="YYYY-MM-DD"
                  format="DD-MM-YYYY"
                  //minDate="1900-01-01"
                  //maxDate="2020-01-01"
                  minDate="01-01-1900"
                  maxDate="01-01-2020"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    /*dateIcon: {
                      //position: 'absolute',
                      //left: 0,
                      //top: 8,
                      //marginLeft: 5,
                      border:0,
                    },*/
                    dateInput: {
                      //textAlign:'left',
                      borderWidth: 0,
                      fontSize: 15,
                      //marginRight: 4.5,
                      //top:-5,
                    },
                    dateText: {
                      fontSize: 15,
                      marginRight: 88,
                      top:-5,
                    },
                    placeholderText:{
                      color: 'grey',
                      fontSize: 15,
                      marginRight: 30,
                      top:-5,
                    },
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(birthday) => {this.setState({birthday: birthday})}}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Icon name={'md-call'} size={28} style={styles.Icon} />
              <TextInput
                style={styles.inputs}
                placeholder='Telèfon mòbil'
                autoCapitalize="none"
                onChangeText={val => this.onChangeText('mobileNumber', val)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name={'md-information-circle'} size={28} style={styles.Icon} />
              <TextInput
                style={styles.inputs}
                placeholder='Descripció'
                autoCapitalize="none"
                onChangeText={val => this.onChangeText('description', val)}
                multiline={true} // More than one line
              />
            </View>

            {/*<View style={styles.imageLocalitat}>
              <View style={styles.dropdownLocalitat}>
                <Autocomplete
                  data={DataComarques}
                  displayKey="name"
                  placeholderColor={'black'}
                  dropDownIconColor	={'#714170'}
                  value = {this.state.DataActualdos}
                  textInputStyle={styles.text}
                  onSelect={value => this.changeComarca('value', value)}
                />
              </View>
            </View>*/}

            <View style={styles.containerPreguntes}>
              <Text style={styles.textTitle}>Habilitats</Text>
              <View style={styles.checkBox}>
                <Text style={styles.textCheckbox}>Tens cotxe?</Text>
                <CheckBox
                  title='Click Here '
                  value={this.state.hasCar}
                  onValueChange={val => this.onChangeState('hasCar', val)}
                  style={styles.checkboxCaja}
                  tintColors={{ true: 'blue' }}
                />
              </View>
              <View style={styles.checkBox}>
                <Text style={styles.textCheckbox}>Saps comptar i repartir?</Text>
                <CheckBox
                  title='Click Here '
                  value={this.state.comptarRepartir}
                  onValueChange={val => this.onChangeState('comptarRepartir', val)}
                  style={styles.checkboxCaja}
                  tintColors={{ true: 'blue' }}
                />
              </View>
              <View style={styles.checkBox}>
                <Text style={styles.textCheckbox}>Sardanista Competició</Text>
                <CheckBox
                  title='Click Here '
                  value={this.state.competidor}
                  onValueChange={val => this.onChangeState('competidor', val)}
                  style={styles.checkboxCaja}
                  tintColors={{ true: 'blue' }}
                />
              </View>


              <Text style={styles.textTitleActes}>En quins actes assisteixes?</Text>
              <View style={styles.checkBox}>
                <Text style={styles.textCheckbox}>Aplecs</Text>
                <CheckBox
                  title='Click Here '
                  value={this.state.aplecs}
                  onValueChange={val => this.onChangeState('aplecs', val)}
                  style={styles.checkboxCaja}
                  tintColors={{ true: 'blue' }}
                />
              </View>
              <View style={styles.checkBox}>
                <Text style={styles.textCheckbox}>Ballades</Text>
                <CheckBox
                  title='Click Here '
                  value={this.state.ballades}
                  onValueChange={val => this.onChangeState('ballades', val)}
                  style={styles.checkboxCaja}
                  tintColors={{ true: 'blue' }}
                />
              </View>
              <View style={styles.checkBox}>
                <Text style={styles.textCheckbox}>Concerts</Text>
                <CheckBox
                  title='Click Here '
                  value={this.state.concerts}
                  onValueChange={val => this.onChangeState('concerts', val)}
                  style={styles.checkboxCaja}
                  tintColors={{ true: 'blue' }}
                />
              </View>
              <View style={styles.checkBox}>
                <Text style={styles.textCheckbox}>Concursos</Text>
                <CheckBox
                  title='Click Here '
                  value={this.state.concursos}
                  onValueChange={val => this.onChangeState('concursos', val)}
                  style={styles.checkboxCaja}
                  tintColors={{ true: 'blue' }}
                />
              </View>
              <View style={styles.checkBox}>
                <Text style={styles.textCheckbox}>Cursets</Text>
                <CheckBox
                  title='Click Here '
                  value={this.state.cursets}
                  onValueChange={val => this.onChangeState('cursets', val)}
                  style={styles.checkboxCaja}
                  tintColors={{ true: 'blue' }}
                />
              </View>
              <View style={styles.checkBox}>
                <Text style={styles.textCheckbox}>Altres</Text>
                <CheckBox
                  title='Click Here '
                  value={this.state.altres}
                  onValueChange={val => this.onChangeState('altres', val)}
                  style={styles.checkboxCaja}
                  tintColors={{ true: 'blue' }}
                />
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
    width:'100%',
  },
  scrollView:{
    width:'100%',
  },
  form:{
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    marginTop:60,
  },
  checkBox:{
      flexDirection: 'row',
      marginLeft:0,
      marginBottom:5,
  },
  capacitatsPersonals:{
        marginTop: 8,
  },
  imageSelector:{
    width:undefined,
    height:undefined,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 10,
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
    marginTop:10,
  },
  inputDescription: {
    width: 300,
    height: 70,
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 8,
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
    marginBottom:40,
  },
  actes:{
    marginTop: 20,
  },
  titols:{
    fontSize:30,
    alignItems: 'center',
    color:'black',
  },
  text:{
    fontSize:25,

  },
  textCheckbox:{
    fontSize:20,
    textAlign:'left',
    color:'black',
  },
  textLocalitat:{
    fontSize:18,
    color:'black',
    textAlign:'left',
    marginLeft:-210,
    marginTop:15,
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
    //backgroundColor: "#4040ff",
  },
  loginText: {
    color: 'white',
    fontSize: 20,
  },
  imageLogo:{
    borderRadius:100,
    overflow: 'hidden',
    position: 'relative',
    height:90,
    width:90,
    marginTop:10,
    marginBottom:10,
    marginLeft:20,
    marginRight:20,
  },
  containerHeader:{
    flexDirection: 'row',
  },
  lineLeft:{
    backgroundColor: 'black',
    height: 2,
    flex: 1,
    alignSelf: 'center',
    marginLeft:50,
    marginRight:10,
    width:'5%',
  },
  lineRight:{
    backgroundColor: 'black',
    height: 2,
    flex: 1,
    alignSelf: 'center',
    marginLeft:10,
    marginRight:50,
    width:'5%',
  },
  selectBirthday:{
    marginTop:10,
  },
  dropdownLocalitat: {
    width: 300,
    height: 'auto',
    flexDirection:'row',
    borderRadius:14,
  },
  containerIconLocalitat: {
    marginTop:28,
    marginRight:20,
  },

  imageLocalitatSota:{
    backgroundColor:'black',
    width: 300,
    height: 30,
  },
  textTitle:{
    fontSize:24,
    color:'black',
    fontWeight: "bold",
    marginBottom:20,
  },
  textTitleActes:{
    fontSize:24,
    color:'black',
    fontWeight: "bold",
    marginTop:10,
    marginBottom:20,
  },
  containerPreguntes:{
    textAlign:'center',
    flexDirection: 'column',
    width:'70%',
    paddingLeft:24,
    marginTop:10,
  },
  checkboxCaja:{
    top:0,
    marginLeft:5,
  },
  inputContainerPrimer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center',
      marginTop:20,
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center',
      marginTop:5,
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  Icon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
});
