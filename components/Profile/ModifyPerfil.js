import React , {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image,TextInput , Alert, TouchableHighlight, Switch, Button} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';

import Autocomplete from 'react-native-dropdown-autocomplete-textinput';
import ImagePicker from 'react-native-image-picker'

import * as globalHelper from '../Auxiliars/GlobalHelper.js'

var API_USER = globalHelper.API_USER;
const asyncStorageLoggedUserEmailKey = globalHelper.asyncStorageLoggedUserEmailKey;


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

export default class ModifyPerfil extends React.Component {
  componentDidMount() {
   this.getInfoUser();
  }

  constructor(props) {
        super(props)
        this.state = {
          textSobreMi: '',
          textName:'',
          localitat:'',
          textNumber:'',
          textMail:'',
          textVehicle: '',
          aplecs:   true,
          concerts: true,
          ballades: true,
          concursos: true,
          edat: true,
          cursets: true,
          altres: true,
          birthday: "",
          photo: null,
          photoType: null,
          sardanistaCompeticio: true,
          publicProfile: true,
          altresHabilitats:'',
          DataActualdos:  {
            code: '', name:  ''
          },
          comptarRepartir: false
        }
        this.handleTextSubmit = this.handleTextSubmit.bind(this);
  }

  async getInfoUser() {
      try {
          this.state.textMail = await globalHelper.getLoggedUserEmailAsync();
          const response = await fetch(API_USER + this.state.textMail);

          const json = await response.json();

          this.onChangeState("textSobreMi", json.description);
          this.onChangeState("textNumber", json.phoneNumber);
          this.onChangeState("textName", json.name);
          this.onChangeState("textNumber", json.phoneNumber);
          this.onChangeState("photo", json.image);
          var dia = json.birthday.slice(8, 10);
          var mes = json.birthday.slice(5, 7);
          var any = json.birthday.slice(0, 4);
          this.onChangeState("birthday", dia+'/'+mes+'/'+any);
          this.onChangeState("aplecs", json.aplecs);
          this.onChangeState("ballades", json.ballades);
          this.onChangeState("concerts", json.concerts);
          this.onChangeState("concursos", json.concursos);
          this.onChangeState("cursets", json.cursets);
          this.onChangeState("altres", json.altres);
          this.onChangeState("edat", json.edat);
          this.onChangeState("vehicle", json.vehicle);
          this.onChangeState("localitat", json.comarca);
          this.onChangeState("publicProfile", json.publicProfile);
          this.onChangeState("comptarRepartir", json.comptarRepartir);
          this.onChangeState("sardanistaCompeticio", json.competidor);
          this.onChangeState("altresHabilitats", json.altresHabilitats);

          this.setState({
            DataActualdos: {
              name: this.state.localitat,
              code: this.state.localitat,
            }
          });

      }
      catch (error) {
          console.error(error);
      }
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

  async sendChanges() {
    try {
        console.log("comptarRepartir");
        console.log(this.state.comptarRepartir);
        var photoBase64 =  null;
        console.log(this.state.aplecs);
        if(this.state.photo) photoBase64 = this.state.photo.data;
        var ModifyProfilelUri = API_USER + this.state.textMail ;
        var dia = this.state.birthday.slice(0, 2);
        var mes = this.state.birthday.slice(3, 5);
        var any = this.state.birthday.slice(6, 10);
        var birth = any+'-'+mes+'-'+dia+'T00:06:00.000+0000';
        var jsonBody = JSON.stringify({
            altres: this.state.altres,
            aplecs: this.state.aplecs,
            ballades: this.state.ballades,
            birthday: birth,
            comarca: this.state.DataActualdos.name,
            comptarRepartir: this.state.comptarRepartir,
            concerts: this.state.concerts,
            concursos: this.state.concursos,
            cursets: this.state.cursets,
            description: this.state.textSobreMi,
            publicProfile: this.state.publicProfile,
            name: this.state.textName,
            phoneNumber: this.state.textNumber,
            vehicle: this.state.hasCar,
            image: photoBase64,
            imageType: this.state.imageType,
            competidor: this.state.sardanistaCompeticio,
            altresHabilitats : this.state.altresHabilitats

        });

        const response = await fetch(ModifyProfilelUri,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: jsonBody
        });

        var text = response.text()
        console.log("TEXT ", text);

        console.log("Changes succes", response);
        console.log("Sended JSON BODY: ", jsonBody);

        alert("Changes success!");

    }
    catch (error) {
      console.error(error);
        alert("Changes failed!");
        console.log("Sended JSON BODY: ", jsonBody);
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
    let a = '';
    return (
      <View style={styles.containerActeProva}>
        <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange} showVerticalScrollIndicator={false}>
          <View style={styles.containerActe}>
            <View style={styles.containerProfile}>
              <View style={styles.profileImage}>

                {this.state.photo && (
                  <Image source={{uri: `data:image/gif;base64,${this.state.photo}`}} style={styles.image} rezideMode="center"></Image>
                )}
                {!this.state.photo && (<Image source={require("../../img/interface.png")} style={styles.image} rezideMode="center"></Image>)}
              </View>
              <View style={styles.button}>
                <Icon name={'md-chatboxes'} size={20} backgroundColor={'#41444B'} color={'#DFD8C8'}  />
              </View>
              <View style={styles.add}>
                <Icon name={'md-camera'} size={35} backgroundColor={'#41444B'} color={'#DFD8C8'} onPress={this.handleChoosePhoto}/>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <TextInput style={styles.name} onChangeText={(textName) => this.setState({textName})} editable>{this.state.textName}</TextInput>
            </View>
            <View style={styles.extraInfo}>
              <Text style={styles.titleApartats}>SOBRE MI</Text>
              <TextInput style={styles.information} multiline
              onSubmitEditing={this.handleTextSubmit} onChangeText={(textSobreMi) => this.setState({textSobreMi})}
              editable>{this.state.textSobreMi}</TextInput>
              <Text style={styles.titleApartats}>LOCALITAT</Text>
              <View style={styles.imageLocalitat}>
                <View style={styles.containerIconLocalitat}>
                  <Icon name={'md-home'} size={30} color={'#0000FF'}  />
                </View>
                <View style={styles.dropdownLocalitat}>
                  <Autocomplete
                    data={DataComarques}
                    displayKey="name"
                    placeholderColor={'black'}
                    dropDownIconColor	={'#714170'}
                    value = {this.state.DataActualdos}
                    onSelect={value => this.changeComarca('value', value)}
                  />
                </View>
              </View>
              <Text style={styles.titleApartats}>NAIXEMENT</Text>
              <View style={styles.imageMail}>
                <Icon name={'md-gift'} size={30} color={'red'}  />
                <TextInput style={styles.numberTelephone} onChangeText={(birthday) => this.setState({birthday})} editable>{this.state.birthday}</TextInput>
              </View>
              <Text style={styles.titleApartats}>CONTACTE</Text>
              <View style={styles.imageTelephone}>
                <Icon name={'md-call'} size={30} color={'green'}  />
                <TextInput style={styles.numberTelephone} onChangeText={(textNumber) => this.setState({textNumber})} editable>{this.state.textNumber}</TextInput>
              </View>
              <View style={styles.imageMail}>
                <Icon name={'md-mail'} size={30} color={'orange'}  />
                <TextInput style={styles.textMail} onChangeText={(textMail) => this.setState({textMail})} editable>{this.state.textMail}</TextInput>
              </View>
              <Text style={styles.titleApartats}>VEHICLE</Text>
              <View style={styles.checkBox}>
                <CheckBox
                  title='Click Here'
                  value={this.state.vehicle}
                  onValueChange={val => this.onChangeState('vehicle', val)}
                />
                <Text style={styles.informationCheckBox}>Vehicle</Text>
              </View>
              <Text style={styles.titleApartats}>També sé ...</Text>
              <TextInput style={styles.information} onChangeText={(altresHabilitats) => this.setState({altresHabilitats})} editable>{this.state.altresHabilitats}</TextInput>
              <Text style={styles.titleApartats}>INTERESSAT EN</Text>
              <View style={styles.listActes}>
                <View style={styles.checkBox}>
                  <CheckBox
                    title='Click Here'
                    value={this.state.aplecs}
                    onValueChange={val => this.onChangeState('aplecs', val)}
                  />
                  <Text style={styles.informationCheckBox}>Aplecs</Text>
                </View>
                <View style={styles.checkBox}>
                  <CheckBox
                    title='Click Here'
                    value={this.state.ballades}
                    onValueChange={val => this.onChangeState('ballades', val)}
                  />
                  <Text style={styles.informationCheckBox}>Ballades</Text>
                </View>
                <View style={styles.checkBox}>
                  <CheckBox
                    title='Click Here'
                    value={this.state.concerts}
                    onValueChange={val => this.onChangeState('concerts', val)}
                  />
                  <Text style={styles.informationCheckBox}>Concerts</Text>
                </View>
                <View style={styles.checkBox}>
                  <CheckBox
                    title='Click Here'
                    value={this.state.concursos}
                    onValueChange={val => this.onChangeState('concursos', val)}
                  />
                  <Text style={styles.informationCheckBox}>Concursos</Text>
                </View>
                <View style={styles.checkBox}>
                  <CheckBox
                    title='Click Here'
                    value={this.state.cursets}
                    onValueChange={val => this.onChangeState('cursets', val)}
                  />
                  <Text style={styles.informationCheckBox}>Cursets</Text>
                </View>
                <View style={styles.checkBox}>
                  <CheckBox
                    title='Click Here'
                    value={this.state.altres}
                    onValueChange={val => this.onChangeState('altres', val)}
                  />
                  <Text style={styles.informationCheckBox}>Altres</Text>
                </View>

                <Text style={styles.titleApartats}>HABILITATS</Text>
                <View style={styles.listActes}>
                  <View style={styles.checkBox}>
                    <CheckBox
                      title='Click Here'
                      value={this.state.comptarRepartir}
                      onValueChange={val => this.onChangeState('comptarRepartir', val)}
                    />
                    <Text style={styles.informationCheckBox}>Comptar i Repartir</Text>
                  </View>
                  <View style={styles.checkBox}>
                    <CheckBox
                      title='Click Here'
                      value={this.state.sardanistaCompeticio}
                      onValueChange={val => this.onChangeState('sardanistaCompeticio', val)}
                    />
                    <Text style={styles.informationCheckBox}>Sardanista de competició</Text>
                  </View>
                </View>
                <Text style={styles.titleApartats}>PÚBLIC</Text>
                <View style={styles.imageTelephone}>
                  <Switch onValueChange={val => this.onChangeState('publicProfile', val)} value = {this.state.publicProfile}/>
                </View>
              </View>
            </View>
            <TouchableHighlight style={[styles.buttonContainer, styles.modifyButton]}
                                onPress={() => this.sendChanges()}>
              <Text style={styles.modifyText}>GUARDAR CANVIS</Text>
            </TouchableHighlight>
            <View style={styles.end}/>
            </View>
          </ScrollView>
      </View>
    );
  }
}

