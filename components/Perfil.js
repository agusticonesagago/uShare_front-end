import React , {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class Perfil extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text> PERFIL! </Text>
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
});
