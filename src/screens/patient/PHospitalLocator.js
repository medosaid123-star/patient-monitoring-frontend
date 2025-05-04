import React, { useState } from "react";
import { Colors } from '../../styles/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

const { width, height } = Dimensions.get("window");
// ... (other imports and code remain the same)

export default function Home({ navigation }) {
  const [selectedNav, setSelectedNav] = useState("Home");

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Fixed Header */}
      <View style={styles.fixedContentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Welcome back, Lily!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <MaterialIcons
              name="account-circle"
              size={width * 0.18}
              color="#F1F8FE"
              style={styles.headerImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.pressureContainer}>
          <Text style={styles.pressureLabel}>Your pressure now is:</Text>
          <Text style={styles.pressureValue}>120/80</Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* PAlerts Section */}
        <View style={styles.PAlertsContainer}>
          <View style={styles.PAlertsTextContainer}>
            <View style={styles.PAlertsTextWrapper}>
              <Text style={styles.PAlertsTitle}>PAlerts</Text>
              <Text style={styles.PAlertsMessage}>No PAlerts sent today.</Text>
            </View>
            <TouchableOpacity
              style={styles.PAlertsButton}
              onPress={() => navigation.navigate('PPAlerts')}
            >
              <Text style={styles.PAlertsButtonText}>PAlerts History</Text>
            </TouchableOpacity>
          </View>
          <MaterialIcons
            name="notifications-active"
            size={width * 0.33}
            color="#126591"
            style={styles.PAlertsImage}
          />
        </View>

        {/* Features Section */}
        <Text style={styles.featuresTitle}>Features</Text>
        <View style={styles.featuresContainer}>
          <View style={styles.featuresGrid}>
            {/* First Row */}
            <View style={styles.featuresRow}>
              <TouchableOpacity
                style={styles.featureButton}
                onPress={() => navigation.navigate('PEmergencyContacts')}
              >
                <MaterialIcons
                  name="contact-emergency"
                  size={width * 0.18}
                  color="#126591"
                  style={styles.featureIcon}
                />
                <Text style={styles.featureText}>Emergency Contacts</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.featureButton}
                onPress={() => navigation.navigate('PPDiseaseChecker')} // Updated navigation
              >
                <MaterialCommunityIcons
                  name="stethoscope"
                  size={width * 0.18}
                  color="#126591"
                  style={styles.featureIcon}
                />
                <Text style={styles.featureText}>Disease Checker</Text>
              </TouchableOpacity>
            </View>
            {/* Second Row */}
            <View style={styles.featuresRow}>
              <TouchableOpacity
                style={styles.featureButton}
                onPress={() => navigation.navigate('PHospitalLocator')} // Updated navigation
              >
                <MaterialCommunityIcons
                  name="hospital-box-outline"
                  size={width * 0.18}
                  color="#126591"
                  style={styles.featureIcon}
                />
                <Text style={styles.featureText}>Hospital Locator</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.featureButton}
                onPress={() => navigation.navigate('PDoctorLocator')} // Updated navigation
              >
                <MaterialIcons
                  name="medical-services"
                  size={width * 0.18}
                  color="#126591"
                  style={styles.featureIcon}
                />
                <Text style={styles.featureText}>Doctor Locator</Text>
              </TouchableOpacity>
            </View>
            {/* Third Row */}
            <View style={styles.featuresRow}>
              <TouchableOpacity
                style={styles.featureButton}
                onPress={() => navigation.navigate('VideoCall')} // Updated navigation
              >
                <MaterialIcons
                  name="video-camera-front"
                  size={width * 0.18}
                  color="#126591"
                  style={styles.featureIcon}
                />
                <Text style={styles.featureText}>Video Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.featureButton}
                onPress={() => navigation.navigate('PMedicineReminder')}
              >
                <MaterialCommunityIcons
                  name="pill"
                  size={width * 0.18}
                  color="#126591"
                  style={styles.featureIcon}
                />
                <Text style={styles.featureText}>Medicine Reminder</Text>
              </TouchableOpacity>
            </View>
          </View>
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
            onPress={() => setSelectedNav("Home")}
          >
            <MaterialIcons
              name="home"
              size={width * 0.06}
              color={selectedNav === "Home" ? "#F9F9F9" : "#126591"}
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
              color={selectedNav === "Medicine" ? "#F9F9F9" : "#126591"}
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
              navigation.navigate('Profile');
            }}
          >
            <MaterialIcons
              name="account-circle"
              size={width * 0.06}
              color={selectedNav === "Account" ? "#F9F9F9" : "#126591"}
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
              selectedNav === "PSettings" && styles.activeNavButton,
            ]}
            onPress={() => {
              setSelectedNav("PSettings");
              navigation.navigate('PSetting');
            }}
          >
            <MaterialIcons
              name="PSettings"
              size={width * 0.06}
              color={selectedNav === "PSettings" ? "#F9F9F9" : "#126591"}
              style={styles.navIcon}
            />
            <Text
              style={[
                styles.navText,
                selectedNav === "PSettings" && styles.activeNavText,
              ]}
            >
              PSettings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ... (styles remain the same)
