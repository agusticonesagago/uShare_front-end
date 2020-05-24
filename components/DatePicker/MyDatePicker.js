import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import DatePicker from 'react-native-datepicker';
import {bind} from "lodash";




export default class MyDatePicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date:""
    }

    //bind(props.onChangeState)
  }

  onChangeState = (key, val) => {
    this.setState({ [key]: val })
  };

// text "Entre el "
  // key
  // placeholder
  render() {
    let key = this.props.dateKey;
    return (
      <View style={styles.container}>
              <View style={styles.containerAgenda}>
                <Text style={styles.titleBetweenAgenda}>{this.props.text}</Text>
                <DatePicker
                  style={{
                    //width: 190,
                    width: "70%",
                  }}
                  date={this.state.date}
                  mode="date"
                  placeholder={this.props.placeholder}
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateInput: {
                      marginLeft: 5,
                    }
                  }}
                  onDateChange={(value) => {
                    this.props.onChangeState(key,value);
                    this.onChangeState("date", value);
                  }}
                />
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
  },
  containerAgenda:{
    flex:1,
    flexDirection:'row',
    marginTop:10,
  },
  titleBetweenAgenda:{
    fontSize:18,
    paddingTop:7,
  },

});
