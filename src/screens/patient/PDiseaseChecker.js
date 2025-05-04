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

const PPDiseaseChecker = ({ navigation }) => {
  const [selectedNav, setSelectedNav] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelectedNav(""); // لا يتم تحديد أي زر في البار السفلي
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setShowError(selectedSymptoms.length > 0 && selectedSymptoms.length < 3);
  }, [selectedSymptoms]);

  const handleSelectSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleCheck = () => {
    if (selectedSymptoms.length < 3) {
      setShowError(true);
    } else {
      setShowError(false);
      navigation.navigate('PDiseaseCheck', { symptoms: selectedSymptoms });
    }
  };

  // قائمة الأعراض مع تحديد نوع الأيقونة (MaterialIcons أو MaterialCommunityIcons)
  const symptoms = [
    { name: "Dizzy", icon: "blur-circular", iconType: "MaterialIcons" },
    { name: "Headache", icon: "psychology", iconType: "MaterialIcons" },
    { name: "Chest Pain", icon: "lungs", iconType: "MaterialCommunityIcons" },
    { name: "Cough", icon: "mask", iconType: "MaterialCommunityIcons" },
    { name: "Shortness of Breath", icon: "lungs", iconType: "MaterialCommunityIcons" },
    { name: "Stomach Pain", icon: "human-torso", iconType: "MaterialCommunityIcons" },
    { name: "Fever", icon: "sick", iconType: "MaterialCommunityIcons" },
    { name: "Nose Bleeds", icon: "face-man", iconType: "MaterialCommunityIcons" },
    { name: "Fatigue", icon: "bed", iconType: "MaterialIcons" },
    { name: "Nausea", icon: "vomit", iconType: "MaterialCommunityIcons" },
    { name: "Sore Throat", icon: "head-side-cough", iconType: "MaterialCommunityIcons" },
    { name: "Muscle Pain", icon: "bone", iconType: "MaterialIcons" },
    { name: "Rash", icon: "hand-okay", iconType: "MaterialCommunityIcons" },
    { name: "Diarrhea", icon: "toilet", iconType: "MaterialCommunityIcons" },
    { name: "Vomiting", icon: "vomit", iconType: "MaterialCommunityIcons" },
    { name: "Joint Pain", icon: "bone", iconType: "MaterialIcons" },
  ];

  const filteredSymptoms = symptoms.filter((symptom) =>
    symptom.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <FontLoader>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {/* Header */}
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
            <MaterialCommunityIcons
              name="stethoscope"
              size={width * 0.06}
              color={Colors.lightText}
              style={styles.headerIcon}
            />
            <Text style={styles.title}>DISEASE CHECKER</Text>
          </View>

          {/* Instructions */}
          <View style={styles.instructions}>
            <Text style={styles.instructionTitle}>Select what you feel now</Text>
            <Text style={styles.instructionSubtitle}>select at least 3</Text>
            {showError && (
              <Text style={styles.errorText}>Please select at least 3 symptoms</Text>
            )}
          </View>

          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <MaterialIcons name="search" size={width * 0.05} color={Colors.border} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search symptoms"
              placeholderTextColor={Colors.textInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Symptoms Grid */}
          <View style={styles.symptomsContainer}>
            {filteredSymptoms.length > 0 ? (
              filteredSymptoms.map((symptom, index) => {
                const IconComponent = symptom.iconType === "MaterialIcons" ? MaterialIcons : MaterialCommunityIcons;
                return (
                  <TouchableOpacity
                    key={symptom.name}
                    style={[
                      styles.symptomItem,
                      selectedSymptoms.includes(symptom.name) && styles.selectedSymptom,
                      index % 2 === 0 && styles.symptomItemRight,
                    ]}
                    onPress={() => handleSelectSymptom(symptom.name)}
                    activeOpacity={0.8}
                  >
                    <IconComponent
                      name={symptom.icon}
                      size={width * 0.1}
                      color={selectedSymptoms.includes(symptom.name) ? Colors.lightText : Colors.Accent}
                      style={styles.symptomIcon}
                    />
                    <Text
                      style={[
                        styles.symptomText,
                        selectedSymptoms.includes(symptom.name) && styles.selectedSymptomText,
                      ]}
                    >
                      {symptom.name}
                    </Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text style={styles.noResultsText}>No symptoms found</Text>
            )}
          </View>
        </ScrollView>

        {/* Fixed Check Button */}
        <TouchableOpacity
          style={styles.checkButton}
          onPress={handleCheck}
          activeOpacity={0.8}
        >
          <Text style={styles.checkButtonText}>CHECK</Text>
        </TouchableOpacity>

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

export default PPDiseaseChecker;

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
    paddingBottom: height * 0.2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.05,
    marginBottom: height * 0.03,
    marginLeft: width * 0.05,
  },
  backButton: {
    marginRight: width * 0.03,
  },
  headerIcon: {
    marginRight: width * 0.02,
  },
  title: {
    color: Colors.lightText,
    fontSize: width * 0.05,
    fontFamily: 'Inter-Bold',
  },
  instructions: {
    marginBottom: height * 0.02,
    marginLeft: width * 0.05,
  },
  instructionTitle: {
    color: Colors.lightText,
    fontSize: width * 0.06,
    fontFamily: 'Inter-Bold',
  },
  instructionSubtitle: {
    color: Colors.white,
    fontSize: width * 0.035,
    fontFamily: 'Inter-Regular',
    marginLeft: width * 0.005,
  },
  errorText: {
    color: Colors.error,
    fontSize: width * 0.035,
    fontFamily: 'Inter-Regular',
    marginTop: height * 0.005,
    marginLeft: width * 0.005,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.navBackground,
    borderColor: Colors.border,
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.05,
  },
  searchInput: {
    flex: 1,
    color: Colors.Text,
    fontSize: width * 0.045,
    fontFamily: 'Inter-Regular',
  },
  searchIcon: {
    marginRight: width * 0.02,
  },
  symptomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: width * 0.05,
  },
  symptomItem: {
    width: width * 0.42,
    alignItems: 'center',
    backgroundColor: Colors.navBackground,
    borderRadius: 12,
    paddingVertical: height * 0.025,
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.03,
  },
  symptomItemRight: {
    marginRight: width * 0.05,
  },
  selectedSymptom: {
    backgroundColor: Colors.Accent,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 17,
    elevation: 17,
  },
  symptomIcon: {
    marginBottom: height * 0.01,
  },
  symptomText: {
    color: Colors.Accent,
    fontSize: width * 0.045,
    fontFamily: 'Inter-Bold',
  },
  selectedSymptomText: {
    color: Colors.lightText,
  },
  noResultsText: {
    color: Colors.lightText,
    fontSize: width * 0.045,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginVertical: height * 0.03,
    width: width * 0.9,
  },
  checkButton: {
    position: 'absolute',
    bottom: height * 0.12,
    left: width * 0.3,
    right: width * 0.3,
    alignItems: 'center',
    backgroundColor: Colors.Accent,
    borderRadius: 12,
    paddingVertical: height * 0.015,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 17,
    elevation: 17,
  },
  checkButtonText: {
    color: Colors.white,
    fontSize: width * 0.05,
    fontFamily: 'Inter-Bold',
  },
  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width,
    alignItems: 'center',
    backgroundColor: Colors.navBackground,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1,
    elevation: 1,
  },
  navWrapper: {
    flexDirection: 'row',
    backgroundColor: Colors.navBackground,
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
