import React, { useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import { StatusBar } from 'react-native';

import bootstrap from './src/bootstrap';
import { COLORS } from './src/shared/constants/colors';
import Navigator from './src/navigation/Navigator';
import config from './src/shared/config';
// STORE
import { ActionTypes } from './src/store/settings/actions';
import { ActionTypes as userActionTypes } from './src/store/user/actions';

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
      dispatch({ type: userActionTypes.LOAD_USER });
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
