import { StyleSheet } from 'react-native';
import { COLORS } from '../../shared/constants/colors';
import { THEMES } from '../../shared/constants/themes';

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
  wrappError: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 10,
    zIndex: 2000,
  },
  keyboarAvoid: { marginTop: THEMES.HEADER_SIZE },
});

export default styles;
