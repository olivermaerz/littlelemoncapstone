import {StyleSheet} from 'react-native';
import colors from './colors';

/**
 * App wide styles for forms (input fields, buttons, etc.)
 * @type {{button: {marginRight: number, backgroundColor: string, borderRadius: number, color: string, marginTop: number, marginLeft: number}, input: {padding: number, margin: number, backgroundColor: string, borderColor: string, borderRadius: number, borderWidth: number, height: number}, buttonText: {padding: number, color: string, textAlign: string, fontSize: number, fontWeight: string}, fieldText: {textAlign: string, fontSize: number, fontWeight: string, marginTop: number, marginLeft: number}}}
 */
const formStyles = StyleSheet.create({
  input: {
    fontFamily: 'Karla',
    height: 40,
    padding: 10,
    borderRadius: 16,
    borderWidth: 2,
    backgroundColor: colors.white,
    borderColor: colors.secondary1,
    marginBottom: 8,
  },
  fieldText: {
    fontFamily: 'Karla',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 8,
  },
  button: {
    marginTop: 20,
    // add round corners to the button
    borderRadius: 16,
    backgroundColor: colors.primary1,
    color: colors.white,
  },
  buttonText: {
    fontFamily: 'Karla',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  formError: {
    color: colors.error,
    fontSize: 12,
    fontWeight: 'normal',
    marginTop: 0,
  },
  checkBox: {
    alignSelf: 'left',
  },
  checkBoxText: {
    fontSize: 16,
    fontFamily: 'Karla',
    marginLeft: 10,
  },
});

/**
 * Get the style for the button based on the pressed state
 * @param pressed
 * @param style
 * @returns {*|(*&{backgroundColor: string})}
 */
const getButtonStyle = (pressed, style) => {
  if (pressed) {
    return {
      ...style,
      backgroundColor: colors.primary2,
    };
  }
  return style;
}

export default formStyles;
export {getButtonStyle};


