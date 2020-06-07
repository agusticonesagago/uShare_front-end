import React , {Component} from 'react';
import {
    StyleSheet, Text, TextInput, View, Image,
    Button,
    TouchableHighlight,
    Alert, ScrollView, ImageBackground, Divider, SafeAreaView
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

import Icon from 'react-native-vector-icons/Ionicons';

import Autocomplete from 'react-native-dropdown-autocomplete-textinput';
import DatePicker from 'react-native-datepicker'
import ImagePicker from 'react-native-image-picker'
import * as globalHelper from "../Auxiliars/GlobalHelper";
import MyCheckBox from "../CheckBox/MyCheckBox";
import MyAutoComplete from "../MyAutoComplete/MyAutoComplete";
import * as globalHelperData from "../Auxiliars/GlobalHelperData";
import MyDatePicker from "../DatePicker/MyDatePicker";


var API_USER = globalHelper.API_USER;

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

        altresHabilitats: null,

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

    }
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
              altresHabilitats: this.state.altresHabilitats,
              aplecs: this.state.aplecs,
              ballades: this.state.ballades,
              birthday: this.state.birthday,
              comarca: this.state.comarca,

              competidor: this.state.competidor,
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
              surname: this.state.cognom, // todo what?
              vehicle: this.state.hasCar,
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
       console.log(this.state)
    return (
      <View style={styles.container}>

        <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange} showVerticalScrollIndicator={false}>
          <View style={styles.form} >
            <Image source={require("../../img/uShare-logo.png")} style={styles.imageLogo}></Image>
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
                    borderRadius: 14,
                    border:0,
                  }}
                  showIcon={false}
                  date={this.state.birthday}
                  mode="date"
                  placeholder="Data de naixement"
                  format="YYYY-MM-DD"
                  minDate="1900-01-01"
                  maxDate="2020-01-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                      fontSize: 15,
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

                <Text style={styles.textTitle}>Altres habilitats</Text>

                <View style={styles.inputContainerAltresHabilitats}>
                <TextInput
                    style={styles.inputsHabilitats}
                    placeholder=''
                    autoCapitalize="none"
                    onChangeText={val => this.onChangeText('altresHabilitats', val)}
                    multiline={true} // More than one line
                />
            </View>


              <Text style={styles.textTitleActes}>En quins actes assisteixes?</Text>

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
    rowCheckBox:{
        flexDirection: 'row',
    },
    columnCheckBox:{
        flexDirection: 'column',
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
    width:'100%',
    marginTop:10,
      alignItems:'center',

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
    inputContainerAltresHabilitats: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:10,
        borderBottomWidth: 1,
        width:'80%',
        height:150,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center',
        marginTop:5,
    },
    inputsHabilitats:{
        height:100,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
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
