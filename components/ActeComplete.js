import React , {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';

import Drawer from './Drawer.js';

import * as globalHelper from './Auxiliars/GlobalHelper.js'
import * as globalHelperAPI_Actes from './Auxiliars/GlobalHelperAPIs/GlobalHelperAPI_Actes'

var API = globalHelper.API;
const asyncStorageLoggedUserEmailKey = globalHelper.asyncStorageLoggedUserEmailKey;

export default class ActeComplete extends React.Component {
  componentDidMount() {
      this.getInfoActe();
      this.estaApuntat();
  }
  constructor(props) {
        super(props)
        this.state = {
           idActe: '179878',
           when: '',
           where: '',
           activitat: '',
           llocFaMalTemps: '',
           extraInfo:'',
           cobles:'',
           acteLoaded: false,
           imatge:'',
           nomActivitat:'',
           apuntat: false,
           anulat:'',
        }
  }

  onChangeState = (key, val) => {
      this.setState({ [key]: val })
  }

  async getInfoActe() {
      try {
          this.state.idActe = this.props.route.params.id;
          console.log("idActe: " + this.state.idActe);
          const response = await fetch(API + '/actes/' + this.state.idActe);
          const json = await response.json();

          if(json.hora2 === '') this.onChangeState("when", json.dia.slice(0, 10) + ' a les ' + json.hora1 + 'h' );
          else this.onChangeState("when", json.dia + ' de ' + json.hora1 + 'h' + ' a ' + json.hora2 + 'h');
          this.onChangeState("where", json.poblacioMitjana + ' - ' + json.lloc);
          this.onChangeState("activitat", json.tipus);

          if(json.llocSiPlou === '') this.onChangeState("llocFaMalTemps", "No n'hi ha");
          else this.onChangeState("llocFaMalTemps", json.llocSiPlou);


          this.onChangeState("extraInfo", json.mesDades);

          this.onChangeState("cobles", json.cobla1);
          this.onChangeState("imatge", json.imatge);
          this.onChangeState("nomActivitat", json.nomActivitat);
          this.onChangeState("anulat", json.anul);
      }
      catch (error) {
          console.error(error);
      }
      this.estaApuntat();
      this.setState({
        acteLoaded: true
      });
  }

  async estaApuntat(){
    try {
        const response = await fetch(API + '/actes/'+ this.state.idActe + '/assistants/' + "agusticonesa@gmail.com");
        const json = await response.json();
        this.state.apuntat = json;
    }
    catch (error) {
        console.error(error);
    }
  }

  async apuntarse(){
    if(this.state.apuntat){
      var email = globalHelper.asyncStorageLoggedUserEmailKey;
      var apuntarseURI = API + '/actes/'+ this.state.idActe + '/assistants/'+"agusticonesa@gmail.com";
      console.log(apuntarseURI);
      this.state.apuntat = false;
      try {
          const response = await fetch(apuntarseURI,
              {
                  method: 'DELETE',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                  },
              });
          if(response.status === 204) {
              console.log("Desapuntat");
          }
          else {
              console.log('\n');
              console.log("Status: ", response.status);
          }
        }
        catch (error) {
            console.error(error);
            alert("Delete Exception failed!");
        }
    }
    else{
      var email = globalHelper.asyncStorageLoggedUserEmailKey;
      //console.log(email);
      var apuntarseURI = API + '/actes/'+ this.state.idActe + '/assistants?email='+"agusticonesa@gmail.com";
      console.log(apuntarseURI);
      this.state.apuntat = true;
      try {
          const response = await fetch(apuntarseURI,
              {
                  method: 'POST',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                  },
              });
          if(response.status === 201) {
              console.log("apuntat");
          }
          else {
              console.log('\n');
              console.log("Status: ", response.status);
          }
      }
      catch (error) {
          console.error(error);
          alert("Upload Exception failed!");
      }
    }
    this.forceUpdate();
  }

  mesInformacio() {
    if(this.state.extraInfo!=''){
      return(
        <View style={styles.ActivitatCobles}>
          <Text style={styles.ActivitatCoblesInterpets}>Més informarció:</Text>
          <Text style={styles.InfoActeActivitatCobles}>{this.state.extraInfo}</Text>
        </View>
      )
    }
    else return null;
  }



  bottomApuntarse() {
    if(this.state.apuntat){
        return(
          <View style={styles.containerButtonActe}>
            <TouchableOpacity style={[styles.buttonContainer, styles.InfoButton]}
                                  onPress={() => this.apuntarse()}>
              <Text style={styles.apuntarseText}>DESAPUNTAR-SE</Text>
            </TouchableOpacity>
          </View>
        )
    }
    else{
      return(
        <View style={styles.containerButtonActe}>
          <TouchableOpacity style={[styles.buttonContainer, styles.InfoButton]}
                                onPress={() => this.apuntarse()}>
            <Text style={styles.apuntarseText}>APUNTAR-SE</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  anulat() {
    if(this.state.anulat=="Suspès"){
        return(
          <Text style={styles.anulat}>
            [ANULAT]
          </Text>
        )
    }
    else return null
  }

    assistents() {
        globalHelperAPI_Actes.getAssistantsOfActe(this.state.idActe).then((users)=>{
                this.props.navigation.navigate(globalHelper.ListPerfilScreenID, {data:users});
            }
        );
    }

  render() {
    if(this.state.acteLoaded){
      let Image_Http_URL = {uri: this.state.imatge};
      return (
        <View style={styles.containerActeProva}>
          <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange} showVerticalScrollIndicator={false}>
            <View style={styles.containerActe}>
              <Image source={Image_Http_URL} style={styles.image} rezideMode="center"></Image>
              {this.bottomApuntarse()}
              <View style={styles.containerButtonQuiVa}>
                <TouchableOpacity style={[styles.buttonContainer, styles.InfoButton]}
                                      onPress={() => this.assistents()}>
                  <Text style={styles.apuntarseText}>QUI VA?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.containerInfoActe}>
              <View style={styles.WhereWhen}>
                <View style={styles.containerNomActeAnulat}>
                  {this.anulat()}
                  <Text style={styles.Which}>
                    {this.state.nomActivitat}
                  </Text>
                </View>
                <Text style={styles.Where}>
                  {this.state.where}
                </Text>
                <Text style={styles.When}>
                  {this.state.when}
                </Text>
              </View>
              <View style={styles.ActivitatCobles}>
                  <Text style={styles.ActivitatCoblesInterpets}>Activitat:</Text>
                  <Text style={styles.InfoActeActivitatCobles}>{this.state.activitat}</Text>
              </View>
              <View style={styles.ActivitatCobles}>
                  <Text style={styles.ActivitatCoblesInterpets}>Cobles/Intèrprets:</Text>
                  <Text style={styles.InfoActeActivitatCobles}>{this.state.cobles}</Text>
              </View>
              <View style={styles.ActivitatCobles}>
                <Text style={styles.ActivitatCoblesInterpets}>Lloc si fa mal temps:</Text>
                <Text style={styles.InfoActeActivitatCobles}>{this.state.llocFaMalTemps}</Text>
              </View>
              <View style={{marginTop: 3}}></View>
               {this.mesInformacio()}
               <View style={{marginBottom: 10}}></View>
             </View>
            </View>
          </ScrollView>
        </View>
      )
    }
    else {
     return null;
    }
  }


}

