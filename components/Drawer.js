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

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Screens = ({navigation}) => {
  return(
  <Stack.Navigator screenOptions={{
    headerTransparent: true,
    headerTitle: null,
    headerLeft: () => (
      <Button
        padding
        transparent
        marginHorizontal
        onPress={() => navigation.openDrawer()}
      >
        <Icon name={'md-menu'} size={28} color={'#41444B'}/>
      </Button>
    )
  }}>
    <Stack.Screen name="Perfil" component={Perfil}/>
    <Stack.Screen name="Actes" component={Actes}/>
  </Stack.Navigator>
  );
}

const DrawerContent = props => {
  return(
    <DrawerContentScrollView {...props}>
      <Block>
        <Block flex={0.4} margin={20} bottom>
          <Image
            source={require("../img/logorodo.png")}
            style={{width: 60, height: 60, borderRadius:30,  marginBottom:20, marginTop:20}}
            resizeMode="center"
          />
          <Text title>Confederació Sardanista</Text>
          <Text title>de Catalunya</Text>
        </Block>
        <Block>
          <DrawerItem
            label="Perfil"
            labelStyle={{marginLeft: -16}}
            onPress={() => props.navigation.navigate("Perfil")}
            icon={() => <Icon name={'md-person'} size={28}/>}
          />
          <DrawerItem
            label="Actes"
            labelStyle={{marginLeft: -16}}
            onPress={() => props.navigation.navigate("Actes")}
            icon={() => <Icon name={'md-calendar'} size={28}/>}
          />
        </Block>
      </Block>
    </DrawerContentScrollView>
  );
};

export default () => {
  const [progress, setProgres] = React.useState(new Animated.Value(0));
  return(
    <Drawer.Navigator
      initialRouteName="Perfil"
      drawerContent={props => {
        setProgres(props.progress);
        return <DrawerContent {...props} />;
      }}
    >
        <Drawer.Screen name="Screens" component={Screens}/>
    </Drawer.Navigator>
  );
};
