import { StyleSheet } from 'react-native';
import { COLORS } from '../../shared/constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardStyle: {
    backgroundColor: COLORS.MAIN_COLOR,
  },
  cardBtns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 180,
  },
  cardStyleTitle: {
    color: '#ffa500',
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnSave: {
    backgroundColor: '#6b8e23',
    marginTop: 45,
  },
  save: {
    alignItems: 'center',
  },
});

export default styles;
