import React from 'react';
import {StyleSheet, Text, View} from 'react-native';


import CheckBox from '@react-native-community/checkbox';

import {bind} from "lodash";

export default class MyCheckBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked:true
    };
  }

  onChangeState = (key, val) => {
    this.setState({ [key]: val })
  };

  render() {
    let key = this.props.checkBoxKey;
    return (
      <View style={styles.container}>
          <View style={styles.checkBox}>
            <CheckBox
                title={this.props.title}
                value={this.state.checked}
                onValueChange={val => {
                  this.onChangeState('checked', val);
                  this.props.onChangeState(key,val);
                }}
            />
            <Text style={styles.text}>{this.props.title}</Text>
          </View>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    //marginLeft: 20,
    //marginTop: 20,
  },
  checkBox:{
    flexDirection: 'row',
    marginTop:25,
  },
  text:{
    fontSize:22,
    marginLeft:15,
  },

});
