import React, { useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import { StatusBar } from 'react-native';
import bootstrap from './src/bootstrap';

import Navigator from './src/navigation/Navigator';
import config from './src/shared/config';
import { ActionTypes } from './src/store/settings/actions';
import { COLORS } from './src/shared/constants/colors';

enableScreens();

const client = new ApolloClient({
  uri: config.API_ENDPOINT,
  cache: new InMemoryCache(),
});

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    bootstrap().then(() => {
      dispatch({ type: ActionTypes.GET_IMG_PATH });
    });
  }, [dispatch]);

  return (
    <ApolloProvider client={client}>
      <StatusBar barStyle='light-content' backgroundColor={COLORS.MAIN_COLOR} />
      <Navigator />
    </ApolloProvider>
  );
};

export default App;
