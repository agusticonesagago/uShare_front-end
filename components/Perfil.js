import React , {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, Alert, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import * as globalHelper from './Auxiliars/GlobalHelper.js'

import {NavigationContainer} from '@react-navigation/native';

var API_USER = globalHelper.API_USER;
var API = globalHelper.API;
const asyncStorageLoggedUserEmailKey = globalHelper.asyncStorageLoggedUserEmailKey;

import ModifyPerfil from './ModifyPerfil.js';
import ActesPerPerfil from './ActesPerPerfil.js';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default class Perfil extends React.Component {
  componentDidMount() {
   this.getInfoUser();
   this.getInfoActesAntics();
   this.getInfoActesNous();
  }
  constructor(props) {
        super(props)
        this.state = {
           textSobreMi: '',
           textName:'',
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
           sardanistaCompeticio: '',
           comarca:'',
           comptarIRepartir:true,
           option:1,
           changeInfo:false,
           actesAnticsLoaded:false,
           actesFutursLoaded:false,
           altresHabilitats:'',
           'actesNous': [],
           'actesAntics': [],
        }
  }

  onChangeState = (key, val) => {
      this.setState({ [key]: val })
  }

  renderActes () {
    let actes = []
    if(this.state.aplecs){
      actes.push(
        <View style={styles.listActes}>
           <Icon name={'md-checkmark'} size={30} color={'green'}  />
           <Text style={styles.actesText}>Aplecs</Text>
        </View>
      )
    }
    if(this.state.ballades){
      actes.push(
        <View style={styles.listActes}>
           <Icon name={'md-checkmark'} size={30} color={'green'}  />
           <Text style={styles.actesText}>Ballades</Text>
        </View>
      )
    }
    if(this.state.concerts){
      actes.push(
        <View style={styles.listActes}>
           <Icon name={'md-checkmark'} size={30} color={'green'}  />
           <Text style={styles.actesText}>Concerts</Text>
        </View>
      )
    }
    if(this.state.concursos){
      actes.push(
        <View style={styles.listActes}>
           <Icon name={'md-checkmark'} size={30} color={'green'}  />
           <Text style={styles.actesText}>Concursos</Text>
        </View>
      )
    }
    if(this.state.cursets){
      actes.push(
        <View style={styles.listActes}>
           <Icon name={'md-checkmark'} size={30} color={'green'}  />
           <Text style={styles.actesText}>Cursets</Text>
        </View>
      )
    }
    if(this.state.altres){
      actes.push(
        <View style={styles.listActes}>
           <Icon name={'md-checkmark'} size={30} color={'green'}  />
           <Text style={styles.actesText}>Altres</Text>
        </View>
      )
    }
    return actes;
  }


  renderHabilitats () {
    let habilitats = []
    if(this.state.comptarIRepartir){
      habilitats.push(
        <View style={styles.listActes}>
           <Icon name={'md-checkmark'} size={30} color={'green'}  />
           <Text style={styles.actesText}>Sé comptar i repartir</Text>
        </View>
      )
    }
    if(this.state.sardanistaCompeticio){
      habilitats.push(
        <View style={styles.listActes}>
           <Icon name={'md-checkmark'} size={30} color={'green'}  />
           <Text style={styles.actesText}>Sóc sardanista de competició</Text>
        </View>
      )
    }
    return habilitats;
  }

  async getInfoActesNous() {
      try {

          this.state.textMail = await globalHelper.getLoggedUserEmailAsync();
          const response = await fetch(API_USER + this.state.textMail + '/acts/next');
          const json = await response.json();
          this.state.actesNous = json;

          this.setState({
            actesFutursLoaded: true
          });
      }
      catch (error) {
          console.error(error);
      }
  }

  async getInfoActesAntics() {
      try {
          this.state.textMail = await globalHelper.getLoggedUserEmailAsync();
          const response = await fetch(API_USER + this.state.textMail + '/acts/past');

          const json = await response.json();
          this.state.actesAntics = json;

          this.setState({
            actesAnticsLoaded: true
          });
          //console.log(this.state.actes); //Per veure quins actes té
      }
      catch (error) {
          console.error(error);
      }
  }

  changeOption(option) {
    if(option == "informacion"){
      this.state.option = 1;
    }
    else if (option == "old"){
      this.state.option = 2;
    }
    else {
      this.state.option = 3;
    }
    this.state.changeInfo = !this.state.changeInfo;
    this.forceUpdate();
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
          this.onChangeState("textMail", json.email);

          if(json.vehicle){
            this.onChangeState("textVehicle", "SÍ");
          }
          else this.onChangeState("textVehicle", "NO");

          this.onChangeState("aplecs", json.aplecs);
          this.onChangeState("ballades", json.ballades);
          this.onChangeState("concerts", json.concerts);
          this.onChangeState("concursos", json.concursos);
          this.onChangeState("cursets", json.cursets);
          this.onChangeState("altres", json.altres);
          this.onChangeState("edat", json.edat);
          this.onChangeState("altresHabilitats", json.altresHabilitats);
          this.onChangeState("comarca", json.comarca);
          var dia = json.birthday.slice(8, 10);
          var mes = json.birthday.slice(5, 7);
          var any = json.birthday.slice(0, 4);
          this.onChangeState("birthday", dia+'/'+mes+'/'+any);

          if(json.competidor){
            this.onChangeState("sardanistaCompeticio", true);
          }
          else this.onChangeState("sardanistaCompeticio", false);

          if(json.comptarRepartir){
            this.onChangeState("comptarIRepartir", true);
          }
          else this.onChangeState("comptarIRepartir", false);

      }
      catch (error) {
          console.error(error);
      }
  }

  renderActesAntics(){
    let actesAntic = [];

    for (let i = 0; i < this.state.actesAntics.length; ++i) {
      var dia = this.state.dia.slice(8, 10);
      var mes = this.state.dia.slice(5, 7);
      var any = this.state.dia.slice(0, 4);
      actesAntic.push(<ActesPerPerfil where={this.state.actesAntics[i].lloc}
       when={this.state.actesAntics[i].hora1}
       activitat={this.state.actesAntics[i].tipus}
       cobla={this.state.actesAntics[i].cobla1}
       dia={dia+'/'+mes+'/'+any}
       nomActivitat={this.state.actesAntics[i].nomActivitat} navigation={this.props.navigation}
       identificador={this.state.actesAntics[i].id}/>)
    }
    return(
      <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange} showVerticalScrollIndicator={false}>
        {actesAntic}
      </ScrollView>
    )
  }


  renderActesNous(){
    let actesNou = [];
    for (let i = 0; i < this.state.actesNous.length; ++i) {
      var dia = this.state.actesNous[i].dia.slice(8, 10);
      var mes = this.state.actesNous[i].dia.slice(5, 7);
      var any = this.state.actesNous[i].dia.slice(0, 4);
      actesNou.push(<ActesPerPerfil where={this.state.actesNous[i].lloc}
       when={this.state.actesNous[i].hora1}
       activitat={this.state.actesNous[i].tipus}
       dia={dia+'/'+mes+'/'+any}
       cobla={this.state.actesNous[i].cobla1}
       nomActivitat={this.state.actesNous[i].nomActivitat} navigation={this.props.navigation}
       identificador={this.state.actesNous[i].id}/>)
    }
    return(
      <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange} showVerticalScrollIndicator={false}>
        {actesNou}
      </ScrollView>
    )
  }

  renderPerfil() {
    let info;
    if(this.state.option == 1 ){
      info = <View style={styles.extraInfo}>
          <Text style={styles.titleApartats}>SOBRE MI</Text>
          <Text style={styles.information}>{this.state.textSobreMi}</Text>
          <Text style={styles.titleApartats}>LOCALITAT</Text>
          <View style={styles.imageTelephone}>
              <Icon name={'md-home'} size={30} color={'#0000FF'}  />
              <Text style={styles.textMail}>{this.state.comarca}</Text>
          </View>
          <Text style={styles.titleApartats}>NAIXEMENT</Text>
          <View style={styles.imageMail}>
            <Icon name={'md-gift'} size={30} color={'red'}  />
            <Text style={styles.textMail}>{this.state.birthday}</Text>
          </View>
          <Text style={styles.titleApartats}>CONTACTE</Text>
          <View style={styles.imageTelephone}>
            <Icon name={'md-call'} size={30} color={'green'}  />
            <Text style={styles.numberTelephone}>{this.state.textNumber}</Text>
          </View>
          <View style={styles.imageMail}>
            <Icon name={'md-mail'} size={30} color={'orange'}  />
            <Text style={styles.textMail}>{this.state.textMail}</Text>
          </View>
          <Text style={styles.titleApartats}>VEHICLE</Text>
          <Text style={styles.information}>{this.state.textVehicle}</Text>
          <Text style={styles.titleApartats}>HABILITATS</Text>
          <View>{this.renderHabilitats()}</View>
          <Text style={styles.titleApartats}>També sé ...</Text>
          <Text style={styles.information}>{this.state.altresHabilitats}</Text>
          <Text style={styles.titleApartats}>INTERESSAT EN</Text>
          <View>
            <View>{this.renderActes()}</View>
          </View>
          <TouchableOpacity style={[styles.editButtonContainer, styles.modifyButton]}
                        onPress={() => this.props.navigation.navigate(globalHelper.ModifyPerfilID, {email:this.state.textMail})}>
            <Text style={styles.modifyText}>EDITAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.passwordButtonContainer, styles.modifyButton]}
                              onPress={() => this.props.navigation.navigate(globalHelper.ModifyPasswordID, {email:this.state.textMail})}>
            <Text style={styles.modifyText}>MODIFICAR CONTRASENYA</Text>
          </TouchableOpacity>
          <View style={styles.end}/>
        </View>
      }
    else if(this.state.option == 3 ){
      info = <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange} showVerticalScrollIndicator={false}>
        {this.renderActesNous()}
      </ScrollView>
    }
    else {
      info = <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange} showVerticalScrollIndicator={false}>
        {this.renderActesAntics()}
      </ScrollView>
    }
    return (<View>{info}</View>);
  }



  render() {
    //var {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.headerBar}>
              <Text style={styles.titleNavigator}> Perfil </Text>
        </View>
        <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange} showVerticalScrollIndicator={false}>
          <View style={styles.containerProfile}>
            <View style={styles.profileImage}>
              {this.state.photo && (
                <Image source={{uri: `data:image/gif;base64,${this.state.photo}`}} style={styles.image} rezideMode="center"></Image>
              )}
              {!this.state.photo && (<Image source={require("../img/interface.png")} style={styles.image} rezideMode="center"></Image>)}
            </View>
            <View style={styles.button}>
              <Icon name={'md-chatboxes'} size={20} backgroundColor={'#41444B'} color={'#DFD8C8'}  />
            </View>
            <View style={styles.add}>
              <Icon name={'md-add'} size={35} backgroundColor={'#41444B'} color={'#DFD8C8'}  />
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={[styles.text, {fontWeight: '200', fontSize:30, color: '#AEB5BC'}]}>{this.state.textName}</Text>
          </View>

          <View style={styles.iconContainer} >
            <View style={styles.icon} >
              <Icon name={'md-person'} size={35} backgroundColor={'#41444B'}
              color={'#0e4381'}   onPress={() => this.changeOption("informacion")}/>
            </View>
            <View style={styles.icon}>
              <Icon name={'md-bookmark'} size={35} backgroundColor={'#41444B'}
              color={'#714170'} onPress={() => this.changeOption("old")} />
            </View>
            <Icon name={'md-flame'} size={35} backgroundColor={'#41444B'}
            color={'#e84f30'}  onPress={() => this.changeOption("future")}/>
          </View>

          <View>
            {this.renderPerfil()}
          </View>

        </ScrollView>
      </View>
    );
  }
}
/*
Perfil.navigationOptions = {
  tabBarIcon: ({tintColor,focused}) => (
    <Icon
      //name={focused ? 'md-flame' : 'ios-flame'}
      name={'md-person'}
      size={28}
      color={tintColor}
    />
  )
}
*/
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
    //flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft:50,
    flexDirection:'column',
  },
  information:{
    fontSize:16,
    marginTop:10,
  },
  imageTelephone:{
    marginTop:10,
    flexDirection:'row',
  },
  imageMail:{
    marginTop:10,
    flexDirection:'row',
  },
  textMail:{
    marginTop:2,
    marginLeft:10,
    fontSize:17,
  },
  numberTelephone:{
    marginTop:2,
    marginLeft:10,
    fontSize:17,
  },
  listActes:{
    flexDirection:'row',
  },
  actesText:{
    fontSize:16,
    marginTop:5,
    marginLeft:10,
  },
  end:{
    marginBottom:20,
  },
  editButtonContainer: {
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    borderRadius:30,
    marginTop:20,
    width:'80%',
    marginLeft:'5%',
    marginRight:'10%',
  },
  passwordButtonContainer: {
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    borderRadius:30,
    width:'80%',
    marginLeft:'5%',
    marginRight:'10%',
  },
  modifyButton: {
    backgroundColor: "#714170",
  },
  modifyText: {
    color: 'white',
  },
  iconContainer:{
    alignSelf:'center',
    alignItems:'center',
    marginTop:16,
    flexDirection:'row',
    marginBottom:10,
  },
  icon:{
    marginRight:60,
  },
  headerBar:{
      width:'100%',
      height: '13.2%',
      paddingLeft: '6%',
      flexDirection:'row',
      backgroundColor: '#714170',
  },
  titleNavigator:{
    color:'white',
    fontSize:30,
    paddingTop:20,
    width:'50%',
  },
});
