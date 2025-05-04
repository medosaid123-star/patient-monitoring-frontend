import React, { useState } from "react";
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
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../styles/colors";
import { ENDPOINTS, apiClient } from "../../api";

const { width, height } = Dimensions.get("window");

export default function SignUpInfo({ navigation, route }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [gender, setGender] = useState(null);
  const [isPatient, setIsPatient] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    terms: "",
    general: "",
  });

  const [showDayModal, setShowDayModal] = useState(false);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from(
    { length: 100 },
    (_, i) => (new Date().getFullYear() - i).toString()
  );
  const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const validatePhone = (phone) => {
    const phoneRegex = /^01[0-2,5]\d{8}$/;
    return phoneRegex.test(phone);
  };

  const validateDateOfBirth = (day, month, year) => {
    if (!day || !month || !year) return false;
    const date = new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
    return date <= new Date();
  };

  const handleSignUp = async () => {
    let newErrors = {
      name: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      terms: "",
      general: "",
    };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Please enter your name.";
      isValid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
      isValid = false;
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Please enter a valid Egyptian phone number (e.g., 01xxxxxxxxx).";
      isValid = false;
    }

    if (!validateDateOfBirth(selectedDay, selectedMonth, selectedYear)) {
      newErrors.dateOfBirth = "Please select a valid birth date (not in the future).";
      isValid = false;
    }

    if (!gender) {
      newErrors.gender = "Please select your gender.";
      isValid = false;
    }

    if (!isChecked) {
      newErrors.terms = "You must agree to the Terms & Conditions.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    try {
      const storedData = await AsyncStorage.getItem("signUpData");
      if (!storedData) {
        navigation.navigate("SignUp");
        throw new Error("No sign-up data found. Please start over.");
      }
      const { email, password, passwordConfirm } = JSON.parse(storedData);

      const dateOfBirth = `${selectedYear}-${selectedMonth.padStart(2, "0")}-${selectedDay.padStart(2, "0")}`;

      const payload = {
        role: isPatient ? "patient" : "companion",
        name,
        email,
        password,
        passwordConfirm,
        phone,
        dateOfBirth,
        gender,
      };

      console.log("Sending request to:", ENDPOINTS.AUTH.SIGNUP);
      console.log("Request payload:", JSON.stringify(payload, null, 2));

      const response = await apiClient.post(ENDPOINTS.AUTH.SIGNUP, payload);

      if (response.data.token) {
        await AsyncStorage.setItem("authToken", response.data.token);
        await AsyncStorage.setItem("userName", name); // حفظ الاسم للاستخدام لاحقاً
        await AsyncStorage.removeItem("signUpData");
      }

      console.log("Sign Up successful:", response.data);
      navigation.navigate("Home", { role: isPatient ? "patient" : "companion" });
    } catch (error) {
      let errorMessage = "Failed to sign up. Please try again.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // عرض رسالة الباك إند
      }
      console.error("Sign Up error details:", error.message);
      setErrors({ ...newErrors, general: errorMessage });
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
    <ScrollView style={styles.scrollView}>
      <SafeAreaView style={styles.safeAreaTop} edges={["top"]}>
        <View style={styles.upperSection}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={width * 0.05}
              color={Colors.Primary}
            />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <View>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.signUpText}>Complete your profile</Text>
            </View>
            <View style={styles.headerIcons}>
              <MaterialIcons
                name="schedule"
                size={width * 0.15}
                color={Colors.Primary}
                style={styles.scheduleIcon}
              />
              <MaterialCommunityIcons
                name="heart-pulse"
                size={width * 0.55}
                color="#FF0000"
                style={styles.HeartIcon}
              />
              <MaterialCommunityIcons
                name="stethoscope"
                size={width * 0.2}
                color={Colors.Text}
                style={styles.stethoscopeIcon}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.formContainer}>
        {errors.general ? (
          <Text style={styles.generalErrorText}>{errors.general}</Text>
        ) : null}

        <View style={styles.toggleContainer}>
          <View style={styles.toggleWrapper}>
            <TouchableOpacity
              style={[styles.toggleButton, isPatient && styles.activeToggleButton]}
              onPress={() => setIsPatient(true)}
            >
              <Text style={[styles.toggleText, isPatient && styles.activeToggleText]}>
                Patient
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, !isPatient && styles.activeToggleButton]}
              onPress={() => setIsPatient(false)}
            >
              <Text style={[styles.toggleText, !isPatient && styles.activeToggleText]}>
                Companion
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <View style={[styles.inputWrapper, errors.name && styles.inputError]}>
            <MaterialIcons
              name="person"
              size={width * 0.05}
              color={Colors.textInput}
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Enter Name"
              placeholderTextColor={Colors.textInput}
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              style={[styles.textInput, { color: name ? Colors.Primary : Colors.textInput }]}
            />
            {errors.name && (
              <MaterialIcons
                name="error"
                size={width * 0.05}
                color="#FF0000"
                style={styles.errorIcon}
              />
            )}
          </View>
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <View style={[styles.inputWrapper, errors.phone && styles.inputError]}>
            <MaterialIcons
              name="phone"
              size={width * 0.05}
              color={Colors.textInput}
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="01*********"
              placeholderTextColor={Colors.textInput}
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                if (errors.phone) setErrors({ ...errors, phone: "" });
              }}
              style={[styles.textInput, { color: phone ? Colors.Primary : Colors.textInput }]}
              keyboardType="phone-pad"
            />
            {errors.phone && (
              <MaterialIcons
                name="error"
                size={width * 0.05}
                color="#FF0000"
                style={styles.errorIcon}
              />
            )}
          </View>
          {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Birth Date</Text>
          <View style={styles.datePickerContainer}>
            <View style={[styles.datePickerWrapper, errors.dateOfBirth && styles.inputError]}>
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
                  <View style={[styles.dropdownMenu, { width: width * 0.28 }]}>
                    <FlatList
                      data={days}
                      renderItem={({ item }) =>
                        renderDropdownItem({
                          item,
                          onSelect: setSelectedDay,
                          closeModal: () => setShowDayModal(false),
                        })
                      }
                      keyExtractor={(item) => item}
                    />
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>

            <View style={[styles.datePickerWrapper, errors.dateOfBirth && styles.inputError]}>
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
                  <View style={[styles.dropdownMenu, { width: width * 0.28 }]}>
                    <FlatList
                      data={months}
                      renderItem={({ item }) =>
                        renderDropdownItem({
                          item,
                          onSelect: setSelectedMonth,
                          closeModal: () => setShowMonthModal(false),
                        })
                      }
                      keyExtractor={(item) => item}
                    />
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>

            <View style={[styles.datePickerWrapper, errors.dateOfBirth && styles.inputError]}>
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
                  <View style={[styles.dropdownMenu, { width: width * 0.28 }]}>
                    <FlatList
                      data={years}
                      renderItem={({ item }) =>
                        renderDropdownItem({
                          item,
                          onSelect: setSelectedYear,
                          closeModal: () => setShowYearModal(false),
                        })
                      }
                      keyExtractor={(item) => item}
                    />
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
          </View>
          {errors.dateOfBirth ? <Text style={styles.errorText}>{errors.dateOfBirth}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Gender</Text>
          <View style={styles.radioContainer}>
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
                  name={gender === option.value ? "radio-button-checked" : "radio-button-unchecked"}
                  size={width * 0.05}
                  color={Colors.Text}
                  style={styles.radioIcon}
                />
                <Text style={styles.radioText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => {
              setIsChecked(!isChecked);
              if (errors.terms) setErrors({ ...errors, terms: "" });
            }}
          >
            <MaterialIcons
              name={isChecked ? "check-box" : "check-box-outline-blank"}
              size={width * 0.05}
              color={Colors.Text}
            />
          </TouchableOpacity>
          <Text style={styles.checkboxText}>
            I agree with{" "}
            <TouchableOpacity onPress={() => navigation.navigate("TermsConditions")}>
              <Text style={styles.termsLinkText}>Terms & Conditions</Text>
            </TouchableOpacity>
          </Text>
        </View>
        {errors.terms ? <Text style={styles.errorText}>{errors.terms}</Text> : null}

        <View style={styles.signUpButtonContainer}>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSignUp}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginPromptText}>Have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
            <Text style={styles.loginLinkText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SafeAreaView style={styles.safeAreaBottom} edges={["bottom"]} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "transparent",
    overflow: "visible",
  },
  safeAreaTop: {
    backgroundColor: "#D9EEFF",
  },
  safeAreaBottom: {
    backgroundColor: Colors.Primary,
  },
  upperSection: {
    backgroundColor: "#D9EEFF",
    height: height * 0.25,
    paddingBottom: height * 0.03,
    paddingTop: height * 0.05,
    minHeight: height * 0.3,
  },
  backButton: {
    alignSelf: "flex-start",
    marginLeft: width * 0.05,
    marginBottom: height * 0.02,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: width * 0.05,
  },
  welcomeText: {
    color: Colors.Primary,
    fontSize: width * 0.09,
    fontWeight: "bold",
    fontFamily: "Archivo-Bold",
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
  },
  signUpText: {
    color: Colors.Primary,
    fontSize: width * 0.06,
    marginBottom: height * 0.02,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  scheduleIcon: {
    right: width * 0.4,
    bottom: height * 0.05,
    position: "absolute",
    opacity: 0.2,
  },
  HeartIcon: {
    right: width * 0.002,
    paddingBottom: height * 0.02,
    position: "absolute",
    opacity: 0.2,
  },
  stethoscopeIcon: {
    position: "absolute",
    top: height * 0.001,
    right: width * 0.001,
    opacity: 0.2,
    color: Colors.Primary,
  },
  formContainer: {
    backgroundColor: Colors.Primary,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingTop: height * 0.05,
    paddingBottom: height * 0.1,
    minHeight: height * 0.7,
    shadowColor: "#171A1F3B",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 17,
    },
    shadowRadius: 35,
    elevation: 35,
  },
  toggleContainer: {
    alignItems: "center",
    marginBottom: height * 0.04,
    marginHorizontal: width * 0.05,
  },
  toggleWrapper: {
    flexDirection: "row",
    backgroundColor: Colors.Text,
    borderRadius: 6,
    padding: width * 0.005,
    width: width * 0.9,
  },
  toggleButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: height * 0.012,
    borderRadius: 6,
  },
  activeToggleButton: {
    backgroundColor: Colors.Accent,
  },
  toggleText: {
    color: Colors.Accent,
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  activeToggleText: {
    color: Colors.Text,
  },
  inputContainer: {
    alignItems: "flex-start",
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.05,
  },
  inputLabel: {
    color: Colors.Text,
    fontSize: width * 0.04,
    fontWeight: "bold",
    marginBottom: height * 0.005,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.Text,
    borderColor: "#D3D3D3",
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.04,
    width: width * 0.9,
    justifyContent: "space-between",
  },
  inputError: {
    borderColor: "#FF0000",
    borderWidth: 1,
  },
  inputIcon: {
    marginRight: width * 0.02,
  },
  textInput: {
    flex: 1,
    fontSize: width * 0.04,
    fontFamily: "Archivo-Regular",
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
    borderColor: "#D3D3D3",
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: height * 0.012,
    width: width * 0.28,
    marginHorizontal: width * 0.01,
    justifyContent: "space-between",
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  dropdownText: {
    fontSize: width * 0.04,
    fontFamily: "Archivo-Regular",
    textAlign: "center",
    flex: 1,
  },
  dropdownIconRight: {
    marginLeft: width * 0.02,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownMenu: {
    backgroundColor: Colors.Text,
    borderRadius: 6,
    maxHeight: height * 0.3,
    paddingVertical: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dropdownItemText: {
    fontSize: width * 0.04,
    color: Colors.textInput,
    textAlign: "center",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.012,
    width: width * 0.9,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOptionMale: {
    marginRight: width * 0.25,
  },
  radioIcon: {
    marginRight: width * 0.02,
  },
  radioText: {
    fontSize: width * 0.045,
    color: Colors.Text,
    fontFamily: "Archivo-Regular",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.05,
  },
  checkbox: {
    width: width * 0.06,
    height: width * 0.06,
    justifyContent: "center",
    alignItems: "center",
    marginRight: width * 0.015,
  },
  checkboxText: {
    color: Colors.Text,
    fontSize: width * 0.035,
    marginRight: width * 0.015,
    flexShrink: 1,
  },
  termsLinkText: {
    color: Colors.Accent,
    fontSize: width * 0.035,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  signUpButtonContainer: {
    position: "relative",
    alignItems: "center",
    marginTop: height * 0.03,
  },
  signUpButton: {
    alignItems: "center",
    backgroundColor: Colors.Accent,
    borderColor: Colors.Text,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: height * 0.015,
    marginHorizontal: width * 0.05,
    width: width * 0.9,
    shadowColor: "#171A1F1A",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 9,
    elevation: 9,
  },
  signUpButtonText: {
    color: Colors.Text,
    fontSize: width * 0.05,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.02,
  },
  loginPromptText: {
    color: Colors.Text,
    fontSize: width * 0.04,
  },
  loginLinkText: {
    color: Colors.Accent,
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  generalErrorText: {
    color: "#FF0000",
    fontSize: width * 0.04,
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  errorText: {
    color: "#FF0000",
    fontSize: width * 0.035,
    marginTop: height * 0.005,
  },
});