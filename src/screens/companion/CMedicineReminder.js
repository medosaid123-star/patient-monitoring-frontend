import React, { useState } from "react";
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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontLoader from "../../components/FontLoader";
import { Colors } from "../../styles/colors";

const { width, height } = Dimensions.get("window");

const PMedicineReminder = ({ navigation }) => {
  const [selectedNav, setSelectedNav] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // قائمة الأدوية
  const medicines = [
	{ name: "Atenolol", dosage: "100gm", frequency: "Every 5 hours" },
	{ name: "Methyldopa", dosage: "250mg", frequency: "Twice Daily" },
	{ name: "Nifedipine", dosage: "120mg", frequency: "Once Daily" },
	{ name: "Hydralazine", dosage: "50mg", frequency: "3 Times Daily" },
  ];

  const filteredMedicines = medicines.filter((medicine) =>
	medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // تجميع الـ cards في صفوف (cardين لكل صف)
  const rows = filteredMedicines.reduce((rows, card, index) => {
	if (index % 2 === 0) {
	  rows.push([card]);
	} else {
	  rows[rows.length - 1].push(card);
	}
	return rows;
  }, []);

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
			  name="pill"
			  size={width * 0.06}
			  color={Colors.lightText}
			  style={styles.headerIcon}
			/>
			<Text style={styles.title}>MEDICINE REMINDER</Text>
		  </View>

		  {/* Search Bar */}
		  <View style={styles.searchBarContainer}>
			<MaterialIcons
			  name="search"
			  size={width * 0.05}
			  color={Colors.border}
			  style={styles.searchIcon}
			/>
			<TextInput
			  style={styles.searchInput}
			  placeholder="Search medicines"
			  placeholderTextColor={Colors.textInput}
			  value={searchQuery}
			  onChangeText={setSearchQuery}
			/>
		  </View>

		  {/* Add Medicine Button */}
		  <TouchableOpacity
			style={styles.addMedicineButton}
			onPress={() => navigation.navigate("CAddMedicine")}
		  >
			<MaterialIcons
			  name="medication-liquid"
			  size={width * 0.15}
			  color={Colors.lightText}
			  style={styles.addMedicineIcon}
			/>
			<Text style={styles.addMedicineText}>Add Medicine</Text>
		  </TouchableOpacity>

		  {/* Medicines Grid */}
		  <View style={styles.medicinesContainer}>
			{rows.map((row, rowIndex) => (
			  <View key={rowIndex} style={styles.medicinesRow}>
				{row.map((card) => (
				  <TouchableOpacity
					key={card.name}
					style={styles.medicineCard}
					onPress={() => navigation.navigate("CChosenMedicine", { medicine: card })}
				  >
					<View style={styles.medicineInfo}>
					  <MaterialCommunityIcons
						name="pill"
						size={width * 0.08}
						color={Colors.Accent}
						style={styles.medicineIcon}
					  />
					  <Text style={styles.medicineTitle}>{card.name}</Text>
					</View>
					<Text style={styles.medicineDosage}>{card.dosage}</Text>
					<Text style={styles.medicineFrequency}>{card.frequency}</Text>
				  </TouchableOpacity>
				))}
				{row.length === 1 && <View style={styles.medicineCardPlaceholder} />}
			  </View>
			))}
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
				navigation.navigate("PMedicineReminder");
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

export default PMedicineReminder;

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
	flexDirection: "row",
	alignItems: "center",
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
	fontFamily: "Inter-Bold",
  },
  searchBarContainer: {
	flexDirection: "row",
	alignItems: "center",
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
	color: Colors.Text, // تم تعديله من Colors.Primary
	fontSize: width * 0.045,
	fontFamily: "Inter-Regular",
  },
  searchIcon: {
	marginRight: width * 0.02,
  },
  addMedicineButton: {
	flexDirection: "row",
	alignItems: "center",
	backgroundColor: `${Colors.white}40`,
	borderRadius: width * 0.03,
	paddingVertical: height * 0.01,
	paddingHorizontal: width * 0.05,
	marginBottom: height * 0.03,
	marginHorizontal: width * 0.06,
  },
  addMedicineIcon: {
	marginRight: width * 0.03,
  },
  addMedicineText: {
	color: Colors.Text,
	fontSize: width * 0.045,
	fontFamily: "Inter-Bold",
  },
  medicinesContainer: {
	paddingHorizontal: width * 0.04,
  },
  medicinesRow: {
	flexDirection: "row",
	justifyContent: "space-between",
	marginBottom: height * 0.03,
  },
  medicineCard: {
	width: (width - width * 0.12) / 2,
	alignItems: "center",
	backgroundColor: Colors.navBackground,
	borderRadius: 12,
	paddingVertical: height * 0.025,
	paddingHorizontal: width * 0.03,
	shadowColor: Colors.shadow,
	shadowOpacity: 0.2,
	shadowOffset: { width: 0, height: 4 },
	shadowRadius: 8,
	elevation: 5,
  },
  medicineCardPlaceholder: {
	width: (width - width * 0.12) / 2,
	backgroundColor: "transparent",
  },
  medicineInfo: {
	flexDirection: "row",
	alignItems: "center",
	marginBottom: height * 0.01,
  },
  medicineIcon: {
	marginRight: width * 0.02,
  },
  medicineTitle: {
	color: Colors.Accent,
	fontSize: width * 0.045,
	fontFamily: "Inter-Bold",
	flex: 1,
  },
  medicineDosage: {
	color: Colors.Accent,
	fontSize: width * 0.04,
	fontFamily: "Inter-Regular",
	marginBottom: height * 0.005,
  },
  medicineFrequency: {
	color: Colors.textInput,
	fontSize: width * 0.04,
	fontFamily: "Inter-Regular",
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
	paddingHorizontal: width * 0.05,
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
	fontFamily: "Inter-Bold",
  },
  activeNavText: {
	color: Colors.white,
	fontFamily: "Inter-Bold",
  },
});
