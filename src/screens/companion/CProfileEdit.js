import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Modal,
  FlatList,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import apiClient from "../../api/apiClient";
import { Colors } from "../../styles/colors";

const { width, height } = Dimensions.get("window");

export default function CProfileEdit({ navigation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [gender, setGender] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNav, setSelectedNav] = useState("Account");
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    date: "",
    gender: "",
    general: "",
  });
  const [showDayModal, setShowDayModal] = useState(false);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);

  // Date and gender options
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 100 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );
  const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await apiClient.get("/api/users/getMe");
        const { user } = response.data.data;
        setName(user.name || "");
        setPhone(user.phone || "");
        if (user.dateOfBirth) {
          const date = new Date(user.dateOfBirth);
          setSelectedDay(date.getDate().toString());
          setSelectedMonth((date.getMonth() + 1).toString());
          setSelectedYear(date.getFullYear().toString());
        }
        setGender(user.gender || null);
        if (user.profileImage) {
          setProfileImage({ uri: user.profileImage });
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        setErrors({ ...errors, general: "Failed to load user data." });
      }
    };
    loadUserData();
  }, []);

  const validatePhone = (phone) => {
    const phoneRegex = /^01[0-2,5]\d{8}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    let newErrors = { name: "", phone: "", date: "", gender: "", general: "" };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Please enter a name.";
      isValid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = "Please enter a phone number.";
      isValid = false;
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Phone number must be a valid Egyptian number (e.g., 01xxxxxxxxx).";
      isValid = false;
    }

    if (!selectedDay || !selectedMonth || !selectedYear) {
      newErrors.date = "Please select a complete birth date.";
      isValid = false;
    } else {
      const birthDate = new Date(
        parseInt(selectedYear),
        parseInt(selectedMonth) - 1,
        parseInt(selectedDay)
      );
      if (birthDate > new Date()) {
        newErrors.date = "Birth date cannot be in the future.";
        isValid = false;
      }
    }

    if (!gender) {
      newErrors.gender = "Please select a gender.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const pickImage = async () => {
    try {
      // Request permission to access the photo library
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        setErrors({ ...errors, general: "Permission to access photo library was denied." });
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.canceled && result.assets) {
        setProfileImage(result.assets[0]);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      setErrors({ ...errors, general: "Failed to pick image. Please try again." });
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (phone) formData.append("phone", phone);
      if (selectedDay && selectedMonth && selectedYear) {
        const dateOfBirth = `${selectedYear}-${selectedMonth.padStart(
          2,
          "0"
        )}-${selectedDay.padStart(2, "0")}`;
        formData.append("dateOfBirth", dateOfBirth);
      }
      formData.append("gender", gender);

      if (profileImage && profileImage.uri && !profileImage.uri.startsWith("data:image")) {
        formData.append("profileImage", {
          uri: profileImage.uri,
          type: profileImage.mimeType || "image/jpeg",
          name: profileImage.fileName || "profile.jpg",
        });
      }

      // Log FormData contents
      for (let [key, value] of formData._parts) {
        console.log(`FormData - ${key}:`, value);
      }

      const response = await apiClient.patch("/api/users/updateMe", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { user } = response.data.data;

      // Prepare user data for AsyncStorage
      const updatedUserData = {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        fcmToken: user.fcmToken || null,
        profileImage: user.profileImage || null,
      };

      // Update AsyncStorage
      await AsyncStorage.setItem("userData", JSON.stringify(updatedUserData));

      setErrors({ ...errors, general: "Profile updated successfully!" });
      navigation.goBack();
    } catch (error) {
      let errorMessage = "Failed to update profile. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setErrors({ ...errors, general: errorMessage });
      console.error("Update profile error:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderDropdownItem = ({ item, onSelect, closeModal }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        onSelect(item);
        closeModal();
      }}
    >
      <Text style={styles.dropdownItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: Colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back-ios"
            size={width * 0.06}
            color={Colors.Text}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.profileIconContainer}>
          <View style={styles.profileImageWrapper}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage.uri }}
                style={styles.profileImage}
              />
            ) : (
              <MaterialIcons
                name="person"
                size={width * 0.3}
                color={Colors.Accent}
              />
            )}
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={pickImage}
            >
              <MaterialIcons
                name="edit"
                size={width * 0.06}
                color={Colors.Text}
              />
            </TouchableOpacity>
          </View>
        </View>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[Colors.transparent, Colors.shadowGradient]}
          style={styles.headerGradient}
        >
          {errors.general ? (
            <Text
              style={[
                styles.generalErrorText,
                errors.general.includes("success") && { color: Colors.Accent },
              ]}
            >
              {errors.general}
            </Text>
          ) : null}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Companion Name</Text>
            <View style={[styles.inputWrapper, errors.name && styles.inputError]}>
              <MaterialIcons
                name="person"
                size={width * 0.05}
                color={Colors.textInput}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Enter name"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                style={[styles.textInput, { color: name ? Colors.Primary : Colors.textInput }]}
                placeholderTextColor={Colors.textInput}
              />
              {errors.name && (
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
            <Text style={styles.label}>Mobile</Text>
            <View style={[styles.inputWrapper, errors.phone && styles.inputError]}>
              <MaterialIcons
                name="phone"
                size={width * 0.05}
                color={Colors.textInput}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="01*********"
                value={phone}
                onChangeText={(text) => {
                  setPhone(text);
                  if (errors.phone) setErrors({ ...errors, phone: "" });
                }}
                style={[styles.textInput, { color: phone ? Colors.Primary : Colors.textInput }]}
                placeholderTextColor={Colors.textInput}
                keyboardType="phone-pad"
              />
              {errors.phone && (
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
            <Text style={styles.label}>Date of Birth</Text>
            <View style={[styles.datePickerContainer, errors.date && styles.inputErrorContainer]}>
              <View style={[styles.datePickerWrapper, errors.date && styles.inputError]}>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => setShowDayModal(true)}
                >
                  <Text
                    style={[
                      styles.dropdownText,
                      { color: selectedDay ? Colors.Primary : Colors.textInput },
                    ]}
                  >
                    {selectedDay || "Day"}
                  </Text>
                  <MaterialIcons
                    name="arrow-drop-down"
                    size={width * 0.05}
                    color={Colors.textInput}
                    style={styles.dropdownIconRight}
                  />
                </TouchableOpacity>
                <Modal
                  visible={showDayModal}
                  transparent
                  animationType="fade"
                  onRequestClose={() => setShowDayModal(false)}
                >
                  <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setShowDayModal(false)}
                  >
                    <View style={[styles.dropdownMenu, { width: width * 0.25 }]}>
                      <FlatList
                        data={days}
                        renderItem={({ item }) =>
                          renderDropdownItem({
                            item,
                            onSelect: (value) => {
                              setSelectedDay(value);
                              if (errors.date) setErrors({ ...errors, date: "" });
                            },
                            closeModal: () => setShowDayModal(false),
                          })
                        }
                        keyExtractor={(item) => item}
                        nestedScrollEnabled={true}
                      />
                    </View>
                  </TouchableOpacity>
                </Modal>
              </View>
              <View style={[styles.datePickerWrapper, errors.date && styles.inputError]}>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => setShowMonthModal(true)}
                >
                  <Text
                    style={[
                      styles.dropdownText,
                      { color: selectedMonth ? Colors.Primary : Colors.textInput },
                    ]}
                  >
                    {selectedMonth || "Month"}
                  </Text>
                  <MaterialIcons
                    name="arrow-drop-down"
                    size={width * 0.05}
                    color={Colors.textInput}
                    style={styles.dropdownIconRight}
                  />
                </TouchableOpacity>
                <Modal
                  visible={showMonthModal}
                  transparent
                  animationType="fade"
                  onRequestClose={() => setShowMonthModal(false)}
                >
                  <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setShowMonthModal(false)}
                  >
                    <View style={[styles.dropdownMenu, { width: width * 0.25 }]}>
                      <FlatList
                        data={months}
                        renderItem={({ item }) =>
                          renderDropdownItem({
                            item,
                            onSelect: (value) => {
                              setSelectedMonth(value);
                              if (errors.date) setErrors({ ...errors, date: "" });
                            },
                            closeModal: () => setShowMonthModal(false),
                          })
                        }
                        keyExtractor={(item) => item}
                        nestedScrollEnabled={true}
                      />
                    </View>
                  </TouchableOpacity>
                </Modal>
              </View>
              <View style={[styles.datePickerWrapper, errors.date && styles.inputError]}>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={() => setShowYearModal(true)}
                >
                  <Text
                    style={[
                      styles.dropdownText,
                      { color: selectedYear ? Colors.Primary : Colors.textInput },
                    ]}
                  >
                    {selectedYear || "Year"}
                  </Text>
                  <MaterialIcons
                    name="arrow-drop-down"
                    size={width * 0.05}
                    color={Colors.textInput}
                    style={styles.dropdownIconRight}
                  />
                </TouchableOpacity>
                <Modal
                  visible={showYearModal}
                  transparent
                  animationType="fade"
                  onRequestClose={() => setShowYearModal(false)}
                >
                  <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setShowYearModal(false)}
                  >
                    <View style={[styles.dropdownMenu, { width: width * 0.25 }]}>
                      <FlatList
                        data={years}
                        renderItem={({ item }) =>
                          renderDropdownItem({
                            item,
                            onSelect: (value) => {
                              setSelectedYear(value);
                              if (errors.date) setErrors({ ...errors, date: "" });
                            },
                            closeModal: () => setShowYearModal(false),
                          })
                        }
                        keyExtractor={(item) => item}
                        nestedScrollEnabled={true}
                      />
                    </View>
                  </TouchableOpacity>
                </Modal>
              </View>
              {errors.date && (
                <MaterialIcons
                  name="error"
                  size={width * 0.05}
                  color={Colors.error}
                  style={styles.errorIconDate}
                />
              )}
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender</Text>
            <View style={[styles.radioContainer, errors.gender && styles.inputErrorContainer]}>
              {genders.map((option, index) => (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.radioOption, index === 0 && styles.radioOptionMale]}
                  onPress={() => {
                    setGender(option.value);
                    if (errors.gender) setErrors({ ...errors, gender: "" });
                  }}
                >
                  <MaterialIcons
                    name={
                      gender === option.value
                        ? "radio-button-checked"
                        : "radio-button-unchecked"
                    }
                    size={width * 0.05}
                    color={Colors.Text}
                    style={styles.radioIcon}
                  />
                  <Text style={styles.radioText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
              {errors.gender && (
                <MaterialIcons
                  name="error"
                  size={width * 0.05}
                  color={Colors.error}
                  style={styles.errorIcon}
                />
              )}
            </View>
          </View>
        </LinearGradient>
      </ScrollView>

      {/* Save Button (Fixed Position) */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity
          style={[styles.saveButton, isLoading && styles.disabledButton]}
          onPress={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.Text} />
          ) : (
            <Text style={styles.saveButtonText}>SAVE</Text>
          )}
        </TouchableOpacity>
      </View>

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
              color={selectedNav === "Home" ? Colors.Text : Colors.Accent}
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
              color={selectedNav === "Medicine" ? Colors.Text : Colors.Accent}
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
              color={selectedNav === "Account" ? Colors.Text : Colors.Accent}
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
              color={selectedNav === "Settings" ? Colors.Text : Colors.Accent}
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
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: height * 0.15,
    backgroundColor: Colors.background,
  },
  backIcon: {
    marginTop: height * 0.05,
    marginBottom: height * 0.02,
    marginLeft: width * 0.05,
  },
  profileIconContainer: {
    alignItems: "center",
    marginVertical: height * 0.03,
  },
  profileImageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.Accent,
    borderRadius: width * 0.08,
    padding: width * 0.02,
    elevation: 5,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerGradient: {
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.01,
    marginBottom: height * 0.02,
  },
  inputContainer: {
    alignItems: "flex-start",
    marginBottom: height * 0.025,
    marginHorizontal: width * 0.05,
  },
  label: {
    color: Colors.lightText,
    fontSize: width * 0.045,
    fontFamily: "Inter-Medium",
    marginBottom: height * 0.007,
    marginLeft: width * 0.01,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.Text,
    borderColor: Colors.border,
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    width: width * 0.9,
  },
  inputIcon: {
    marginRight: width * 0.03,
  },
  textInput: {
    flex: 1,
    fontSize: Math.min(width * 0.04, 16),
    fontFamily: "Inter-Regular",
  },
  inputError: {
    borderColor: Colors.error,
    borderWidth: 1.5,
  },
  errorIcon: {
    marginLeft: width * 0.02,
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.9,
  },
  datePickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.Text,
    borderColor: Colors.border,
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: height * 0.015,
    width: width * 0.28,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: width * 0.02,
    backgroundColor: Colors.Text,
  },
  dropdownText: {
    fontSize: Math.min(width * 0.04, 16),
    fontFamily: "Inter-Regular",
    flex: 1,
    textAlign: "center",
  },
  dropdownIconRight: {
    marginLeft: width * 0.02,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.modalOverlay,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownMenu: {
    backgroundColor: Colors.Text,
    borderRadius: 8,
    maxHeight: height * 0.35,
    paddingVertical: height * 0.01,
  },
  dropdownItem: {
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
  },
  dropdownItemText: {
    fontSize: Math.min(width * 0.04, 16),
    color: Colors.textInput,
    fontFamily: "Inter-Regular",
    textAlign: "center",
  },
  inputErrorContainer: {
    position: "relative",
  },
  errorIconDate: {
    position: "absolute",
    right: width * 0.02,
    top: height * 0.015,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.015,
    width: width * 0.9,
    marginLeft: width * 0.01,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOptionMale: {
    marginRight: width * 0.2,
  },
  radioIcon: {
    marginRight: width * 0.03,
  },
  radioText: {
    fontSize: Math.min(width * 0.045, 16),
    color: Colors.Text,
    fontFamily: "Inter-Regular",
  },
  saveButtonContainer: {
    position: "absolute",
    bottom: height * 0.105,
    alignItems: "center",
    width: width,
  },
  saveButton: {
    backgroundColor: Colors.Accent,
    borderRadius: 16,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.15,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 17,
    elevation: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: Colors.Text,
    fontSize: Math.min(width * 0.05, 18),
    fontFamily: "Inter-Bold",
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
    fontFamily: "Inter_700Bold",
  },
  activeNavText: {
    color: "#F9F9F9",
    fontFamily: "Inter_700Bold",
  },
  generalErrorText: {
    color: Colors.error,
    fontSize: width * 0.04,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    marginBottom: height * 0.02,
  },
});