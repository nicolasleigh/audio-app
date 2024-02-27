import React from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import colors from '../../utils/colors';

export default function SignUp() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="John Doe"
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          style={styles.input}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="john@email.com"
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          style={styles.input}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="********"
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          style={styles.input}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    height: 45,
    borderRadius: 25,
    color: colors.CONTRAST,
    padding: 10,
  },
  label: {
    color: colors.CONTRAST,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
});
