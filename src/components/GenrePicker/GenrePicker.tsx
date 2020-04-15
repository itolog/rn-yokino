import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { ItemValue } from '@react-native-community/picker/typings/Picker';

import genre from './genre.json';

interface Props {
  movieGenre: number;
  setMovieGenre: (item: number) => void;
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

const GenrePicker: React.FC<Props> = ({ movieGenre, setMovieGenre }) => {
  const handleValueChange = (item: ItemValue) => {
    setMovieGenre(Number(item));
  };
  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={String(movieGenre)}
        onValueChange={handleValueChange}>
        {genre.genres.map(item => {
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

export default GenrePicker;
