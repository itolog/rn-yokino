import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
  },
  errorText: {
    color: '#fffafa',
    backgroundColor: '#b22222',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sendBtn: {
    justifyContent: 'space-around',
    backgroundColor: '#8b0000',
  },
  backDrop: {
    backgroundColor: 'rgba(255, 255, 255, .5)',
  },
  overLay: {
    backgroundColor: '#808080',
  },
});

export default styles;