// ... (styles remain the same)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0C3C63",
  },
  fixedContentContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0C3C63",
    zIndex: 1,
    shadowColor: "#120F281C",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.06,
    marginHorizontal: width * 0.05,
  },
  headerText: {
    color: "#F9F9F9",
    fontSize: width * 0.05 + 4,
    fontWeight: "bold",
    flex: 1,
  },
  headerImage: {
    width: width * 0.18,
    height: width * 0.18,
  },
  pressureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.04,
    marginVertical: height * 0.025,
    marginHorizontal: width * 0.05,
  },
  pressureLabel: {
    color: "#5D6864",
    fontSize: width * 0.035 + 4,
  },
  pressureValue: {
    color: "#126591",
    fontSize: width * 0.05 + 4,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#0C3C63",
    marginTop: height * 0.18,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: 20,
  },
  PAlertsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.035,
    marginHorizontal: width * 0.05,
  },
  PAlertsTextContainer: {
    flex: 1,
    alignItems: "flex-start",
    marginRight: width * 0.03,
  },
  PAlertsTextWrapper: {
    marginBottom: height * 0.04,
  },
  PAlertsTitle: {
    color: "#126591",
    fontSize: width * 0.05 + 4,
    fontWeight: "bold",
  },
  PAlertsMessage: {
    color: "#5D6864",
    fontSize: width * 0.035 + 4,
  },
  PAlertsButton: {
    backgroundColor: "#126591",
    borderRadius: 6,
    paddingVertical: height * 0.008,
    paddingHorizontal: width * 0.03,
    shadowColor: "#171A1F1A",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 9,
    elevation: 9,
  },
  PAlertsButtonText: {
    color: "#F9F9F9",
    fontSize: width * 0.035 + 4,
  },
  PAlertsImage: {
    width: width * 0.33,
    height: width * 0.33,
  },
  featuresTitle: {
    color: "#F9F9F9",
    fontSize: width * 0.05 + 4,
    fontWeight: "bold",
    marginBottom: height * 0.02,
    marginLeft: width * 0.07,
  },
  featuresContainer: {
    paddingBottom: height * 0.15,
    alignItems: "center",
  },
  featuresGrid: {
    marginHorizontal: width * 0.05,
  },
  featuresRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.03,
  },
  featureButton: {
    width: (width - width * 0.15) / 2,
    height: width * 0.35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    marginHorizontal: width * 0.015,
  },
  featureIcon: {
    width: width * 0.18,
    height: width * 0.18,
    marginBottom: height * 0.015,
  },
  featureText: {
    color: "#126591",
    fontSize: width * 0.045,
    fontWeight: "bold",
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
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.05,
    shadowColor: "#171A1F12",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1,
    elevation: 1,
    zIndex: 1,
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
    fontWeight: "bold",
  },
  activeNavText: {
    color: "#F9F9F9",
  },
});