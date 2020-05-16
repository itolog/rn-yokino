import { StyleSheet } from 'react-native';
import { COLORS } from '../../shared/constants/colors';

const styles = StyleSheet.create({
  headerBtns: {
    backgroundColor: COLORS.MAIN_TRANSPARENT,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 7,
    paddingTop: 7,
  },
  buttonsGroup: {
    backgroundColor: COLORS.MAIN_COLOR,
  },
});

export default styles;
