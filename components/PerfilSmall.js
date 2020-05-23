import React from 'react';
import {
    Alert,
    AsyncStorage,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';

import Drawer from './Drawer.js';

import * as globalHelper from './Auxiliars/GlobalHelper.js'

var API_USER = globalHelper.API_USER;
const asyncStorageLoggedUserEmailKey = globalHelper.asyncStorageLoggedUserEmailKey;

export default class PerfilSmall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
        <View style={styles.containerPerfil}>
          {this.props.photo && (
            <Image source={{uri: `data:image/gif;base64,${this.props.photo}`}} style={styles.imageProfile}></Image>
          )}
          {!this.props.photo && (<Image source={require("../img/interface.png")} style={styles.imageProfile} rezideMode="center"></Image>)}
          <View style={styles.containerInfoProfile}>
            <View style={styles.containerInfoPerfil}>
              <Text style={styles.nameProfile}>{this.props.nomCognom}</Text>
              <Text style={styles.descriptionProfile}>{this.props.description}</Text>
              {this.props.vehicle && (<Icon name={'md-car'} size={30} color={'blue'}  />) }
            </View>
            <View style={styles.containerMesInfoPerfil}>
              <TouchableOpacity style={[styles.buttonContainer, styles.InfoButton]}
                                    onPress={() => this.props.navigation.navigate(globalHelper.PerfilExternScreenID, {email:this.props.email})}>
                <Text style={styles.mesInfoText}>Més informació</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
    );
  }
}

PerfilSmall.navigationOptions = {
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
  containerPerfil: {
    backgroundColor: 'grey',
    width:'100%',
    backgroundColor: "beige",
    borderWidth: 0.5,
    flexDirection:'row',
  },
  imageProfile:{
    overflow: 'hidden',
    position: 'relative',
    height:120,
    width:120,
    marginTop:30,
    marginBottom:10,
    marginLeft:20,
    marginRight:20,
  },
  containerInfoProfile:{
    overflow: 'hidden',
    position: 'relative',
    flexDirection:'column',
    marginTop:30,
    marginBottom:10,
    marginLeft:0,
    marginRight:20,
    width:'60%',
  },
  nameProfile:{
    fontWeight: 'bold',
    marginRight:5,
    color:'grey',
    fontSize: 19,
  },
  descriptionProfile:{
    width:'100%',
    marginTop: 10,
    color:'grey',
  },
  containerMesInfoPerfil:{
    marginTop:'10%',
    width:'50%',
    marginRight:'5%',
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
  },
  InfoButton: {
    backgroundColor: "#714170",
  },
  mesInfoText: {
    color: 'white',
    fontSize: 15,
    width:'auto',
    textAlign:'center',
  },
  containerInfoPerfil:{
    marginLeft:'1.5%',
  }
});
