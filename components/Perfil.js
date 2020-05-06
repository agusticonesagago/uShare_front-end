import React , {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, TouchableHighlight} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import * as globalHelper from './Auxiliars/GlobalHelper.js'

var API_USER = globalHelper.API_USER;
const asyncStorageLoggedUserEmailKey = globalHelper.asyncStorageLoggedUserEmailKey;

export default class Perfil extends React.Component {
  componentDidMount() {
   this.getInfoUser();
  }
  constructor(props) {
        super(props)
        this.state = {
           textSobreMi: '',
           textName:'',
           textNumber:'',
           textMail:'agusticonesa@gmail.com',
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
           coblaCompeticio: '',
           comarca:'',
           comptarIRepartir:'',
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

  async getInfoUser() {
      try {
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
          this.onChangeState("comarca", json.comarca);
          this.onChangeState("birthday", json.birthday.slice(0, 10));

          if(json.competidor){
            this.onChangeState("sardanistaCompeticio", "SÍ");
          }
          else this.onChangeState("sardanistaCompeticio", "NO");

          if(json.coblaCompetició){
            this.onChangeState("coblaCompeticio", "SÍ");
          }
          else this.onChangeState("coblaCompeticio", "NO");

          if(json.comptarRepartir){
            this.onChangeState("comptarIRepartir", "SÍ");
          }
          else this.onChangeState("comptarIRepartir", "NO");

      }
      catch (error) {
          console.error(error);
      }
  }



  render() {
    //var {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
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
          <View style={styles.extraInfo}>
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
            <Text style={styles.information}>{this.state.comptarIRepartir}</Text>
            <Text style={styles.titleApartats}>SARDANES DE COMPETICIÓ</Text>
            <Text style={styles.information}>{this.state.sardanistaCompeticio}</Text>
            <Text style={styles.titleApartats}>COBLA DE COMPETICIÓ</Text>
            <Text style={styles.information}>{this.state.coblaCompeticio}</Text>
            <Text style={styles.titleApartats}>ACTES</Text>
            <View>
              <View>{this.renderActes()}</View>
            </View>
          </View>
          <TouchableHighlight style={[styles.editButtonContainer, styles.modifyButton]}
                              onPress={() => navigate()}>
            <Text style={styles.modifyText}>EDITAR</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.passwordButtonContainer, styles.modifyButton]}
                              onPress={() => navigate()}>
            <Text style={styles.modifyText}>MODIFICAR CONTRASENYA</Text>
          </TouchableHighlight>
          <View style={styles.end}/>
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
    marginLeft:'10%',
    marginRight:'10%',
  },
  passwordButtonContainer: {
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
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
  }
});
