import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.MAIN_COLOR,
  },
  bgImg: {
    width: '100%',
    height: '100%',
  },
  headerBtns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    marginTop: 5,
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
  searchBar: { backgroundColor: 'transparent' },
});

export default styles;
