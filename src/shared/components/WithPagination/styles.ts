import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { THEMES } from '../../constants/themes';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.MAIN_COLOR,
  },
  bgImg: {
    width: '100%',
    height: '100%',
  },
  noConnect: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  noConnectText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  filter: {
    height: 120,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  searchBar: { backgroundColor: THEMES.PREFERENCE_BG },
});

export default styles;
