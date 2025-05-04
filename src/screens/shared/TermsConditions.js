import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TermsConditions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Terms & Conditions Page</Text>
    </View>
  );
};

export default TermsConditions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});
