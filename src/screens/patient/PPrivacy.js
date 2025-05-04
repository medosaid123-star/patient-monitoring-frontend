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
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontLoader from '../../components/FontLoader';
import { Colors } from '../../styles/colors';

const { width, height } = Dimensions.get("window");

const PPrivacy = ({ navigation }) => {
  const [selectedNav, setSelectedNav] = useState("PSettings"); // PSettings active by default
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Reset selectedNav to "PSettings" when the screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelectedNav("PSettings"); // Ensure PSettings is active when returning
    });

    return unsubscribe;
  }, [navigation]);

  // Handlers for interactive elements
  const handlePChangeEmail = () => {
    navigation.navigate('PChangeEmail');
  };

  const handlePChangePassword = () => {
    navigation.navigate('PChangePassword');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
            <Text style={styles.title}>PPrivacy</Text>
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons
                name="email"
                size={width * 0.05}
                color={Colors.textInput}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Enter email"
                value={email}
                onChangeText={setEmail}
                style={styles.textInput}
                placeholderTextColor={Colors.textInput}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TouchableOpacity
              style={styles.inputWrapper}
              activeOpacity={1}
            >
              <MaterialIcons
                name="lock"
                size={width * 0.05}
                color={Colors.textInput}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                style={styles.textInput}
                placeholderTextColor={Colors.textInput}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={toggleShowPassword}
                style={styles.eyeIcon}
              >
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={width * 0.05}
                  color={Colors.textInput}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          {/* Change Email */}
          <TouchableOpacity
            style={styles.PSettingItem}
            onPress={handlePChangeEmail}
            activeOpacity={0.8}
          >
            <Text style={styles.PSettingLabel}>Change Email</Text>
            <MaterialIcons
              name="chevron-right"
              size={width * 0.06}
              color={Colors.white}
            />
          </TouchableOpacity>

          {/* Change Password */}
          <TouchableOpacity
            style={styles.PSettingItem}
            onPress={handlePChangePassword}
            activeOpacity={0.8}
          >
            <Text style={styles.PSettingLabel}>Change Password</Text>
            <MaterialIcons
              name="chevron-right"
              size={width * 0.06}
              color={Colors.white}
            />
          </TouchableOpacity>
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
                navigation.navigate('Home', { role: 'patient' });
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
                navigation.navigate('PMedicineReminder');
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
                navigation.navigate('PProfile');
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
                navigation.navigate('PSetting');
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

export default PPrivacy;

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
    marginBottom: height * 0.03,
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
    marginBottom: height * 0.035,
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
    color: Colors.textInput, // #A4B2AE
    fontSize: width * 0.04,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  PSettingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.015,
    marginBottom: height * 0.035,
    marginHorizontal: width * 0.05,
    shadowColor: Colors.shadow, // #171A1F
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1,
    elevation: 1,
  },
  PSettingLabel: {
    color: Colors.white, // #FFFFFF
    fontSize: width * 0.06,
    fontFamily: 'Inter-Bold',
    flex: 1,
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