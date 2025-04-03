import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import CircleUi from '../ui/CircleUi';
import colors from '../utils/colors';

interface Props {
  heading?: string;
  subHeading?: string;
  children: React.ReactNode;
}

export default function AuthFormContainer({
  heading,
  subHeading,
  children,
}: Props) {
  return (
    <View style={styles.container}>
      {/* <CircleUi position="top-left" size={250} /> */}
      <CircleUi position="top-right" size={300} />
      <CircleUi position="bottom-left" size={180} />
      {/* <CircleUi position="bottom-right" size={150} /> */}

      <View style={styles.headerContainer}>
        <Image style={styles.image} source={require('../assets/logo.webp')} />
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    flex: 1,
  },
  heading: {
    color: colors.BLUE,
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  subHeading: {color: colors.BLUE, fontSize: 16},
  headerContainer: {width: '100%', marginBottom: 10},
  image: {
    width: 270,
    height: 70,
    marginBottom: 10,
  },
});
