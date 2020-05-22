import { StyleSheet, Dimensions } from 'react-native';
import { THEMES } from '../../shared/constants/themes';

const button = {
  backgroundColor: THEMES.PREFERENCE_BG,
  borderRadius: 20,
  padding: 10,
  elevation: 2,
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: Dimensions.get('window').width - 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    ...button,
  },
  closeBtn: {
    ...button,
    alignSelf: 'flex-end',
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  sendButton: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    minHeight: 150,
    justifyContent: 'space-around',
  },
});

export default styles;
