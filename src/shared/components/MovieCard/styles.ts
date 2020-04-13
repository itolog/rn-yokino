import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const colorTheme = {
  backgroundColor: COLORS.MAIN_COLOR,
  color: '#01D277',
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 380,
  },
  title: {
    ...colorTheme,
    textAlign: 'center',
    width: '100%',
    padding: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  img: {
    width: 300,
    height: 260,
  },
  year: {
    ...colorTheme,
    width: '100%',
    padding: 2,
    fontWeight: 'bold',
    fontSize: 16,
  },
  serialsDetails: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#d2b48c',
  },
  wrappImg: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
  },
});

export default styles;