ModifyPerfil.navigationOptions = {
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
  scrollView:{
    flex:1,
    width:'100%',
  },
  name:{
    fontWeight: '200',
    fontSize:30,
    color: '#AEB5BC',
  },
  image:{
    flex:1,
    width:undefined,
    height:undefined
  },
  profileImage:{
    height:200,
    width:200,
    borderRadius:100,
    overflow: 'hidden',
  },
  checkBox:{
    flexDirection: 'row',
    marginTop:5,
  },
  containerProfile:{
    alignSelf:'center',
    marginTop:30,
  },
  button:{
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    backgroundColor:'#41444B',
    borderRadius:50,
    position:'absolute',
    top: 20,
  },
  add:{
    backgroundColor: '#41444B',
    position:'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent:'center',
  },
  infoContainer:{
    alignSelf:'center',
    alignItems:'center',
    marginTop:16,
  },
  titleApartats:{
    fontWeight:'bold',
    fontSize:16,
    marginTop:20,
  },
  extraInfo:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft:50,
    flexDirection:'column',
  },
  information:{
    fontSize:16,
    marginTop:10,
    width:'90%',
    borderColor: 'gray',
  },
  informationCheckBox:{
    borderColor: 'gray',
    fontSize:16,
    marginTop:5,
    width:'50%',
  },
  imageTelephone:{
    flexDirection:'row',
    marginTop:10,
  },
  imageMail:{
    marginTop:10,
    flexDirection:'row',
  },
  imageLocalitat:{
    marginTop:-10,
    flexDirection:'row',
    marginRight:10,
  },
  textMail:{
    marginTop:2,
    marginLeft:10,
    fontSize:17,
    paddingTop:0,
  },
  numberTelephone:{
    marginLeft:10,
    fontSize:17,
    paddingTop:0,
  },
  listActes:{
    flexDirection:'column',
    width:'100%',
  },
  actesText:{
    fontSize:16,
    marginTop:5,
    marginLeft:10,
  },
  end:{
    marginBottom:20,
  },
  buttonContainer: {
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    borderRadius:30,
    marginTop:20,
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
  dropdownLocalitat: {
    width:'50%',
    flexDirection:'row',
  },
  containerIconLocalitat: {
    marginTop:28,
    marginRight:20,
  },
  containerActeProva:{
    flex: 1,
    backgroundColor: '#714170',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:'14%',
  },
  containerActe: {
    width:'100%',
    backgroundColor: "beige",
    minHeight:552,
  },
});
