import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { ItemValue } from '@react-native-community/picker/typings/Picker';
import { yearDataRange } from '../../shared/utils/yearRange';

interface Props {
  movieYear: number;
  setMovieYear: (item: number) => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 5,
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  picker: {
    width: 150,
  },
});

const YearPicker: React.FC<Props> = ({ movieYear, setMovieYear }) => {
  const handleValueChange = (item: ItemValue) => {
    setMovieYear(Number(item));
  };
  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={String(movieYear)}
        onValueChange={handleValueChange}>
        {yearDataRange().map(item => {
          return (
            <Picker.Item
              key={item.value.toString()}
              label={item.label.toString()}
              value={item.value.toString()}
            />
          );
        })}
      </Picker>
    </View>
  );
};

export default YearPicker;
