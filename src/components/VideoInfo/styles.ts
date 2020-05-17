import { StyleSheet } from 'react-native';
import { COLORS } from '../../shared/constants/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  section: {
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
    padding: 2,
  },
  sectionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  sectionRait: {
    width: 150,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  sectionRaitContent: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
  },
  raitKp: {
    color: 'green',
  },
  raitImdb: {
    color: 'orange',
  },
  sectionTitle: {
    backgroundColor: 'white',
    color: 'black',
    padding: 5,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  oneLineSection: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  raitSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 70,
  },
  sectionTitleOneLine: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  placeholder: {
    backgroundColor: COLORS.MAIN_COLOR,
  },
  img: { width: '100%', height: 250 },
  favorites: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginRight: 20,
  },
});

export default styles;
