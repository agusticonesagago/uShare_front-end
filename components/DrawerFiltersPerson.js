import React , {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Block, Text, Button} from 'expo-ui-kit';

import Icon from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';
import { DrawerItem, createDrawerNavigator, DrawerContentScrollView} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Animated from 'react-native-reanimated';

//import the screens
import Perfil from './Perfil.js';
import Actes from './Actes.js';
import ListPerfilSmall from './ListPerfilSmall.js';
import ListActesSmall from './ListActesSmall.js';
import FilterOptionsPerson from './FilterOptionsPerson.js';
import FilterOptions from './FilterOptions.js';

import * as globalHelper from './Auxiliars/GlobalHelper.js'



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const Screens = ({navigation}) => {
  return(
  <Stack.Navigator screenOptions={{
    headerTransparent: true,
    headerTitle: null,
    headerRight: () => (
      <Button
        padding
        transparent
        marginHorizontal
        onPress={() => navigation.openDrawer()}
      >
        <Icon name={'md-options'} size={28} color={'#41444B'}/>
      </Button>
    )
  }}>
    <Stack.Screen name={globalHelper.ListPerfilScreenID} component={ListPerfilSmall}/>
  </Stack.Navigator>
  );
}

const DrawerContent = props => {
  return(
    <DrawerContentScrollView {...props}>
      <Block>
        <Block>
          <FilterOptionsPerson/>
        </Block>
      </Block>
    </DrawerContentScrollView>
  );
};





export default () => {
  const [progress, setProgres] = React.useState(new Animated.Value(0));

  var globalDrawerData = [];

  function getData() {

  }

  return(
    <Drawer.Navigator
      //initialRouteName="ListPerfilSmall"
      drawerPosition='right'
      drawerContent={props => {
        setProgres(props.progress);
        return <DrawerContent {...props}/>;
      }}
    >
        <Drawer.Screen name="Screens" component={Screens}/>
    </Drawer.Navigator>
  );
};
