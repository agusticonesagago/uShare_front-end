
import React , {Component} from 'react';
import {StyleSheet, Text, TextInput, View, Image, 
  Button,
  TouchableHighlight,
  Alert} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class LoginView extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
    }
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }
  

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={require("../img/LogoConfederacio.png")} style={styles.image} rezideMode="center"></Image>
        </View>
        
        <View style={styles.inputContainer}>
          <Icon name={'md-mail'} size={28} style={styles.mailIcon} />
          <TextInput style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Icon name={'md-key'} size={28} style={styles.keyIcon} />
          <TextInput style={styles.inputs}
            placeholder="Contrasenya"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
          <Text style={styles.loginText}>Entra</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
          <Text>Registrat</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

LoginView.navigationOptions = {
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
    image:{
      flex:1,
      width:undefined,
      height:undefined
    },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
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
        alignItems:'center'
    },
      inputs:{
          height:45,
          marginLeft:16,
          borderBottomColor: '#FFFFFF',
          flex:1,
      },
      mailIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
      },
      keyIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
      },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },
      loginButton: {
        backgroundColor: "#00b5ec",
      },
        loginText: {
          color: 'white',
        }
});
 




