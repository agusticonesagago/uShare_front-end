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




const DrawerContent = (props) => {
  return(
    <DrawerContentScrollView {...props} >
        <Block>
          <FilterOptionsPerson {...props}/>
        </Block>
    </DrawerContentScrollView>
  );
};





export default () => {

    var state = {
      globalDrawerData: []
    }

    function getData() {
        return state.globalDrawerData;
    }

    function setData(newData) {
        state.globalDrawerData = newData;
        console.log("\n\n---------------------------------------------\n\n")
    }


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
                <Stack.Screen name={globalHelper.ListPerfilScreenID} component={ListPerfilSmall} />
            </Stack.Navigator>
        );
    }

    const [progress, setProgres] = React.useState(new Animated.Value(0));
    return(
    <Drawer.Navigator
      //initialRouteName="ListPerfilSmall"
      drawerPosition='right'
      drawerContent={props => {
        setProgres(props.progress);
        return <DrawerContent {...props} setData={setData} />;
      }}
    >
        <Drawer.Screen name="Screens" component={Screens}  />
    </Drawer.Navigator>
  );
};
