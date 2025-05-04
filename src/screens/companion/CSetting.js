import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Switch,
  Appearance,
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontLoader from '../../components/FontLoader';
import { Colors } from '../../styles/colors';
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../api/apiClient"; // تأكدي من المسار

const { width, height } = Dimensions.get("window");

// دالة تسجيل الخروج
const logout = async (navigation) => {
  try {
    // طلب تسجيل الخروج للـ Backend
    await apiClient.post("/api/users/logout");
    
    // مسح البيانات من AsyncStorage
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("userName");
    
    // التنقل لشاشة تسجيل الدخول
    navigation.navigate("LogIn");
  } catch (error) {
    console.error("Logout error:", error.message);
    // في حالة الخطأ، نمسح البيانات المحلية وننقل لتسجيل الدخول
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("userName");
    navigation.navigate("LogIn");
  }
};

const Setting = ({ navigation }) => {
  const [selectedNav, setSelectedNav] = useState("Settings"); // Settings active by default
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');

  // Reset selectedNav to "Settings" when the screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelectedNav("Settings"); // Ensure Settings is active when returning
    });

    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => {
      unsubscribe();
      subscription.remove();
    };
  }, [navigation]);

  // Handlers for interactive elements
  const handleLanguage = () => {
    navigation.navigate('CChooseLanguage');
  };

  const handleCPrivacy = () => {
    navigation.navigate('CPrivacy');
  };

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Note: Actual theme switching requires app-level theme management
    // This toggle reflects system theme for now
  };

  const handleAboutUs = () => {
    navigation.navigate('Info');
  };

  const handleSwitchAccount = () => {
    navigation.navigate('CSwitchAccount');
  };

  const handleLogOut = () => {
    logout(navigation); // استدعاء دالة تسجيل الخروج
  };

  return (
    <FontLoader>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <Text style={styles.title}>SETTING</Text>

          {/* Language */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleLanguage}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name="language"
              size={width * 0.06}
              color={Colors.white}
              style={styles.settingIcon}
            />
            <Text style={styles.settingLabel}>Language</Text>
            <Text style={styles.settingValue}>English</Text>
            <MaterialIcons
              name="chevron-right"
              size={width * 0.06}
              color={Colors.white}
            />
          </TouchableOpacity>

          {/* CPrivacy */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleCPrivacy}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name="lock"
              size={width * 0.06}
              color={Colors.white}
              style={styles.settingIcon}
            />
            <Text style={styles.settingLabel}>CPrivacy</Text>
            <MaterialIcons
              name="chevron-right"
              size={width * 0.06}
              color={Colors.white}
            />
          </TouchableOpacity>

          {/* Dark Mode */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleDarkMode}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={width * 0.06}
              color={Colors.white}
              style={styles.settingIcon}
            />
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={handleDarkMode}
              trackColor={{ false: Colors.border, true: Colors.Accent }}
              thumbColor={isDarkMode ? Colors.white : Colors.lightText}
              style={styles.switch}
            />
          </TouchableOpacity>

          {/* About Us */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleAboutUs}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name="info"
              size={width * 0.06}
              color={Colors.white}
              style={styles.settingIcon}
            />
            <Text style={styles.settingLabel}>About Us</Text>
            <MaterialIcons
              name="chevron-right"
              size={width * 0.06}
              color={Colors.white}
            />
          </TouchableOpacity>

          {/* Switch Account and Log Out */}
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSwitchAccount}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="account-switch"
                size={width * 0.15}
                color={Colors.lightText}
                style={styles.actionIcon}
              />
              <Text style={styles.actionText}>Switch Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleLogOut}
              activeOpacity={0.8}
            >
              <MaterialIcons
                name="logout"
                size={width * 0.15}
                color={Colors.lightText}
                style={styles.actionIcon}
              />
              <Text style={styles.actionText}>Log Out</Text>
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

export default Setting;

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
  title: {
    color: Colors.lightText, // #D9E6F2
    fontSize: width * 0.05,
    fontFamily: 'Inter-Bold',
    marginTop: height * 0.08,
    marginBottom: height * 0.08,
    marginLeft: width * 0.07,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.015,
    marginBottom: height * 0.03,
    marginHorizontal: width * 0.05,
    shadowColor: Colors.shadow, // #171A1F
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1,
    elevation: 1,
  },
  settingIcon: {
    marginRight: width * 0.03,
  },
  settingLabel: {
    color: Colors.white, // #FFFFFF
    fontSize: width * 0.06,
    fontFamily: 'Inter-Bold',
    flex: 1,
  },
  settingValue: {
    color: Colors.white, // #FFFFFF
    fontSize: width * 0.05,
    fontFamily: 'Inter-Regular',
    marginRight: width * 0.03,
  },
  switch: {
    transform: [{ scale: 0.8 }], // Slightly smaller switch for better fit
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.15,
    marginHorizontal: width * 0.05,
  },
  actionButton: {
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    marginHorizontal: width * 0.05,
    shadowColor: Colors.shadow, // #171A1F
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1,
    elevation: 1,
  },
  actionIcon: {
    marginBottom: height * 0.005,
  },
  actionText: {
    color: Colors.lightText, // #D9E6F2
    fontSize: width * 0.035,
    fontFamily: 'Inter-Regular',
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