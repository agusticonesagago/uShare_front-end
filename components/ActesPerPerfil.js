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

import * as globalHelper from './Auxiliars/GlobalHelper.js'

var API_USER = globalHelper.API_USER;
const asyncStorageLoggedUserEmailKey = globalHelper.asyncStorageLoggedUserEmailKey;

export default class ActesPerPerfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <View style={styles.containerActe}>
          <View style={styles.WhereWhen}>
            <Text style={styles.Activitat}>
              {this.props.nomActivitat}
            </Text>
            <Text style={styles.Where}>
              {this.props.dia}
            </Text>
            <Text style={styles.When}>
              {this.props.when} h
            </Text>
          </View>
          <View style={styles.containerButtonActe}>
            <TouchableOpacity style={[styles.buttonContainer, styles.InfoButton]}
                                  onPress={() => this.props.navigation.navigate(globalHelper.ActeCompleteID, {id:this.props.identificador})}>
              <Text style={styles.mesInfoText}>Més informació</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerActe: {
    width:'100%',
    backgroundColor: "beige",
    borderWidth: 0.5,
    flexDirection: 'row',
  },
  WhereWhen:{
    flexDirection: 'column',
    marginLeft: 40,
    marginTop:15,
    width:'50%',
  },
  Where:{
    marginRight: 2,
    color: 'black',
    fontSize: 15,
    width:'75%',
    marginRight:'5%',
    marginTop:'2%',
  },
  Activitat:{
    marginRight: 2,
    color: '#714170',
    fontWeight: 'bold',
    fontSize: 15,
    width:'75%',
    marginRight:'5%',
  },
  When:{
    marginRight: 2,
    color: 'black',
    fontSize: 15,
    width:'75%',
    marginRight:'5%',
    marginTop:'2%',
    marginBottom:15,
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
    width:'90%',
    textAlign:'center',
  },
  containerButtonActe:{
    width:'27%',
    marginTop:'7%',
    marginLeft:'5%',
  }
});
