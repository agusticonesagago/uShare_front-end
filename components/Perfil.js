import React , {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class Perfil extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} onContentSizeChange={this.onContentSizeChange} showVerticalScrollIndicator={false}>


          <View style={styles.containerProfile}>
            <View style={styles.profileImage}>
              <Image source={require("../img/profile-pic.jpg")} style={styles.image} rezideMode="center"></Image>
            </View>
            <View style={styles.button}>
              <Icon name={'md-chatboxes'} size={20} backgroundColor={'#41444B'} color={'#DFD8C8'}  />
            </View>
            <View style={styles.add}>
              <Icon name={'md-add'} size={35} backgroundColor={'#41444B'} color={'#DFD8C8'}  />
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, {fontWeight: '200', fontSize:30, color: '#AEB5BC'}]}>Agustí Conesa</Text>
          </View>
          <View style={styles.extraInfo}>
            <Text style={styles.titleApartats}>SOBRE MI</Text>
            <Text style={styles.information}>Sóc un noi jove que li encanta anar a actes sardanistes cada cap de setmana.</Text>
            <Text style={styles.titleApartats}>CONTACTE</Text>
            <View style={styles.imageTelephone}>
              <Icon name={'md-call'} size={30} color={'green'}  />
              <Text style={styles.numberTelephone}>676236998</Text>
            </View>
            <View style={styles.imageMail}>
              <Icon name={'md-mail'} size={30} color={'orange'}  />
              <Text style={styles.textMail}>agusticonesaeij@gmail.com</Text>
            </View>
            <Text style={styles.titleApartats}>VEHICLE</Text>
            <Text style={styles.information}>SÍ</Text>
            <Text style={styles.titleApartats}>ACTES</Text>
            <View style={styles.listActes}>
              <Icon name={'md-checkmark'} size={30} color={'green'}  />
              <Text style={styles.actesText}>Aplecs</Text>
            </View>
            <View style={styles.listActes}>
              <Icon name={'md-checkmark'} size={30} color={'green'}  />
              <Text style={styles.actesText}>Ballades</Text>
            </View>
            <View style={styles.listActes}>
              <Icon name={'md-checkmark'} size={30} color={'green'}  />
              <Text style={styles.actesText}>Concursos</Text>
            </View>
          </View>
          <View style={styles.end}/>
        </ScrollView>
      </View>
    );
  }
}

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
    flexDirection: 'row',
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
});
