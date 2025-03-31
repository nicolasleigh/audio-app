import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

interface Props {
  children: React.ReactNode;
}

export default function AppContainer({children}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      {/* <AppNotification /> */}
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
