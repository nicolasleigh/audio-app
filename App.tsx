import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import SignUp from './src/views/auth/SignUp';
import SignIn from './src/views/auth/SignIn';
import LostPassword from './src/views/auth/LostPassword';
import Verification from './src/views/auth/Verification';

export default function App() {
  // return <SignUp />;
  // return <SignIn />;
  // return <LostPassword />;
  return <Verification />;
}

const styles = StyleSheet.create({
  container: {},
});
