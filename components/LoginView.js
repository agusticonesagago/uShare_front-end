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

import * as globalHelper from './Auxiliars/GlobalHelper.js'

var API_USER = globalHelper.API_USER;
const asyncStorageLoggedUserEmailKey = globalHelper.asyncStorageLoggedUserEmailKey;

export default class LoginView extends React.Component {

  constructor(props) {
    super(props);

      this.state = {
          email   : '',
          password: '',
    }

  }

  onClickListener = (viewId) => {
      Alert.alert("Alert", "Button pressed " + viewId);
  }

    onChangeState = (key, val) => {
        this.setState({ [key]: val })
    };

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

    /*
    * Crida la API i fa el logIn del usuari a partir del this.state
    */
    async logInUser() {
        var email = this.state.email;
        var password = this.state.password;
        var loginUri = API_USER + email + '/login';

        try {
            const response = await fetch(loginUri,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: password
                });

            if(response.status === globalHelper.API_SUCESSFUL_LOGIN_CODE) {
                alert("Upload success!");
                await globalHelper.signInStoreLoggedUserEmailAsync(email);
                const json = await this.getUser(email);

                //this.props.navigation.navigate(globalHelper.HomeStackScreenID);
                this.props.navigation.replace(globalHelper.HomeStackScreenID);
            }
            else {
                Alert.alert("Vigila!", "Incorrecte email o contrasenya");
                console.log('\n');
                console.log("Status: ", response.status);
            }

        }
        catch (error) {
            console.error(error);
            alert("Upload Exception failed!");
        }
    }



    render() {
    return (
      <View style={styles.container}>
          <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange} showVerticalScrollIndicator={false}>
            <View style={styles.LogIn}>
                <View style={styles.logo}>
                  <Image source={require("../img/logoconfederacio.png")} style={styles.image} rezideMode="center"/>
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

                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}
                                    onPress={() => this.logInUser()}>
                  <Text style={styles.loginText}>Entra</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer}
                                    onPress={() => this.props.navigation.navigate(globalHelper.SignUpScreenID) }>
                  <Text>Registrat</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer}
                                    onPress={async () => {
                                        let storedUserEmail = await globalHelper.getLoggedUserEmailAsync();
                                        alert(storedUserEmail);

                                        console.log('\n');
                                        console.log("storedUserEmail: ", storedUserEmail);
                                        console.log('\n');
                                    }
                                    } >

                                    <Text>Test logged user</Text>
                </TouchableOpacity>






            </View>
          </ScrollView>
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
    scrollView:{
        width:'100%',
    },
    LogIn:{
        alignItems: 'center',
    },

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
