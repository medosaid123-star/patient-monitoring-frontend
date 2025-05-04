import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontLoader from "../../components/FontLoader"; // Adjust path if needed
import { Colors } from "../../styles/colors";

const { width, height } = Dimensions.get("window");

export default function MedicineDetails({ navigation }) {
  return (
    <FontLoader>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.background, // #0C3C63
        }}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <MaterialIcons
                name="arrow-back-ios"
                size={width * 0.06}
                color={Colors.Text} // #F1F8FE
              />
            </TouchableOpacity>
          </View>
          <View style={styles.medicineContainer}>
            <View style={styles.medicineHeader}>
              <MaterialCommunityIcons
                name="pill"
                size={width * 0.15}
                color={Colors.Accent} // #126591
              />
              <Text style={styles.medicineName}>Atenolol</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            {/* Uses Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Uses</Text>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                  Treats high blood pressure (hypertension).
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                  Manages angina (chest pain).
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                  Controls certain heart conditions like arrhythmias.
                </Text>
              </View>
            </View>

            {/* How It Works Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>How It Works</Text>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                  Slows the heart rate.
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                  Reduces the heart's workload.
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                  Helps lower blood pressure and prevent chest pain.
                </Text>
              </View>
            </View>

            {/* Side Effects Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Side Effects</Text>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>Fatigue.</Text>
              </View>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>Dizziness.</Text>
              </View>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>Slow heart rate.</Text>
              </View>
            </View>

            {/* Precautions Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Precautions</Text>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                  Use cautiously in people with asthma.
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                  Use cautiously in people with diabetes.
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                  Use cautiously in people with kidney issues.
                </Text>
              </View>
            </View>

            {/* Dosage Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Dosage</Text>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                  Usual dose ranges from 25 to 100 mg daily.
                </Text>
              </View>
            </View>

            {/* Important Notes Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Important Notes</Text>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                  Avoid stopping the medication suddenly.
                </Text>
              </View>
              <View style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                  Follow your healthcare provider’s guidance for dosing.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </FontLoader>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.background, // #0C3C63
    shadowColor: Colors.shadow, // #171A1F
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: height * 0.003,
    },
    shadowRadius: width * 0.015,
    elevation: 6,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: height * 0.15, // Increased for card spacing
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.05,
    marginBottom: height * 0.01,
    marginLeft: width * 0.03,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  medicineContainer: {
    alignItems: "center",
    marginBottom: height * 0.04,
  },
  medicineHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  medicineName: {
    color: Colors.lightText, // #D9E6F2
    fontSize: width * 0.12,
    fontFamily: "Inter-Bold",
    marginLeft: width * 0.03,
  },
  infoContainer: {
    marginHorizontal: width * 0.05,
    marginBottom: height * 0.05,
  },
  section: {
    backgroundColor: Colors.Text, // #FFFFFF
    opacity: 0.95, // Subtle frosted effect
    borderRadius: width * 0.03,
    padding: width * 0.04,
    marginBottom: height * 0.03,
    shadowColor: Colors.shadow, // #171A1F
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: height * 0.003 },
    shadowRadius: width * 0.015,
    elevation: 4,
  },
  sectionTitle: {
    color: Colors.Primary, // #0C3C63 for contrast on white background
    fontSize: width * 0.05,
    fontFamily: "Inter-Bold",
    marginBottom: height * 0.015,
    textAlign: "left",
  },
  bulletPoint: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: height * 0.01,
  },
  bullet: {
    color: Colors.Primary, // #0C3C63
    fontSize: width * 0.04,
    fontFamily: "Inter-Regular",
    marginRight: width * 0.02,
  },
  bulletText: {
    color: Colors.Primary, // #0C3C63
    fontSize: width * 0.04,
    fontFamily: "Inter-Regular",
    flex: 1,
  },
});