ActeComplete.navigationOptions = {
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
  containerActe: {
    width:'100%',
    backgroundColor: "beige",
    minHeight:552,
  },
  containerActeFlecha: {
    backgroundColor: 'grey',
    width:'100%',
    backgroundColor: "#714170",
  },
  containerActeProva:{
    flex: 1,
    backgroundColor: '#714170',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:'14%',
  },
  image:{
    width:'100%',
    height:270,
  },
  containerInfoActe:{
    width:'97%',
    justifyContent: 'center',
  },
  WhereWhen:{
    flexDirection: 'column',
    marginLeft: 10,
    marginTop:10,
  },
  Where:{
    color:'grey',
    fontSize: 20,
    color: '#714170',
    fontWeight: 'bold',
    marginTop:0,
  },
  Which:{
    marginRight: 2,
    color: '#714170',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom:10,
    marginTop:4,
    width:'70%',
  },
  When:{
    color:'grey',
    fontSize: 20,
    color: '#714170',
    fontWeight: 'bold',
    marginBottom:10,
  },
  ActivitatCobles:{
    marginLeft: 10,
    width:'67%',
    marginTop:5,
    flexDirection:'row',
  },
  ActivitatCoblesInterpets:{
    fontWeight: 'bold',
    marginRight:5,
    color:'grey',
    fontSize: 15,
  },
  InfoActeActivitatCobles:{
    color:'grey',
    fontSize: 15,
  },
  ExtraInfoActe:{
    marginLeft: 10,
    color:'grey',
    marginBottom:10,
    fontSize: 15,
  },
  scrollView:{
    flex:1,
    width:'100%',
  },
  containerButtonActe:{
    width:'40%',
    marginRight:'3%',
    marginTop:-60,
    marginLeft:10,
  },
  containerButtonQuiVa:{
    width:'40%',
    marginRight:'3%',
    marginTop:-65,
    marginLeft:230,
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:'100%',
    paddingTop:10,
    paddingBottom:10,
    borderRadius:30,
    borderWidth:2,
    borderColor:'white',
  },
  InfoButton: {
    backgroundColor: "#714170",
  },
  apuntarseText: {
    color: 'white',
    fontSize: 15,
    width:'90%',
    textAlign:'center',
  },
  containerNomActeAnulat:{
    flexDirection:'row',
  },
  anulat:{
    marginRight: 10,
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop:5.5,
    marginBottom:10,
    borderRadius:30,
    textAlignVertical: 'center',
    width:'auto',
  }
});
