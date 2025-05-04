import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Colors } from '../../styles/colors';

const { width, height } = Dimensions.get("window");

export default function PAddContact({ navigation }) {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  const [email, setEmail] = useState('');
  const [relation, setRelation] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    relation: '',
  });

  if (!fontsLoaded) {
    return null;
  }

  const validateForm = () => {
    let newErrors = { email: '', relation: '' };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = 'Please enter an email.';
      isValid = false;
    }

    if (!relation.trim()) {
      newErrors.relation = 'Please enter a relationship.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    navigation.navigate('Patients', {
      newContact: {
        id: String(Date.now()),
        name: email.split('@')[0], // Extract name from email for simplicity
        relation,
        email,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back-ios"
              size={width * 0.06}
              color={Colors.lightText}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.header}>Add Emergency Contact</Text>
        </View>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[Colors.transparent, Colors.shadowGradient]}
          style={styles.formGradient}
        >
          <View style={styles.formContainer}>
            <MaterialIcons
              name="person"
              size={width * 0.3}
              color={Colors.Accent}
              style={styles.profileIcon}
            />
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Companion Email</Text>
              <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                <MaterialIcons
                  name="email"
                  size={width * 0.05}
                  color={Colors.textInput}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Enter Email"
                  placeholderTextColor={Colors.textInput}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  style={[styles.input, { color: email ? Colors.Accent : Colors.textInput }]}
                  keyboardType="email-address"
                />
                {errors.email && (
                  <MaterialIcons
                    name="error"
                    size={width * 0.05}
                    color={Colors.error}
                    style={styles.errorIcon}
                  />
                )}
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Relationship</Text>
              <View style={[styles.inputWrapper, errors.relation && styles.inputError]}>
                <MaterialIcons
                  name="group"
                  size={width * 0.05}
                  color={Colors.textInput}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Enter Relationship"
                  placeholderTextColor={Colors.textInput}
                  value={relation}
                  onChangeText={(text) => {
                    setRelation(text);
                    if (errors.relation) setErrors({ ...errors, relation: '' });
                  }}
                  style={[styles.input, { color: relation ? Colors.Accent : Colors.textInput }]}
                />
                {errors.relation && (
                  <MaterialIcons
                    name="error"
                    size={width * 0.05}
                    color={Colors.error}
                    style={styles.errorIcon}
                  />
                )}
              </View>
            </View>
          </View>
        </LinearGradient>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Request</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNavBar}>
        <View style={styles.navWrapper}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Home', { role: 'companion' })}
          >
            <MaterialIcons
              name="home"
              size={width * 0.06}
              color="#126591"
              style={styles.navIcon}
            />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('CMedicineReminder')}
          >
            <MaterialCommunityIcons
              name="pill"
              size={width * 0.06}
              color="#126591"
              style={styles.navIcon}
            />
            <Text style={styles.navText}>Medicine</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('CProfile')}
          >
            <MaterialIcons
              name="person"
              size={width * 0.06}
              color="#126591"
              style={styles.navIcon}
            />
            <Text style={styles.navText}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('CSetting')}
          >
            <MaterialIcons
              name="settings"
              size={width * 0.06}
              color="#126591"
              style={styles.navIcon}
            />
            <Text style={styles.navText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background, // Matches the main background
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollViewContent: {
    paddingBottom: height * 0.1, // Adjusted padding to avoid overlap with bottom nav
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.05,
    marginBottom: height * 0.01,
    marginLeft: width * 0.03,
  },
  backIcon: {
    marginRight: width * 0.03,
  },
  header: {
    color: Colors.Text,
    fontSize: width * 0.06,
    fontFamily: 'Inter_700Bold',
  },
  formGradient: {
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.01,
    marginBottom: height * 0.03,
  },
  formContainer: {
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.05,
  },
  profileIcon: {
    marginTop: height * 0.05,
    marginBottom: height * 0.05,
  },
  inputContainer: {
    width: "100%",
    marginBottom: height * 0.03,
  },
  label: {
    color: Colors.Text,
    fontSize: width * 0.04,
    fontFamily: 'Inter_700Bold',
    marginBottom: height * 0.005,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.navBackground,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: width * 0.015,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
  },
  inputIcon: {
    marginRight: width * 0.02,
  },
  input: {
    flex: 1,
    fontSize: width * 0.04,
    fontFamily: 'Inter_400Regular',
  },
  inputError: {
    borderColor: Colors.error,
    borderWidth: 1.5,
  },
  errorIcon: {
    marginLeft: width * 0.02,
  },
  saveButton: {
    backgroundColor: Colors.Accent,
    borderRadius: width * 0.04,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.12,
    shadowColor: "#171A1F26",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 17,
    elevation: 17,
    marginTop: height * 0.03,
    marginBottom: height * 0.03,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: Colors.lightText,
    fontSize: width * 0.045,
    fontFamily: 'Inter_700Bold',
    textAlign: "center",
  },
  bottomNavBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width,
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.015,
    shadowColor: "#171A1F12",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1,
    elevation: 1,
  },
  navWrapper: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
    padding: width * 0.005,
    width: width * 0.9,
  },
  navButton: {
    flex: 1,
    alignItems: "center",
    borderRadius: 6,
  },
  activeNavButton: {
    backgroundColor: "#126591",
  },
  navIcon: {
    width: width * 0.06,
    height: width * 0.06,
    marginBottom: height * 0.005,
  },
  navText: {
    color: "#126591",
    fontSize: width * 0.025,
    fontFamily: 'Inter_700Bold',
  },
  activeNavText: {
    color: "#F9F9F9",
    fontFamily: 'Inter_700Bold',
  },
});