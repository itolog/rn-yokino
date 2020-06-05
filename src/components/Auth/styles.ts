import { StyleSheet } from 'react-native';
import { COLORS } from '../../shared/constants/colors';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '80%',
    padding: 10,
    backgroundColor: COLORS.teal,
    borderRadius: 10,
    elevation: 4,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
  },
  loginTitle: {
    color: 'white',
  },
  form: {
    width: '100%',
    minHeight: 150,
    justifyContent: 'space-around',
  },
  inputWrapp: {
    height: 20,
  },
  messageInput: {
    color: '#fff',
  },
});

export default styles;
