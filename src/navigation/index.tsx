import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAuthState,
  updateBusy,
  updateLoggedIn,
  updateProfile,
} from '../store/auth';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import {Keys, getFromAsyncStorage} from '../utils/asyncStorage';
import client from '../api/client';
import Loader from '../ui/Loader';
import {StyleSheet, View} from 'react-native';
import colors from '../utils/colors';

interface Props {}

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.PRIMARY,
    primary: colors.CONTRAST,
  },
};

export default function AppNavigator({}: Props) {
  const {loggedIn, busy} = useSelector(getAuthState);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuthInfo = async () => {
      dispatch(updateBusy(true));
      try {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        console.log('get token', token);
        if (!token) {
          return dispatch(updateBusy(false));
        }

        const {data} = await client.get('/auth/is-auth', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data?.profile) {
          dispatch(updateProfile(data.profile));
          dispatch(updateLoggedIn(true));
        }
        // console.log('fetchAuthInfo ', data);
      } catch (error) {
        console.log('Auth error ', error.response?.data.error || error);
      }
      dispatch(updateBusy(false));
    };

    fetchAuthInfo();
  }, []);

  return (
    <NavigationContainer theme={AppTheme}>
      {busy ? (
        <View style={styles.loader}>
          <Loader />
        </View>
      ) : null}
      {loggedIn ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loader: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,  // all of these are same as the below
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.OVERLAY,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
