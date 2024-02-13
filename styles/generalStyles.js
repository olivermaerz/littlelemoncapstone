import {StyleSheet} from 'react-native';
import colors from './colors';
import * as Font from 'expo-font';
import {useEffect, useState} from 'react';

/**
 * General styles used in the app
 * @returns {{container: {backgroundColor: string, fontFamily: string, alignItems: string, flex: number, adding: number, justifyContent: string}, text: {fontFamily: string, color: string, fontSize: number}}}
 */
const generalStyles = StyleSheet.create({
  container: {
    fontFamily: 'Karla',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: colors.highlight1,
  },
  text: {
    fontFamily: 'Karla',
    color: 'black',
    fontSize: 20,
  },
});

export default generalStyles;
