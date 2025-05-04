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

const ChangePassword = ({ navigation }) => {
  const [selectedNav, setSelectedNav] = useState("Settings"); // Settings active by default
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

  // Reset selectedNav to "Settings" when the screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelectedNav("Settings"); // Ensure Settings is active when returning
    });

    return unsubscribe;
  }, [navigation]);

  // Validation function
  const validateForm = () => {
    let newErrors = { oldPassword: '', newPassword: '', confirmPassword: '' };
    let isValid = true;

    if (!oldPassword.trim()) {
      newErrors.oldPassword = 'Please enter the old password.';
      isValid = false;
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = 'Please enter the new password.';
      isValid = false;
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters.';
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm the new password.';
      isValid = false;
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handler for Save button
  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    // Placeholder for actual password change logic (e.g., API call)
    Alert.alert("Success", "Password change request submitted. (Placeholder)");
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
            <Text style={styles.title}>CHANGE PASSWORD</Text>
          </View>

          {/* Old Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Old Password</Text>
            <View style={[styles.inputWrapper, errors.oldPassword && styles.inputError]}>
              <MaterialIcons
                name="lock"
                size={width * 0.05}
                color={Colors.textInput}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Enter old password"
                value={oldPassword}
                onChangeText={(text) => {
                  setOldPassword(text);
                  if (errors.oldPassword) setErrors({ ...errors, oldPassword: '' });
                }}
                style={[styles.textInput, { color: oldPassword ? Colors.Accent : Colors.textInput }]}
                placeholderTextColor={Colors.textInput}
                secureTextEntry={!showOldPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowOldPassword(!showOldPassword)}
                style={styles.eyeIcon}
              >
                <MaterialIcons
                  name={showOldPassword ? "visibility" : "visibility-off"}
                  size={width * 0.05}
                  color={Colors.textInput}
                />
              </TouchableOpacity>
              {errors.oldPassword && (
                <MaterialIcons
                  name="error"
                  size={width * 0.05}
                  color={Colors.error}
                  style={styles.errorIcon}
                />
              )}
            </View>
            {errors.oldPassword && (
              <Text style={styles.errorText}>{errors.oldPassword}</Text>
            )}
          </View>

          {/* New Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>New Password</Text>
            <View style={[styles.inputWrapper, errors.newPassword && styles.inputError]}>
              <MaterialIcons
                name="lock"
                size={width * 0.05}
                color={Colors.textInput}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Enter new password"
                value={newPassword}
                onChangeText={(text) => {
                  setNewPassword(text);
                  if (errors.newPassword) setErrors({ ...errors, newPassword: '' });
                }}
                style={[styles.textInput, { color: newPassword ? Colors.Accent : Colors.textInput }]}
                placeholderTextColor={Colors.textInput}
                secureTextEntry={!showNewPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
                style={styles.eyeIcon}
              >
                <MaterialIcons
                  name={showNewPassword ? "visibility" : "visibility-off"}
                  size={width * 0.05}
                  color={Colors.textInput}
                />
              </TouchableOpacity>
              {errors.newPassword && (
                <MaterialIcons
                  name="error"
                  size={width * 0.05}
                  color={Colors.error}
                  style={styles.errorIcon}
                />
              )}
            </View>
            {errors.newPassword && (
              <Text style={styles.errorText}>{errors.newPassword}</Text>
            )}
          </View>

          {/* Confirm New Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm New Password</Text>
            <View style={[styles.inputWrapper, errors.confirmPassword && styles.inputError]}>
              <MaterialIcons
                name="lock"
                size={width * 0.05}
                color={Colors.textInput}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Confirm new password"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                }}
                style={[styles.textInput, { color: confirmPassword ? Colors.Accent : Colors.textInput }]}
                placeholderTextColor={Colors.textInput}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIcon}
              >
                <MaterialIcons
                  name={showConfirmPassword ? "visibility" : "visibility-off"}
                  size={width * 0.05}
                  color={Colors.textInput}
                />
              </TouchableOpacity>
              {errors.confirmPassword && (
                <MaterialIcons
                  name="error"
                  size={width * 0.05}
                  color={Colors.error}
                  style={styles.errorIcon}
                />
              )}
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>

          {/* Save Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>SAVE</Text>
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

export default ChangePassword;

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
  saveButton: {
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
  saveButtonText: {
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