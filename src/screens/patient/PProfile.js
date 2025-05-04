import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Archivo_400Regular, Archivo_700Bold } from "@expo-google-fonts/archivo";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../api/apiClient";
import { Colors } from "../../styles/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const { width, height } = Dimensions.get("window");

export default function Profile({ navigation }) {
  const [userData, setUserData] = useState({
    name: "User",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    id: "",
    role: "patient",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNav, setSelectedNav] = useState("Account");

  // Load Inter and Archivo fonts
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Archivo_400Regular,
    Archivo_700Bold,
  });

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Load from AsyncStorage for offline access
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        setUserData({
          name: parsedData.name || "User",
          email: parsedData.email || "",
          phone: parsedData.phone || "",
          dateOfBirth: parsedData.dateOfBirth
            ? new Date(parsedData.dateOfBirth).toISOString().split("T")[0]
            : "",
          gender: parsedData.gender || "",
          id: parsedData.id || "",
          role: parsedData.role || "patient",
        });
        if (parsedData.profileImage) {
          setProfileImage(parsedData.profileImage);
        }
      }

      // Fetch from API
      const response = await apiClient.get("/api/users/getMe");
      const { user } = response.data.data;
      const updatedUserData = {
        name: user.name || "User",
        email: user.email || "",
        phone: user.phone || "",
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: user.gender || "",
        id: user._id || "",
        role: user.role || "patient",
      };
      setUserData(updatedUserData);
      if (user.profileImage) {
        setProfileImage(user.profileImage);
      } else {
        setProfileImage(null);
      }

      // Update AsyncStorage
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify({
          ...updatedUserData,
          profileImage: user.profileImage || null,
        })
      );
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      navigation.navigate("LogIn");
    } finally {
      setIsLoading(false);
    }
  }, [navigation]);

  // Fetch user data when screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [fetchUserData])
  );

  const handleEditProfile = () => {
    navigation.navigate("PProfileEdit");
  };

  if (!fontsLoaded || isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.Accent} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Header with Back and Edit buttons */}
        <View style={styles.headerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back-ios"
              size={width * 0.06}
              color={Colors.Text}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.headerContainer}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[Colors.transparent, Colors.shadowGradient]}
            style={styles.headerGradient}
          >
            <View style={styles.profileIconContainer}>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <MaterialIcons
                  name="person"
                  size={width * 0.3}
                  color={Colors.Accent}
                />
              )}
            </View>
            <View style={styles.profileNameContainer}>
              <Text style={styles.profileName}>{userData.name}</Text>
            </View>
          </LinearGradient>
          <View style={styles.nameCard}>
            <Text style={styles.cardLabel}>Name</Text>
            <Text style={styles.cardValue}>{userData.name}</Text>
          </View>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.cardLabel}>Email</Text>
          <Text style={styles.cardValue}>{userData.email}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.cardLabel}>Mobile</Text>
          <Text style={styles.cardValue}>{userData.phone}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.cardLabel}>Date of Birth</Text>
          <Text style={styles.cardValue}>{userData.dateOfBirth}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.cardLabel}>Gender</Text>
          <Text style={styles.cardValue}>{userData.gender}</Text>
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
              navigation.navigate("Home", { role: userData.role });
            }}
          >
            <MaterialIcons
              size={width * 0.06}
              name="home"
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
              navigation.navigate("PMedicineReminder");
            }}
          >
            <MaterialCommunityIcons
              size={width * 0.06}
              name="pill"
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
            onPress={() => setSelectedNav("Account")}
          >
            <MaterialIcons
              size={width * 0.06}
              name="person"
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
              navigation.navigate("PSetting");
            }}
          >
            <MaterialIcons
              size={width * 0.06}
              name="settings"
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
  );
}

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
    paddingBottom: height * 0.15,
  },
  headerButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: width * 0.05,
    marginTop: height * 0.05,
    marginBottom: height * 0.02,
  },
  headerContainer: {
    marginBottom: height * 0.025,
  },
  headerGradient: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    paddingTop: height * 0.06,
    paddingBottom: height * 0.06,
    marginBottom: height * 0.09,
  },
  editButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Text, // #F3F4F6
    borderRadius: 8,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    shadowColor: Colors.shadow, // #171A1F
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: height * 0.02 },
    shadowRadius: width * 0.08,
    elevation: 10,
  },
  editButtonText: {
    color: Colors.Primary, // #0C3C63
    fontSize: width * 0.035,
    fontFamily: "Inter_400Regular",
  },
  backIcon: {
    width: width * 0.06,
    height: width * 0.06,
  },
  profileIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height * 0.015,
  },
  profileImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
  },
  profileNameContainer: {
    alignItems: "center",
  },
  profileName: {
    color: Colors.lightText, // #D9E6F2
    fontSize: width * 0.06,
    fontFamily: "Archivo_700Bold",
  },
  nameCard: {
    position: "absolute",
    bottom: -height * 0.01,
    width: width * 0.98,
    backgroundColor: "#171A1F4F",
    borderRadius: 8,
    paddingVertical: height * 0.015,
    paddingLeft: width * 0.045,
    marginHorizontal: width * 0.01,
  },
  infoCard: {
    backgroundColor: "#171A1F4F",
    borderRadius: 8,
    paddingVertical: height * 0.015,
    paddingLeft: width * 0.045,
    marginBottom: height * 0.015,
    marginHorizontal: width * 0.01,
  },
  cardLabel: {
    color: Colors.Text, // #F1F8FE
    fontSize: width * 0.04,
    fontFamily: "Inter_500Medium",
  },
  cardValue: {
    color: Colors.textInput, // #A4B2AE
    fontSize: width * 0.035,
    fontFamily: "Inter_400Regular",
  },
  bottomNavBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width,
    alignItems: "center",
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
    flexDirection: "row",
    backgroundColor: Colors.navBackground, // #F3F4F6
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
    fontFamily: "Inter_700Bold",
  },
  activeNavText: {
    color: Colors.white, // #FFFFFF
    fontFamily: "Inter_700Bold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});