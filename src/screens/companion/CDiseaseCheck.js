import React from "react";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView, View, ScrollView, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Colors } from '../../styles/colors';

const { width, height } = Dimensions.get('window');

export default function CPDiseaseCheck({ navigation, route }) {
  const { symptoms = [] } = route.params || {};

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
          <MaterialIcons name="arrow-back-ios" size={width * 0.06} color={Colors.lightText} />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Results</Text>

        {/* Selected Symptoms Card */}
        {symptoms.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Your Selected Symptoms</Text>
            <Text style={styles.symptomsText}>{symptoms.join(", ")}</Text>
          </View>
        )}

        {/* Possible Conditions Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Possible Conditions</Text>
          <Text style={styles.sectionText}>
            These symptoms could indicate several medical conditions, such as:
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>
              <Text style={styles.bullet}>•</Text> <Text style={styles.bold}>Respiratory Infection:</Text>
            </Text>
            <Text style={styles.listSubItem}>
              <Text style={styles.bullet}>  -</Text> Examples: Flu or pneumonia.
            </Text>
            <Text style={styles.listSubItem}>
              <Text style={styles.bullet}>  -</Text> Cough is common, and chest pain may result from inflammation or frequent coughing.
            </Text>

            <Text style={styles.listItem}>
              <Text style={styles.bullet}>•</Text> <Text style={styles.bold}>Heart Issues:</Text>
            </Text>
            <Text style={styles.listSubItem}>
              <Text style={styles.bullet}>  -</Text> Examples: Heart attack or angina.
            </Text>
            <Text style={styles.listSubItem}>
              <Text style={styles.bullet}>  -</Text> Chest pain and dizziness are key signs and could be serious.
            </Text>

            <Text style={styles.listItem}>
              <Text style={styles.bullet}>•</Text> <Text style={styles.bold}>Pulmonary Embolism:</Text>
            </Text>
            <Text style={styles.listSubItem}>
              <Text style={styles.bullet}>  -</Text> A blood clot in the lung can cause sharp chest pain, cough, and breathing difficulties.
            </Text>

            <Text style={styles.listItem}>
              <Text style={styles.bullet}>•</Text> <Text style={styles.bold}>Respiratory Conditions (e.g., Asthma or COPD):</Text>
            </Text>
            <Text style={styles.listSubItem}>
              <Text style={styles.bullet}>  -</Text> If you have a history of breathing issues.
            </Text>

            <Text style={styles.listItem}>
              <Text style={styles.bullet}>•</Text> <Text style={styles.bold}>Gastroesophageal Reflux Disease (GERD):</Text>
            </Text>
            <Text style={styles.listSubItem}>
              <Text style={styles.bullet}>  -</Text> Can sometimes cause chest pain, cough, and dizziness.
            </Text>
          </View>
        </View>

        {/* What Should You Do Now? Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>What Should You Do Now?</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>
              <Text style={styles.bullet}>•</Text> <Text style={styles.bold}>If the symptoms are severe or sudden:</Text>
            </Text>
            <Text style={styles.listSubItem}>
              <Text style={styles.bullet}>  -</Text> Call emergency services immediately or go to the nearest hospital.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bullet}>•</Text> <Text style={styles.bold}>If the symptoms are moderate:</Text>
            </Text>
            <Text style={styles.listSubItem}>
              <Text style={styles.bullet}>  -</Text> Check your blood pressure and oxygen level (if possible) and see a doctor as soon as possible.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
    paddingBottom: height * 0.1,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: height * 0.02,
  },
  title: {
    color: Colors.lightText,
    fontSize: width * 0.08,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginBottom: height * 0.03,
  },
  card: {
    backgroundColor: Colors.navBackground,
    borderRadius: 12,
    padding: width * 0.05,
    marginBottom: height * 0.03,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    color: Colors.Accent,
    fontSize: width * 0.05,
    fontFamily: 'Inter-Bold',
    marginBottom: height * 0.015,
  },
  sectionText: {
    color: Colors.Primary,
    fontSize: width * 0.04,
    fontFamily: 'Inter-Regular',
    lineHeight: height * 0.03,
    marginBottom: height * 0.01,
  },
  symptomsText: {
    color: Colors.Primary,
    fontSize: width * 0.04,
    fontFamily: 'Inter-Regular',
    lineHeight: height * 0.03,
  },
  list: {
    marginLeft: width * 0.05,
  },
  listItem: {
    color: Colors.Primary,
    fontSize: width * 0.04,
    fontFamily: 'Inter-Regular',
    lineHeight: height * 0.03,
    marginBottom: height * 0.01,
  },
  listSubItem: {
    color: Colors.Accent,
    fontSize: width * 0.038,
    fontFamily: 'Inter-Regular',
    lineHeight: height * 0.03,
    marginBottom: height * 0.005,
    marginLeft: width * 0.05,
  },
  bullet: {
    color: Colors.Accent,
    fontSize: width * 0.04,
  },
  bold: {
    fontFamily: 'Inter-Bold',
  },
});
