import React from 'react';
import {BaseToast, ErrorToast, InfoToast} from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, View} from 'react-native';

const errorIcon = () => {
  return (
    <View style={styles.icon}>
      <MaterialCommunityIcons name="alert-circle" size={20} color={'white'} />
    </View>
  );
};

const successIcon = () => {
  return (
    <View style={styles.icon}>
      <MaterialCommunityIcons name="check-circle" size={20} color={'white'} />
    </View>
  );
};

const infoIcon = () => {
  return (
    <View style={styles.icon}>
      <MaterialCommunityIcons
        name="information-outline"
        size={20}
        color={'white'}
      />
    </View>
  );
};

export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'seagreen',
        backgroundColor: 'seagreen',
        paddingHorizontal: 5,
      }}
      contentContainerStyle={{paddingHorizontal: 10}}
      renderLeadingIcon={successIcon}
      text1Style={{
        fontSize: 15,
        fontWeight: 500,
        color: 'white',
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: props => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: 'tomato',
        borderLeftColor: 'tomato',
        paddingHorizontal: 5,
      }}
      contentContainerStyle={{paddingHorizontal: 10}}
      renderLeadingIcon={errorIcon}
      text1Style={{
        fontSize: 15,
        fontWeight: 500,
        color: 'white',
      }}
    />
  ),

  info: props => (
    <InfoToast
      {...props}
      style={{
        backgroundColor: 'royalblue',
        borderLeftColor: 'royalblue',
        paddingHorizontal: 5,
      }}
      contentContainerStyle={{paddingHorizontal: 10}}
      renderLeadingIcon={infoIcon}
      text1Style={{
        fontSize: 15,
        fontWeight: 500,
        color: 'white',
      }}
    />
  ),
};

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
