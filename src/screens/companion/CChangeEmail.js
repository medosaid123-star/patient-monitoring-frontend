import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontLoader from '../../components/FontLoader';
import { Colors } from '../../styles/colors';

const { width, height } = Dimensions.get("window");

const CChangeEmail = ({ navigation, route }) => {
  const [selectedNav, setSelectedNav] = useState("Settings"); // Settings active by default
  const [oldEmail, setOldEmail] = useState(route.params?.currentEmail || '');
  const [newEmail, setNewEmail] = useState('');
  const [errors, setErrors] = useState({ oldEmail: '', newEmail: '' });

  // Reset selectedNav to "Settings" when the screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelectedNav("Settings"); // Ensure Settings is active when returning
    });

    return unsubscribe;
  }, [navigation]);

  // Validation function
  const validateForm = () => {
    let newErrors = { oldEmail: '', newEmail: '' };
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!oldEmail.trim()) {
      newErrors.oldEmail = 'Please enter the old email.';
      isValid = false;
    } else if (!emailRegex.test(oldEmail.trim())) {
      newErrors.oldEmail = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!newEmail.trim()) {
      newErrors.newEmail = 'Please enter the new email.';
      isValid = false;
    } else if (!emailRegex.test(newEmail.trim())) {
      newErrors.newEmail = 'Please enter a valid email address.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handler for Request button
  const handleRequest = () => {
    if (!validateForm()) {
      return;
    }
    // Placeholder for actual email change logic (e.g., API call)
    Alert.alert("Success", "Email change request submitted. (Placeholder)");
    // Optionally navigate back to CPrivacy
    // navigation.goBack();
  };

  return (
    <FontLoader>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons
                name="arrow-back-ios"
                size={width * 0.06}
                color={Colors.lightText}
              />
            </TouchableOpacity>
            <Text style={styles.title}>CHANGE EMAIL</Text>
          </View>

          {/* Old Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Old Email</Text>
            <View style={[styles.inputWrapper, errors.oldEmail && styles.inputError]}>
              <MaterialIcons
                name="email"
                size={width * 0.05}
                color={Colors.textInput}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Enter old email"
                value={oldEmail}
                onChangeText={(text) => {
                  setOldEmail(text);
                  if (errors.oldEmail) setErrors({ ...errors, oldEmail: '' });
                }}
                style={[styles.textInput, { color: oldEmail ? Colors.Accent : Colors.textInput }]}
                placeholderTextColor={Colors.textInput}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.oldEmail && (
                <MaterialIcons
                  name="error"
                  size={width * 0.05}
                  color={Colors.error}
                  style={styles.errorIcon}
                />
              )}
            </View>
            {errors.oldEmail && (
              <Text style={styles.errorText}>{errors.oldEmail}</Text>
            )}
          </View>

          {/* New Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>New Email</Text>
            <View style={[styles.inputWrapper, errors.newEmail && styles.inputError]}>
              <MaterialIcons
                name="email"
                size={width * 0.05}
                color={Colors.textInput}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Enter new email"
                value={newEmail}
                onChangeText={(text) => {
                  setNewEmail(text);
                  if (errors.newEmail) setErrors({ ...errors, newEmail: '' });
                }}
                style={[styles.textInput, { color: newEmail ? Colors.Accent : Colors.textInput }]}
                placeholderTextColor={Colors.textInput}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.newEmail && (
                <MaterialIcons
                  name="error"
                  size={width * 0.05}
                  color={Colors.error}
                  style={styles.errorIcon}
                />
              )}
            </View>
            {errors.newEmail && (
              <Text style={styles.errorText}>{errors.newEmail}</Text>
            )}
          </View>

          {/* Request Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.requestButton}
              onPress={handleRequest}
              activeOpacity={0.8}
            >
              <Text style={styles.requestButtonText}>REQUEST</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNavBar}>
          <View style={styles.navWrapper}>
            <TouchableOpacity
              style={[
                styles.navButton,
                selectedNav === "Home" && styles.activeNavButton,
              ]}
              onPress={() => {
                setSelectedNav("Home");
                navigation.navigate('Home', { role: 'companion' });
              }}
            >
              <MaterialIcons
                name="home"
                size={width * 0.06}
                color={selectedNav === "Home" ? Colors.white : Colors.Accent}
                style={styles.navIcon}
              />
              <Text
                style={[
                  styles.navText,
                  selectedNav === "Home" && styles.activeNavText,
                ]}
              >
                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.navButton,
                selectedNav === "Medicine" && styles.activeNavButton,
              ]}
              onPress={() => {
                setSelectedNav("Medicine");
                navigation.navigate('CMedicineReminder');
              }}
            >
              <MaterialCommunityIcons
                name="pill"
                size={width * 0.06}
                color={selectedNav === "Medicine" ? Colors.white : Colors.Accent}
                style={styles.navIcon}
              />
              <Text
                style={[
                  styles.navText,
                  selectedNav === "Medicine" && styles.activeNavText,
                ]}
              >
                Medicine
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.navButton,
                selectedNav === "Account" && styles.activeNavButton,
              ]}
              onPress={() => {
                setSelectedNav("Account");
                navigation.navigate('CProfile');
              }}
            >
              <MaterialIcons
                name="person"
                size={width * 0.06}
                color={selectedNav === "Account" ? Colors.white : Colors.Accent}
                style={styles.navIcon}
              />
              <Text
                style={[
                  styles.navText,
                  selectedNav === "Account" && styles.activeNavText,
                ]}
              >
                Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.navButton,
                selectedNav === "Settings" && styles.activeNavButton,
              ]}
              onPress={() => {
                setSelectedNav("Settings");
                navigation.navigate('CSetting');
              }}
            >
              <MaterialIcons
                name="settings"
                size={width * 0.06}
                color={selectedNav === "Settings" ? Colors.white : Colors.Accent}
                style={styles.navIcon}
              />
              <Text
                style={[
                  styles.navText,
                  selectedNav === "Settings" && styles.activeNavText,
                ]}
              >
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </FontLoader>
  );
};

export default CChangeEmail;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background, // #0C3C63
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.background, // #0C3C63
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: height * 0.15, // Space for bottom nav bar
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.08,
    marginBottom: height * 0.04,
    marginLeft: width * 0.05,
  },
  backButton: {
    marginRight: width * 0.03,
  },
  title: {
    color: Colors.lightText, // #D9E6F2
    fontSize: width * 0.05,
    fontFamily: 'Inter-Bold',
  },
  inputContainer: {
    marginBottom: height * 0.04,
    marginHorizontal: width * 0.05,
  },
  inputLabel: {
    color: Colors.Text, // #F1F8FE
    fontSize: width * 0.04,
    fontFamily: 'Inter-Bold',
    marginBottom: height * 0.005,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.navBackground, // #F3F4F6
    borderColor: Colors.transparent, // #00000000
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
  },
  inputIcon: {
    marginRight: width * 0.02,
  },
  textInput: {
    fontSize: width * 0.04,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  inputError: {
    borderColor: Colors.error, // #FF4D4D
    borderWidth: 1.5,
  },
  errorIcon: {
    marginLeft: width * 0.02,
  },
  errorText: {
    color: Colors.error, // #FF4D4D
    fontSize: width * 0.035,
    fontFamily: 'Inter-Regular',
    marginTop: height * 0.005,
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: height * 0.07,
  },
  requestButton: {
    bottom: height * 0.03,
    backgroundColor: Colors.Accent, // #126591
    borderRadius: 16,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.15,
    shadowColor: Colors.shadow, // #171A1F
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 17,
    elevation: 10,
  },
  requestButtonText: {
    color: Colors.white, // #FFFFFF
    fontSize: Math.min(width * 0.05, 18),
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width,
    alignItems: 'center',
    backgroundColor: Colors.navBackground, // #F3F4F6
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.015,
    shadowColor: Colors.shadow, // #171A1F
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1,
    elevation: 1,
  },
  navWrapper: {
    flexDirection: 'row',
    backgroundColor: Colors.navBackground, // #F3F4F6
    borderRadius: 6,
    padding: width * 0.005,
    width: width * 0.9,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeNavButton: {
    backgroundColor: Colors.Accent, // #126591
  },
  navIcon: {
    width: width * 0.06,
    height: width * 0.06,
    marginBottom: height * 0.005,
  },
  navText: {
    color: Colors.Accent, // #126591
    fontSize: width * 0.025,
    fontFamily: 'Inter_700Bold',
  },
  activeNavText: {
    color: Colors.white, // #FFFFFF
    fontFamily: 'Inter_700Bold',
  },
});