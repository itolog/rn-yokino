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
    flex: 2,
    width: 300,
    height: 260,
  },
  serialsDetails: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#d2b48c',
  },
  wrappImg: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
  },
  raitWrapp: {
    flex: 1,
  },
  raitTextImdb: {
    textAlign: 'center',
    color: 'green',
  },
  raitTextKp: {
    textAlign: 'center',
    color: 'orange',
  },
  header: {
    backgroundColor: COLORS.MAIN_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quality: {
    color: '#01D277',
  },
  year: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#01D277',
  },
});

export default styles;
