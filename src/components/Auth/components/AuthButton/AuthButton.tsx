import React from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  loading: boolean;
  onSubmit: () => void;
}

const AuthButton: React.FC<Props> = ({ loading, onSubmit }) => {
  return (
    <Button
      disabled={loading}
      onPress={onSubmit}
      type='clear'
      icon={<Icon name='send' size={40} color='white' />}
    />
  );
};

export default AuthButton;
