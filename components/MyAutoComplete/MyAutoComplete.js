import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';


import Autocomplete from 'react-native-dropdown-autocomplete-textinput';

import {bind} from "lodash";


export default class MyAutoComplete extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption:null,
    }

    bind(this.onChangeState)
  }

  onChangeState = (key, val) => {
    this.setState({ [key]: val })
  };


  render() {
    let key = this.props.autoCompleteKey;
    return <View style={styles.container}>
      <Text style={styles.titleOrder}> {this.props.title}</Text>
      <Autocomplete
          data={this.props.data}
          displayKey="name"
          placeholder={<Text style={styles.titleOrder}>{this.props.placeholder}</Text>}
          placeholderColor={'green'}
          dropDownIconColor={'#714170'}
          onSelect={val => {
            let name = val.name;
            this.onChangeState('selectedOption', name);
            this.props.onChangeState(key, name);
          }}
          maxHeight={500}

      />
    </View>;
  }


}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal:20,
  },

  titleOrder:{
    fontSize:30,
    textAlign: "center"
  },


});
