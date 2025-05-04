import React from "react";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView, View, ScrollView, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Colors } from '../../styles/colors';

const { width } = Dimensions.get('window');

export default function InfoScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          accessibilityLabel="Go back"
          accessibilityHint="Navigates to the previous screen"
        >
          <MaterialIcons name="arrow-back-ios" size={width * 0.06} color={Colors.Text} />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.text2}>PressureGuard</Text>

        {/* Info Text */}
        <Text style={styles.text3}>
          {"PressureGuard is a smart healthcare app designed to support patients with high blood pressure and provide reassurance to their loved ones. The app sends real-time alerts to emergency contacts when critical blood pressure levels are detected, ensuring quick response during emergencies.\n\nIt also helps patients track their medication schedules with reminders and dosage logs, ensuring they stay consistent with their treatment. If urgent care is needed, HealthConnect can locate the nearest hospitals, clinics, or doctors, offering directions and contact details. Additionally, the app includes a video calling feature for quick communication with emergency contacts and a symptom checker to provide insights into potential health conditions.\n\nBy combining monitoring, communication, and proactive care tools, PressureGuard ensures patients and their families are always connected and prepared."}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Primary,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: Colors.Primary,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  text2: {
    color: Colors.Text,
    fontSize: 38,
    fontFamily: 'Archivo-Medium',
    textAlign: "center",
    marginBottom: 24,
  },
  text3: {
    color: Colors.Text,
    fontSize: 16,
    fontFamily: 'Archivo-Regular',
    textAlign: "center",
    marginHorizontal: 10,
    lineHeight: 24,
  },
});