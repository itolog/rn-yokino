import { StyleSheet } from 'react-native';
import { COLORS } from '../../shared/constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.MAIN_COLOR,
  },
  partsContainer: {
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
  },
  partsTitle: {
    fontSize: 18,
    color: '#b9d0db',
  },
  backBtn: {
    backgroundColor: '#ff4500',
  },
});

export default styles;
