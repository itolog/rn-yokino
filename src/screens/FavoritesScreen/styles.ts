import { StyleSheet } from 'react-native';
import { COLORS } from '../../shared/constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.MAIN_COLOR,
  },
  flatList: {
    marginBottom: 20,
  },
  btns: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  delete: {
    backgroundColor: '#EB1561',
  },
  see: {
    backgroundColor: '#009688',
  },
  bgImg: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
