import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Modal,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontLoader from "../../components/FontLoader";
import { Colors } from "../../styles/colors";

const { width, height } = Dimensions.get("window");

export default function PAddMedicine({ navigation }) {
  const [selectedType, setSelectedType] = useState("pill");
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [doseInterval, setDoseInterval] = useState("");
  const [startDay, setStartDay] = useState(null);
  const [startMonth, setStartMonth] = useState(null);
  const [startYear, setStartYear] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [endMonth, setEndMonth] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [errors, setErrors] = useState({
    medicineName: '',
    dosage: '',
    doseInterval: '',
    startDate: '',
    endDate: '',
  });
  const [showStartDayModal, setShowStartDayModal] = useState(false);
  const [showStartMonthModal, setShowStartMonthModal] = useState(false);
  const [showStartYearModal, setShowStartYearModal] = useState(false);
  const [showEndDayModal, setShowEndDayModal] = useState(false);
  const [showEndMonthModal, setShowEndMonthModal] = useState(false);
  const [showEndYearModal, setShowEndYearModal] = useState(false);

  // Date options
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());

  // Render dropdown item
  const renderDropdownItem = ({ item, onSelect, closeModal }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        onSelect(item);
        closeModal();
      }}
    >
      <Text style={styles.dropdownItemText}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const validateForm = () => {
    let newErrors = { medicineName: '', dosage: '', doseInterval: '', startDate: '', endDate: '' };
    let isValid = true;

    if (!medicineName.trim()) {
      newErrors.medicineName = 'Please enter a medicine name.';
      isValid = false;
    }

    if (!dosage.trim()) {
      newErrors.dosage = 'Please enter a dosage.';
      isValid = false;
    }

    if (!doseInterval.trim()) {
      newErrors.doseInterval = 'Please enter a dose interval.';
      isValid = false;
    } else if (!/^\d+$/.test(doseInterval.trim())) {
      newErrors.doseInterval = 'Dose interval must be a number.';
      isValid = false;
    }

    if (!startDay || !startMonth || !startYear) {
      newErrors.startDate = 'Please select a complete start date.';
      isValid = false;
    }

    if (!endDay || !endMonth || !endYear) {
      newErrors.endDate = 'Please select a complete end date.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    alert("Medicine Saved!");
    navigation.navigate("PMedicineReminder", {
      newMedicine: {
        name: medicineName || "Unknown",
        dosage: dosage || "N/A",
        frequency: doseInterval || "N/A",
        startDate: { day: startDay, month: startMonth, year: startYear },
        endDate: { day: endDay, month: endMonth, year: endYear },
      },
    });
  };

  return (
    <FontLoader>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          {/* Header with Back Button */}
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

          {/* Medicine Type Selection */}
          <View style={styles.typeContainer}>
            {["pill", "syringe", "tablet", "bottle"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  selectedType === type && styles.typeButtonActive,
                ]}
                onPress={() => setSelectedType(type)}
              >
                {type === "pill" ? (
                  <MaterialCommunityIcons
                    name="pill"
                    size={width * 0.05}
                    color={selectedType === type ? Colors.white : Colors.Primary}
                    style={styles.typeIcon}
                  />
                ) : (
                  <MaterialIcons
                    name={
                      type === "syringe"
                        ? "vaccines"
                        : type === "tablet"
                        ? "block"
                        : "medication-liquid"
                    }
                    size={width * 0.05}
                    color={selectedType === type ? Colors.white : Colors.Primary}
                    style={styles.typeIcon}
                  />
                )}
                <Text
                  style={[
                    styles.typeText,
                    selectedType === type && styles.typeTextActive,
                  ]}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Form Fields with Gradient Background */}
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[Colors.transparent, Colors.shadowGradient]}
            style={styles.headerGradient}
          >
            {/* Medicine Name */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Medicine Name</Text>
              <View style={[styles.inputWithIcon, errors.medicineName && styles.inputError]}>
                <MaterialCommunityIcons
                  name="pill"
                  size={width * 0.05}
                  color={Colors.Accent}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Enter medicine name"
                  placeholderTextColor={Colors.textInput}
                  value={medicineName}
                  onChangeText={(text) => {
                    setMedicineName(text);
                    if (errors.medicineName) setErrors({ ...errors, medicineName: '' });
                  }}
                  style={[styles.textInput, { color: medicineName ? Colors.Accent : Colors.textInput }]}
                />
                {errors.medicineName && (
                  <MaterialIcons
                    name="error"
                    size={width * 0.05}
                    color={Colors.error}
                    style={styles.errorIcon}
                  />
                )}
              </View>
            </View>

            {/* Dosage */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Dosage</Text>
              <View style={[styles.inputWithIcon, errors.dosage && styles.inputError]}>
                <MaterialCommunityIcons
                  name="pill"
                  size={width * 0.05}
                  color={Colors.Accent}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="e.g., 100gm"
                  placeholderTextColor={Colors.textInput}
                  value={dosage}
                  onChangeText={(text) => {
                    setDosage(text);
                    if (errors.dosage) setErrors({ ...errors, dosage: '' });
                  }}
                  style={[styles.textInput, { color: dosage ? Colors.Accent : Colors.textInput }]}
                />
                {errors.dosage && (
                  <MaterialIcons
                    name="error"
                    size={width * 0.05}
                    color={Colors.error}
                    style={styles.errorIcon}
                  />
                )}
              </View>
            </View>

            {/* Dose Interval */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Dose Interval (per day)</Text>
              <View style={[styles.inputWithIcon, errors.doseInterval && styles.inputError]}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={width * 0.05}
                  color={Colors.Accent}
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="e.g., 5"
                  placeholderTextColor={Colors.textInput}
                  value={doseInterval}
                  onChangeText={(text) => {
                    setDoseInterval(text);
                    if (errors.doseInterval) setErrors({ ...errors, doseInterval: '' });
                  }}
                  style={[styles.textInput, { color: doseInterval ? Colors.Accent : Colors.textInput }]}
                  keyboardType="numeric"
                />
                {errors.doseInterval && (
                  <MaterialIcons
                    name="error"
                    size={width * 0.05}
                    color={Colors.error}
                    style={styles.errorIcon}
                  />
                )}
              </View>
            </View>

            {/* Start Date */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Start Date</Text>
              <View style={[styles.datePickerContainer, errors.startDate && styles.inputErrorContainer]}>
                <View style={[styles.datePickerWrapper, errors.startDate && styles.inputError]}>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setShowStartDayModal(true)}
                  >
                    <Text
                      style={[
                        styles.dropdownText,
                        { color: startDay ? Colors.Accent : Colors.textInput },
                      ]}
                    >
                      {startDay || "Day"}
                    </Text>
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={width * 0.05}
                      color={Colors.textInput}
                      style={styles.dropdownIconRight}
                    />
                  </TouchableOpacity>
                  <Modal
                    visible={showStartDayModal}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowStartDayModal(false)}
                  >
                    <TouchableOpacity
                      style={styles.modalOverlay}
                      onPress={() => setShowStartDayModal(false)}
                    >
                      <View style={[styles.dropdownMenu, { width: width * 0.25 }]}>
                        <FlatList
                          data={days}
                          renderItem={({ item }) =>
                            renderDropdownItem({
                              item,
                              onSelect: (value) => {
                                setStartDay(value);
                                if (errors.startDate) setErrors({ ...errors, startDate: '' });
                              },
                              closeModal: () => setShowStartDayModal(false),
                            })
                          }
                          keyExtractor={(item) => item}
                          nestedScrollEnabled={true}
                        />
                      </View>
                    </TouchableOpacity>
                  </Modal>
                </View>
                <View style={[styles.datePickerWrapper, errors.startDate && styles.inputError]}>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setShowStartMonthModal(true)}
                  >
                    <Text
                      style={[
                        styles.dropdownText,
                        { color: startMonth ? Colors.Accent : Colors.textInput },
                      ]}
                    >
                      {startMonth || "Month"}
                    </Text>
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={width * 0.05}
                      color={Colors.textInput}
                      style={styles.dropdownIconRight}
                    />
                  </TouchableOpacity>
                  <Modal
                    visible={showStartMonthModal}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowStartMonthModal(false)}
                  >
                    <TouchableOpacity
                      style={styles.modalOverlay}
                      onPress={() => setShowStartMonthModal(false)}
                    >
                      <View style={[styles.dropdownMenu, { width: width * 0.25 }]}>
                        <FlatList
                          data={months}
                          renderItem={({ item }) =>
                            renderDropdownItem({
                              item,
                              onSelect: (value) => {
                                setStartMonth(value);
                                if (errors.startDate) setErrors({ ...errors, startDate: '' });
                              },
                              closeModal: () => setShowStartMonthModal(false),
                            })
                          }
                          keyExtractor={(item) => item}
                          nestedScrollEnabled={true}
                        />
                      </View>
                    </TouchableOpacity>
                  </Modal>
                </View>
                <View style={[styles.datePickerWrapper, errors.startDate && styles.inputError]}>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setShowStartYearModal(true)}
                  >
                    <Text
                      style={[
                        styles.dropdownText,
                        { color: startYear ? Colors.Accent : Colors.textInput },
                      ]}
                    >
                      {startYear || "Year"}
                    </Text>
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={width * 0.05}
                      color={Colors.textInput}
                      style={styles.dropdownIconRight}
                    />
                  </TouchableOpacity>
                  <Modal
                    visible={showStartYearModal}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowStartYearModal(false)}
                  >
                    <TouchableOpacity
                      style={styles.modalOverlay}
                      onPress={() => setShowStartYearModal(false)}
                    >
                      <View style={[styles.dropdownMenu, { width: width * 0.25 }]}>
                        <FlatList
                          data={years}
                          renderItem={({ item }) =>
                            renderDropdownItem({
                              item,
                              onSelect: (value) => {
                                setStartYear(value);
                                if (errors.startDate) setErrors({ ...errors, startDate: '' });
                              },
                              closeModal: () => setShowStartYearModal(false),
                            })
                          }
                          keyExtractor={(item) => item}
                          nestedScrollEnabled={true}
                        />
                      </View>
                    </TouchableOpacity>
                  </Modal>
                </View>
                {errors.startDate && (
                  <MaterialIcons
                    name="error"
                    size={width * 0.05}
                    color={Colors.error}
                    style={styles.errorIconDate}
                  />
                )}
              </View>
            </View>

            {/* End Date */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>End Date</Text>
              <View style={[styles.datePickerContainer, errors.endDate && styles.inputErrorContainer]}>
                <View style={[styles.datePickerWrapper, errors.endDate && styles.inputError]}>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setShowEndDayModal(true)}
                  >
                    <Text
                      style={[
                        styles.dropdownText,
                        { color: endDay ? Colors.Accent : Colors.textInput },
                      ]}
                    >
                      {endDay || "Day"}
                    </Text>
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={width * 0.05}
                      color={Colors.textInput}
                      style={styles.dropdownIconRight}
                    />
                  </TouchableOpacity>
                  <Modal
                    visible={showEndDayModal}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowEndDayModal(false)}
                  >
                    <TouchableOpacity
                      style={styles.modalOverlay}
                      onPress={() => setShowEndDayModal(false)}
                    >
                      <View style={[styles.dropdownMenu, { width: width * 0.25 }]}>
                        <FlatList
                          data={days}
                          renderItem={({ item }) =>
                            renderDropdownItem({
                              item,
                              onSelect: (value) => {
                                setEndDay(value);
                                if (errors.endDate) setErrors({ ...errors, endDate: '' });
                              },
                              closeModal: () => setShowEndDayModal(false),
                            })
                          }
                          keyExtractor={(item) => item}
                          nestedScrollEnabled={true}
                        />
                      </View>
                    </TouchableOpacity>
                  </Modal>
                </View>
                <View style={[styles.datePickerWrapper, errors.endDate && styles.inputError]}>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setShowEndMonthModal(true)}
                  >
                    <Text
                      style={[
                        styles.dropdownText,
                        { color: endMonth ? Colors.Accent : Colors.textInput },
                      ]}
                    >
                      {endMonth || "Month"}
                    </Text>
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={width * 0.05}
                      color={Colors.textInput}
                      style={styles.dropdownIconRight}
                    />
                  </TouchableOpacity>
                  <Modal
                    visible={showEndMonthModal}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowEndMonthModal(false)}
                  >
                    <TouchableOpacity
                      style={styles.modalOverlay}
                      onPress={() => setShowEndMonthModal(false)}
                    >
                      <View style={[styles.dropdownMenu, { width: width * 0.25 }]}>
                        <FlatList
                          data={months}
                          renderItem={({ item }) =>
                            renderDropdownItem({
                              item,
                              onSelect: (value) => {
                                setEndMonth(value);
                                if (errors.endDate) setErrors({ ...errors, endDate: '' });
                              },
                              closeModal: () => setShowEndMonthModal(false),
                            })
                          }
                          keyExtractor={(item) => item}
                          nestedScrollEnabled={true}
                        />
                      </View>
                    </TouchableOpacity>
                  </Modal>
                </View>
                <View style={[styles.datePickerWrapper, errors.endDate && styles.inputError]}>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setShowEndYearModal(true)}
                  >
                    <Text
                      style={[
                        styles.dropdownText,
                        { color: endYear ? Colors.Accent : Colors.textInput },
                      ]}
                    >
                      {endYear || "Year"}
                    </Text>
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={width * 0.05}
                      color={Colors.textInput}
                      style={styles.dropdownIconRight}
                    />
                  </TouchableOpacity>
                  <Modal
                    visible={showEndYearModal}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowEndYearModal(false)}
                  >
                    <TouchableOpacity
                      style={styles.modalOverlay}
                      onPress={() => setShowEndYearModal(false)}
                    >
                      <View style={[styles.dropdownMenu, { width: width * 0.25 }]}>
                        <FlatList
                          data={years}
                          renderItem={({ item }) =>
                            renderDropdownItem({
                              item,
                              onSelect: (value) => {
                                setEndYear(value);
                                if (errors.endDate) setErrors({ ...errors, endDate: '' });
                              },
                              closeModal: () => setShowEndYearModal(false),
                            })
                          }
                          keyExtractor={(item) => item}
                          nestedScrollEnabled={true}
                        />
                      </View>
                    </TouchableOpacity>
                  </Modal>
                </View>
                {errors.endDate && (
                  <MaterialIcons
                    name="error"
                    size={width * 0.05}
                    color={Colors.error}
                    style={styles.errorIconDate}
                  />
                )}
              </View>
            </View>
          </LinearGradient>
        </ScrollView>

        {/* Save Button (Fixed Position) */}
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>ADD</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNavBar}>
          <View style={styles.navWrapper}>
            {[
              { name: "Home", icon: "home", screen: "Home" },
              { name: "Medicine", icon: "pill", screen: "PMedicineReminder" },
              { name: "Account", icon: "person", screen: "PProfile" },
              { name: "PSettings", icon: "PSettings", screen: "PSetting" },
            ].map((item, index) => (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.navButton,
                  item.name === "Medicine" && styles.activeNavButton,
                ]}
                onPress={() =>
                  navigation.navigate(item.screen, {
                    role: item.screen === "Home" ? "patient" : undefined,
                  })
                }
              >
                {item.icon === "pill" ? (
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={width * 0.06}
                    color={item.name === "Medicine" ? "#F9F9F9" : "#126591"}
                    style={styles.navIcon}
                  />
                ) : (
                  <MaterialIcons
                    name={item.icon}
                    size={width * 0.06}
                    color={item.name === "Medicine" ? "#F9F9F9" : "#126591"}
                    style={styles.navIcon}
                  />
                )}
                <Text
                  style={[
                    styles.navText,
                    item.name === "Medicine" && styles.activeNavText,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
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
    justifyContent: "flex-start",
    marginTop: height * 0.02,
    marginHorizontal: width * 0.05,
  },
  backIcon: {
    marginRight: width * 0.03,
    marginBottom: height * 0.04,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.Text,
    borderRadius: 6,
    padding: width * 0.005,
    marginVertical: height * 0.02,
    marginHorizontal: width * 0.05,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 17,
    elevation: 17,
  },
  typeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.Text,
    borderRadius: 6,
    paddingVertical: height * 0.015,
    marginHorizontal: width * 0.002,
  },
  typeButtonActive: {
    backgroundColor: Colors.Accent,
  },
  typeIcon: {
    marginLeft: width * 0.04,
    marginRight: width * 0.01,
  },
  typeText: {
    color: Colors.Primary,
    fontSize: width * 0.035,
    fontFamily: "Inter-Regular",
    flex: 1,
  },
  typeTextActive: {
    color: Colors.Text,
    fontFamily: "Inter-Bold",
  },
  label: {
    color: Colors.lightText,
    fontSize: width * 0.045,
    fontFamily: "Inter",
    marginBottom: height * 0.005,
    marginLeft: width * 0.01,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.Text,
    borderColor: Colors.border,
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
  },
  inputIcon: {
    marginRight: width * 0.03,
  },
  textInput: {
    flex: 1,
    fontSize: Math.min(width * 0.04, 16),
    fontFamily: "Inter-Regular",
  },
  errorIcon: {
    marginLeft: width * 0.02,
  },
  headerGradient: {
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.01,
    marginBottom: height * 0.02,
  },
  formGradient: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingBottom: height * 0.04,
    marginBottom: height * 0.05,
  },
  fieldContainer: {
    marginBottom: height * 0.03,
    marginHorizontal: width * 0.05,
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
    paddingVertical: height * 0.013,
    width: width * 0.28,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: width * 0.02,
  },
  dropdownText: {
    fontSize: Math.min(width * 0.04, 16),
    fontFamily: 'Inter-Regular',
    flex: 1,
    textAlign: 'center',
  },
  dropdownIconRight: {
    marginLeft: width * 0.02,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.modalOverlay,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  inputError: {
    borderColor: Colors.error,
    borderWidth: 1.5,
  },
  inputErrorContainer: {
    position: 'relative',
  },
  errorIconDate: {
    position: 'absolute',
    right: width * 0.02,
    top: height * 0.015,
  },
  saveButtonContainer: {
    position: "absolute",
    bottom: height * 0.1,
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
});