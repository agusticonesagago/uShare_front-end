import React , {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';

import Drawer from './Drawer.js';
import PerfilSmall from './PerfilSmall.js';

import * as globalHelper from './Auxiliars/GlobalHelper.js'

var API_USER = globalHelper.API_USER;
const asyncStorageLoggedUserEmailKey = globalHelper.asyncStorageLoggedUserEmailKey;

export default class ListPerfilSmall extends React.Component {

  componentDidMount() {
   this.getInfoPersones();
  }

  constructor(props) {
        super(props);
        this.state = {
          persones: [],
           personesLoaded: false
        }
  }


    async getInfoPersones() {
      try {
          const response = await fetch(API_USER);

          const json = await response.json();
          this.state.persones = json;

          console.log("\n\n");
          console.log(response);
          console.log("\n\n");



          this.setState({
            personesLoaded: true
          });
          //console.log(this.state.actpersoneses); //Per veure quines persones hi ha
      }
      catch (error) {
          console.error(error);
      }
  }


  setData(data) {
      this.state.persones = data;
  }

  render() {

      if (this.state.personesLoaded) {
          if(this.props.route.params)  this.state.persones = this.props.route.params.users;
          let profiles = [];
          for (let i = 0; i < this.state.persones.length; ++i) {
              profiles.push(<PerfilSmall nomCognom={this.state.persones[i].name}
                                         description={this.state.persones[i].description}
                                         photo={this.state.persones[i].image}
              />)
          }

          return (// TODO: Fer la headerBar per a tots els que la necesitin
              <View style={styles.container}>
                  <View style={styles.headerBar}>
                      <View style={styles.logoImage}>
                          <Image source={require("../img/logorodo.png")} style={styles.image}></Image>
                          <Text style={styles.titleNavigator}> Perfils </Text>
                          <Icon name={'md-options'} size={34}
                            color={'white'}
                            style={styles.iconFilter}
                            onPress={() => {
                                this.props.navigation.navigate(globalHelper.FilterListPerfilScreenID);
                            }}
                          />
                      </View>
                      {/*<View style={styles.filterButton}>
                         <Button style={styles.buttonContainer}
                              onPress={() => {
                                  alert("This is a button");
                                  this.props.navigation.navigate(globalHelper.FilterListPerfilScreenID);
                              }}
                              title={"Filtra"}
                              //color={"#FFF"}
                          />
                          <Icon name={'md-options'} size={28}
                            color={'white'}
                            style={styles.iconFilter}
                            onPress={() => {
                                this.props.navigation.navigate(globalHelper.FilterListPerfilScreenID);
                            }}
                          >
                          </Icon>

                      </View>*/}

                  </View>

                  <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange}
                              showVerticalScrollIndicator={false}>
                      {profiles}
                  </ScrollView>
              </View>
          )
      }
    else {
        return (
            <View style={styles.container}>
                <Text style={styles.WaitingText}> Carregant... </Text>
            </View>

            //return null;
            )
    }
  }
}

/*ListPerfilSmall.navigationOptions = {
  tabBarIcon: ({tintColor,focused}) => (
    <Icon
      //name={focused ? 'md-calendar' : 'ios-calendar'}
      name={'md-calendar'}
      size={28}
      color={tintColor}
    />
  )
}*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  scrollView:{
    flex:1,
    width:'100%',
  },

    WaitingText:{
        color:'black',
        fontSize:30,
        paddingTop:20,
        width:'50%',
    },
    headerBar:{
        width:'100%',
        height: '13.2%',
        flexDirection:'row',
        backgroundColor: '#714170',
    },

    logoImage: {
        flexDirection:'row',
        flex:8
    },
    filterButton: {
        flexDirection:'row',
        height: '50%',
        alignSelf: 'flex-end'
    },


    containerNavigator: {
    width:'100%',
    flexDirection:'row',
  },

  titleNavigator:{
    color:'white',
    fontSize:30,
    paddingTop:20,
    width:'50%',
  },
  image:{
    borderRadius:100,
    overflow: 'hidden',
    position: 'relative',
    height:60,
    width:60,
    marginTop:10,
    marginBottom:10,
    marginLeft:20,
    marginRight:20,
  },
    text:{
        fontSize:22,
        marginLeft:15,
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
    iconFilter:{
      marginBottom:0,
      marginLeft:50,
      marginTop:23,
    }
});
