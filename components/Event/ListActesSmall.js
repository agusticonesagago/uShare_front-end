import React , {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';

import Actes from './Actes.js';
import PerfilSmall from '../Profile/PerfilSmall.js';

import * as globalHelper from '../Auxiliars/GlobalHelper.js'

var API = globalHelper.API;
const asyncStorageLoggedUserEmailKey = globalHelper.asyncStorageLoggedUserEmailKey;

export default class ListActesSmall extends React.Component {
  componentDidMount() {
   this.getInfoActes();
  }

  constructor(props) {
        super(props);
        this.state = {
          'actes': [],
           actesLoaded: false
        }
  }

  async getInfoActes() {
      try {
          const response = await fetch(API + '/actes');

          const json = await response.json();
          this.state.actes = json;

          this.setState({
            actesLoaded: true
          });
      }
      catch (error) {
          console.error(error);
      }
  }

  render() {

    if(this.state.actesLoaded){
        if(this.props.route.params)  this.state.actes = this.props.route.params.data;

        let actes = [];
        for (let i = 0; i < this.state.actes.length; ++i) {
         actes.push(<Actes where={this.state.actes[i].lloc}
           when={this.state.actes[i].hora1}
           activitat={this.state.actes[i].tipus}
           cobla={this.state.actes[i].cobla1}
           nomActivitat={this.state.actes[i].nomActivitat} navigation={this.props.navigation}
           identificador={this.state.actes[i].id} anulat={this.state.actes[i].anul} />)
        }

        return(
          <View style={styles.container}>
            <View style={styles.containerNavigator}>
              <Text style={styles.titleNavigator}> Actes </Text>
                <Icon name={'md-options'} size={34}
                      color={'white'}
                      style={styles.iconFilter}
                      onPress={() => {
                          this.props.navigation.navigate(globalHelper.FilterListActesScreenID);
                      }}
                />
            </View>
            <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange} showVerticalScrollIndicator={false}>
              {actes}
            </ScrollView>
          </View>
        )
      }
      else {
        return (
            <View style={styles.container}>
                <Text style={styles.WaitingText}> Carregant... </Text>
            </View>
        )
      }
  }
}

ListActesSmall.navigationOptions = {
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
    alignItems: 'flex-start',
  },
  scrollView:{
    flex:1,
    width:'100%',
  },
  containerNavigator: {
    backgroundColor: '#714170',
    height: '13.2%',
    maxHeight: 75,
    width:'100%',
    flexDirection:'row',
  },
  WaitingText:{
      color:'black',
      fontSize:30,
      paddingTop:20,
      width:'50%',
  },
  titleNavigator:{
    color:'white',
    fontSize:30,
    paddingTop:20,
    paddingLeft:'5%',
    width:'50%',
    marginRight:'35%'
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
  iconFilter:{
    marginBottom:0,
    marginTop:23,
  }
});
