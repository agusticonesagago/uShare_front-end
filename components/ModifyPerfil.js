import React , {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image,TextInput , Alert} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';

export default class Perfil extends React.Component {
  constructor(props) {
        super(props)
        this.state = {
           textSobreMi: 'Sóc un noi jove que li encanta anar a actes sardanistes cada cap de setmana.',
           textName:'Agustí Conesa',
           textNumber:'676236998',
           textMail:'agusticonesaeij@gmail.com',
           textVehicle:true,
           aplecs:   true,
           concerts: true,
           ballades: true,
           concursos: true,
           cursets: true,
           altres: true,
           birthday: "1997-09-23",
        }
        this.handleTextSubmit = this.handleTextSubmit.bind(this);
  }

  handleTextSubmit() {
     Alert.alert(
     "Canvis fets",
     this.state.textSobreMi,
     [
         {
           text: "CANCELAR",
           onPress: () => console.log("Cancel Pressed"),
           style: "cancel"
         },
         { text: "ACORD", onPress: () => console.log("OK Pressed") }
       ],
       { cancelable: false }
    );
  }

  onChangeState = (key, val) => {
    this.setState({ [key]: val })
  }

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
            <TextInput style={styles.name} onChangeText={(textName) => this.setState({textName})} editable>{this.state.textName}</TextInput>
          </View>
          <View style={styles.extraInfo}>
            <Text style={styles.titleApartats}>SOBRE MI</Text>
            <TextInput style={styles.information} multiline
            onSubmitEditing={this.handleTextSubmit} onChangeText={(textSobreMi) => this.setState({textSobreMi})}
            editable>{this.state.textSobreMi}</TextInput>
            <Text style={styles.titleApartats}>NAIXEMENT</Text>
            <View style={styles.imageMail}>
              <Icon name={'md-gift'} size={30} color={'red'}  />
              <TextInput style={styles.numberTelephone} onChangeText={(birthday) => this.setState({birthday})} editable>{this.state.birthday}</TextInput>
            </View>
            <Text style={styles.titleApartats}>CONTACTE</Text>
            <View style={styles.imageTelephone}>
              <Icon name={'md-call'} size={30} color={'green'}  />
              <TextInput style={styles.numberTelephone} onChangeText={(textNumber) => this.setState({textNumber})} editable>{this.state.textNumber}</TextInput>
            </View>
            <View style={styles.imageMail}>
              <Icon name={'md-mail'} size={30} color={'orange'}  />
              <TextInput style={styles.textMail} onChangeText={(textMail) => this.setState({textMail})} editable>{this.state.textMail}</TextInput>
            </View>
            <Text style={styles.titleApartats}>VEHICLE</Text>
            <View style={styles.checkBox}>
              <CheckBox
                title='Click Here'
                value={this.state.vehicle}
                onValueChange={val => this.onChangeState('vehicle', val)}
              />
              <Text style={styles.informationCheckBox}>Vehicle</Text>
            </View>
            <Text style={styles.titleApartats}>ACTES</Text>
            <View style={styles.listActes}>
              <View style={styles.checkBox}>
                <CheckBox
                  title='Click Here'
                  value={this.state.aplecs}
                  onValueChange={val => this.onChangeState('aplecs', val)}
                />
                <Text style={styles.informationCheckBox}>Aplecs</Text>
              </View>
              <View style={styles.checkBox}>
                <CheckBox
                  title='Click Here'
                  value={this.state.ballades}
                  onValueChange={val => this.onChangeState('ballades', val)}
                />
                <Text style={styles.informationCheckBox}>Ballades</Text>
              </View>
              <View style={styles.checkBox}>
                <CheckBox
                  title='Click Here'
                  value={this.state.concerts}
                  onValueChange={val => this.onChangeState('concerts', val)}
                />
                <Text style={styles.informationCheckBox}>Concerts</Text>
              </View>
              <View style={styles.checkBox}>
                <CheckBox
                  title='Click Here'
                  value={this.state.concursos}
                  onValueChange={val => this.onChangeState('concursos', val)}
                />
                <Text style={styles.informationCheckBox}>Concursos</Text>
              </View>
              <View style={styles.checkBox}>
                <CheckBox
                  title='Click Here'
                  value={this.state.cursets}
                  onValueChange={val => this.onChangeState('cursets', val)}
                />
                <Text style={styles.informationCheckBox}>Cursets</Text>
              </View>
              <View style={styles.checkBox}>
                <CheckBox
                  title='Click Here'
                  value={this.state.altres}
                  onValueChange={val => this.onChangeState('altres', val)}
                />
                <Text style={styles.informationCheckBox}>Altres</Text>
              </View>
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
  name:{
    fontWeight: '200',
    fontSize:30,
    color: '#AEB5BC',
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
  checkBox:{
    flexDirection: 'row',
    marginTop:5,
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
    width:'90%',
    borderColor: 'gray',
  },
  informationCheckBox:{
    borderColor: 'gray',
    fontSize:16,
    marginTop:5,
    width:'50%',
  },
  imageTelephone:{
    flexDirection:'row',
    marginTop:10,
  },
  imageMail:{
    marginTop:10,
    flexDirection:'row',
  },
  textMail:{
    marginTop:2,
    marginLeft:10,
    fontSize:17,
    paddingTop:0,
  },
  numberTelephone:{
    marginLeft:10,
    fontSize:17,
    paddingTop:0,
  },
  listActes:{
    flexDirection:'column',
    width:'100%',
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