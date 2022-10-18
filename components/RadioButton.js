import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function RadioButton({ isChecked, text, onRadioButtonPress }) {
  const _renderCheckedView = () => {
    return isChecked ? (
      <View style={[styles.radioButtonIconInnerIcon]} />
    ) : null;
  };

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onRadioButtonPress}>
      <View style={[styles.radioButtonIcon]}>{_renderCheckedView()}</View>
      <View style={[styles.radioButtonTextContainer]}>
        <Text style={styles.radioButtonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 30,
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 10,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 30,
    borderWidth: 0.5,
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10
  },
  radioButtonIcon: {
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "red",
    height: 20,
    width: 20,
    borderRadius: 30 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonIconInnerIcon: {
    height: 15,
    width: 15,
    backgroundColor: "red",
    borderRadius: 25 / 2,
    borderWidth: 3,
    borderColor: "white",
  },
  radioButtonTextContainer: {
    height: 20,
    justifyContent: "center",
    paddingLeft: 20,
  },
  radioButtonText: {
    fontSize: 15,
    color: 'black'
  },
});