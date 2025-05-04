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
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontLoader from '../../components/FontLoader';
import { Colors } from '../../styles/colors';

const { width, height } = Dimensions.get("window");

function ContactInfo({ navigation, route }) {
  const [selectedNav, setSelectedNav] = useState("");
  const [isDeletePressed, setIsDeletePressed] = useState(false);
  const [isChatPressed, setIsChatPressed] = useState(false);
  const [isCallPressed, setIsCallPressed] = useState(false);
  const [isVideoPressed, setIsVideoPressed] = useState(false);
  const [isMedicinePressed, setIsMedicinePressed] = useState(false); // Track medicine button press

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelectedNav("");
    });
    return unsubscribe;
  }, [navigation]);

  const { contact } = route.params || {
    contact: {
      name: "Mary Doe",
      relation: "Daughter",
      email: "jo@gmail.com",
      mobile: "+20 122 1401414",
      dob: "16/7/2002",
      gender: "Female",
    },
  };

  const safeContact = {
    name: contact.name || "Unknown",
    relation: contact.relation || "Unknown",
    email: contact.email || "N/A",
    mobile: contact.mobile || "N/A",
    dob: contact.dob || "N/A",
    gender: contact.gender || "N/A",
  };

  console.log('Contact data:', safeContact);

  const handleDelete = () => {
    Alert.alert(
      "Delete Contact",
      "Are you sure you want to delete this contact?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => navigation.goBack() },
      ]
    );
  };

  const handleChat = () => {
    Alert.alert("Chat", "Initiating chat with " + safeContact.name);
  };

  const handleCall = () => {
    Alert.alert("Call", "Calling " + safeContact.mobile);
  };

  const handleVideo = () => {
    Alert.alert("Video Call", "Starting video call with " + safeContact.name);
  };

  const handleMedicine = () => {
    navigation.navigate('CMedicineReminder');
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
          <TouchableOpacity
            style={[styles.deleteButton, isDeletePressed && styles.deleteButtonPressed]}
            onPress={handleDelete}
            onPressIn={() => setIsDeletePressed(true)}
            onPressOut={() => setIsDeletePressed(false)}
            activeOpacity={0.8}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[Colors.transparent, Colors.shadowGradient]}
          style={styles.headerGradient}
        >
          <View style={styles.profileIconContainer}>
            <MaterialCommunityIcons
              name="account"
              size={width * 0.3}
              color={Colors.Accent}
            />
          </View>
          <View style={styles.profileNameContainer}>
            <Text style={styles.name}>{safeContact.name}</Text>
          </View>
          <View style={styles.profileRelationContainer}>
            <Text style={styles.relation}>{safeContact.relation}</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, isChatPressed && styles.actionButtonPressed]}
              onPress={handleChat}
              onPressIn={() => setIsChatPressed(true)}
              onPressOut={() => setIsChatPressed(false)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="chat"
                size={width * 0.08}
                color={Colors.Accent}
              />
              <Text style={styles.actionButtonText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, isCallPressed && styles.actionButtonPressed]}
              onPress={handleCall}
              onPressIn={() => setIsCallPressed(true)}
              onPressOut={() => setIsCallPressed(false)}
              activeOpacity={0.8}
            >
              <MaterialIcons
                name="phone"
                size={width * 0.08}
                color={Colors.Accent}
              />
              <Text style={styles.actionButtonText}>Mobile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, isVideoPressed && styles.actionButtonPressed]}
              onPress={handleVideo}
              onPressIn={() => setIsVideoPressed(true)}
              onPressOut={() => setIsVideoPressed(false)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="video"
                size={width * 0.08}
                color={Colors.Accent}
              />
              <Text style={styles.actionButtonText}>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, isMedicinePressed && styles.actionButtonPressed]}
              onPress={handleMedicine}
              onPressIn={() => setIsMedicinePressed(true)}
              onPressOut={() => setIsMedicinePressed(false)}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="pill"
                size={width * 0.08}
                color={Colors.Accent}
              />
              <Text style={styles.actionButtonText}>Medicine</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Name</Text>
          <Text style={styles.infoValue}>{safeContact.name}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{safeContact.email}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Mobile</Text>
          <Text style={styles.infoValue}>{safeContact.mobile}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Date of Birth</Text>
          <Text style={styles.infoValue}>{safeContact.dob}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Gender</Text>
          <Text style={styles.infoValue}>{safeContact.gender}</Text>
        </View>
      </ScrollView>
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
  );
}

export default function ContactInfoWithFonts(props) {
  return (
    <FontLoader>
      <ContactInfo {...props} />
    </FontLoader>
  );
}

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
    justifyContent: "space-between",
    marginTop: height * 0.02,
    marginHorizontal: width * 0.05,
  },
  backIcon: {
    marginRight: width * 0.03,
  },
  deleteButton: {
    height: 36,
    paddingHorizontal: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDF2F2',
    borderRadius: 16,
    shadowColor: '#171A1F',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 9,
    elevation: 4,
  },
  deleteButtonPressed: {
    backgroundColor: '#F5C4C6',
  },
  deleteButtonText: {
    color: '#DE3B40',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    lineHeight: 22,
  },
  headerGradient: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    paddingBottom: height * 0.04,
    marginBottom: height * 0.015,
    alignItems: "center",
  },
  profileIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height * 0.015,
    marginTop: height * 0.03,
  },
  profileNameContainer: {
    alignItems: "center",
  },
  name: {
    color: Colors.lightText,
    fontSize: width * 0.06 + 4,
    fontFamily: 'Inter-Bold',
  },
  profileRelationContainer: {
    alignItems: "center",
    marginBottom: height * 0.04,
    marginTop: height * 0.01,
  },
  relation: {
    color: Colors.textInput,
    fontSize: width * 0.045 + 1,
    fontFamily: 'Inter-Regular',
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: width * 0.02,
  },
  actionButton: {
    width: 84,
    height: 64,
    paddingHorizontal: width * 0.02,
    marginHorizontal: width * 0.01,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Text,
    borderRadius: 16,
    shadowColor: '#171A1F',
    shadowOpacity: 0.24,
    shadowOffset: { width: 0, height: 17 },
    shadowRadius: 35,
    elevation: 10,
  },
  actionButtonPressed: {
    backgroundColor: '#B1C4BD',
  },
  actionButtonText: {
    color: Colors.Accent,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
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
    fontFamily: 'Inter-Medium',
    paddingVertical: height * 0.01,
  },
  infoValue: {
    color: Colors.textInput,
    fontSize: width * 0.035 + 2,
    fontFamily: 'Inter-Regular',
    paddingBottom: height * 0.01,
  },
  bottomNavBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width,
    alignItems: "center",
    backgroundColor: Colors.navBackground,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.015,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1,
    elevation: 1,
  },
  navWrapper: {
    flexDirection: "row",
    backgroundColor: Colors.navBackground,
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
    backgroundColor: Colors.Accent,
  },
  navIcon: {
    width: width * 0.06,
    height: width * 0.06,
    marginBottom: height * 0.005,
  },
  navText: {
    color: Colors.Accent,
    fontSize: width * 0.025,
    fontFamily: 'Inter_700Bold',
  },
  activeNavText: {
    color: Colors.white,
    fontFamily: 'Inter_700Bold',
  },
});