import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontLoader from "../../components/FontLoader";
import { Colors } from "../../styles/colors";

const { width, height } = Dimensions.get("window");

const CChosenMedicine = ({ navigation, route }) => {
  const [selectedNav, setSelectedNav] = useState("");
  const [isDeletePressed, setIsDeletePressed] = useState(false);
  const [isInfoPressed, setIsInfoPressed] = useState(false);
  const [isEditPressed, setIsEditPressed] = useState(false);

  // Reset selectedNav to "" when the screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSelectedNav(""); // Ensure no nav button is active when returning to this screen
    });
    return unsubscribe;
  }, [navigation]);

  const { medicine } = route.params || {
    medicine: {
      name: "Atenolol",
      dosage: "100gm",
      frequency: "Every 5 hours",
      startDate: "10/03/2022",
    },
  };

  // Ensure all medicine fields are defined
  const safeMedicine = {
    name: medicine.name || "Unknown",
    dosage: medicine.dosage || "N/A",
    frequency: medicine.frequency || "N/A",
    startDate: medicine.startDate || "N/A",
  };

  // Log medicine data for debugging
  console.log("Medicine data:", safeMedicine);

  const handleDelete = () => {
    Alert.alert(
      "Delete Medicine",
      "Are you sure you want to delete this medicine?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            navigation.navigate("CMedicineReminder", {
              deleteMedicine: safeMedicine.name,
            });
          },
        },
      ]
    );
  };

  const handleInfo = () => {
    navigation.navigate("CMedicineInfo", { medicine: safeMedicine });
  };

  const handleEdit = () => {
    navigation.navigate("CEditMedicine", { medicine: safeMedicine });
  };

  return (
    <FontLoader>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          {/* Header Container */}
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons
                name="arrow-back-ios"
                size={width * 0.06}
                color={Colors.lightText}
                style={styles.backIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Header with Gradient Background */}
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[Colors.transparent, Colors.shadowGradient]}
            style={styles.headerGradient}
          >
            <View style={styles.profileIconContainer}>
              <MaterialCommunityIcons
                name="pill"
                size={width * 0.3}
                color={Colors.Text}
              />
              <Text style={styles.nameByIcon}>{safeMedicine.name}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, isInfoPressed && styles.actionButtonPressed]}
                onPress={handleInfo}
                onPressIn={() => setIsInfoPressed(true)}
                onPressOut={() => setIsInfoPressed(false)}
                activeOpacity={0.8}
              >
                <MaterialIcons
                  name="info"
                  size={width * 0.08}
                  color={Colors.Accent}
                />
                <Text style={styles.actionButtonText}>Info</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, isEditPressed && styles.actionButtonPressed]}
                onPress={handleEdit}
                onPressIn={() => setIsEditPressed(true)}
                onPressOut={() => setIsEditPressed(false)}
                activeOpacity={0.8}
              >
                <MaterialIcons
                  name="edit"
                  size={width * 0.08}
                  color={Colors.Accent}
                />
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, isDeletePressed && styles.actionButtonPressed]}
                onPress={handleDelete}
                onPressIn={() => setIsDeletePressed(true)}
                onPressOut={() => setIsDeletePressed(false)}
                activeOpacity={0.8}
              >
                <MaterialIcons
                  name="delete"
                  size={width * 0.08}
                  color={Colors.Accent}
                />
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Medicine Details */}
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Medicine Name</Text>
            <Text style={styles.infoValue}>{safeMedicine.name}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Dosage</Text>
            <Text style={styles.infoValue}>{safeMedicine.dosage}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Dose Interval</Text>
            <Text style={styles.infoValue}>{safeMedicine.frequency}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Start Date</Text>
            <Text style={styles.infoValue}>{safeMedicine.startDate}</Text>
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
                navigation.navigate("Home", { role: "companion" });
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
                navigation.navigate("CMedicineReminder");
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
                navigation.navigate("CProfile");
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
                navigation.navigate("CSetting");
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

export default CChosenMedicine;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: height * 0.15,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: height * 0.02,
    marginHorizontal: width * 0.05,
  },
  backIcon: {
    marginRight: width * 0.03,
  },
  headerGradient: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    paddingBottom: height * 0.04,
    marginBottom: height * 0.015,
    alignItems: "center",
  },
  profileIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: width * 0.03,
    marginBottom: height * 0.07,
    marginTop: height * 0.05,
  },
  nameByIcon: {
    color: Colors.Text,
    fontSize: width * 0.1,
    fontFamily: "Inter-Bold",
    marginLeft: width * 0.03,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: width * 0.05,
  },
  actionButton: {
    width: 84,
    height: 64,
    paddingHorizontal: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Text,
    borderRadius: 16,
    shadowColor: "#171A1F",
    shadowOpacity: 0.24,
    shadowOffset: { width: 0, height: 17 },
    shadowRadius: 35,
    elevation: 10,
    marginHorizontal: width * 0.02,
  },
  actionButtonPressed: {
    backgroundColor: "#B1C4BD",
  },
  actionButtonText: {
    color: Colors.Accent,
    fontSize: 14,
    fontFamily: "Inter-Regular",
    fontWeight: "400",
    lineHeight: 22,
    marginTop: height * 0.001,
  },
  infoCard: {
    backgroundColor: "#171A1F4F",
    borderRadius: 8,
    paddingVertical: height * 0.001,
    paddingLeft: width * 0.045,
    marginBottom: height * 0.015,
    marginHorizontal: width * 0.01,
  },
  infoLabel: {
    color: Colors.Text,
    fontSize: width * 0.04 + 4,
    fontFamily: "Inter-Medium",
    paddingVertical: height * 0.01,
  },
  infoValue: {
    color: Colors.textInput,
    fontSize: width * 0.035 + 2,
    fontFamily: "Inter-Regular",
    paddingBottom: height * 0.01,
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
    fontFamily: "Inter_700Bold",
  },
  activeNavText: {
    color: "#F9F9F9",
    fontFamily: "Inter_700Bold",
  },
});