import React from "react";
import {
  View,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../styles/colors';

const SignUpMethodImage = require('../../../assets/SignUpMethod.png');

const { width, height } = Dimensions.get("window");

export default function SignUpMethod({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ImageBackground
        source={SignUpMethodImage}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <View style={styles.overlay} />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          accessibilityLabel="Go back"
          accessibilityHint="Navigates to the previous screen"
        >
          <MaterialIcons name="arrow-back-ios" size={width * 0.06} color={Colors.Text} />
        </TouchableOpacity>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.centerContainer}>
            <Text style={styles.titleText}>Create an account</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignUp')}
            accessibilityLabel="Continue with Email"
            accessibilityHint="Navigates to the sign-up screen"
          >
            <MaterialIcons
              name="email"
              size={width * 0.06}
              color={Colors.Text}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Continue with Email</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => alert("Pressed!")}
            accessibilityLabel="Continue with Facebook"
            accessibilityHint="Signs up using Facebook account"
          >
            <FontAwesome
              name="facebook"
              size={width * 0.06}
              color={Colors.Text}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Continue with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => alert("Pressed!")}
            accessibilityLabel="Continue with Apple"
            accessibilityHint="Signs up using Apple account"
          >
            <Ionicons
              name="logo-apple"
              size={width * 0.07}
              color={Colors.Text}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => alert("Pressed!")}
            accessibilityLabel="Continue with Google"
            accessibilityHint="Signs up using Google account"
          >
            <FontAwesome
              name="google"
              size={width * 0.06}
              color={Colors.Text}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>

          <View style={styles.centerContainer}>
            <Text style={styles.termsText}>
              By continuing, you agree to Privacy Policy and Terms & Conditions
            </Text>
          </View>

          <View style={styles.centerContainer}>
            <View style={styles.loginRow}>
              <Text style={styles.loginPromptText}>Have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                <Text style={styles.loginLinkText}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  imageBackground: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: Colors.Accent,
    opacity: 0.6,
  },
  scrollView: {
    flex: 1,
    shadowColor: "#120F281C",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    elevation: 6,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: height * 0.095,
    left: width * 0.05,
    width: width * 0.06,
    height: width * 0.06,
    zIndex: 10,
  },
  centerContainer: {
    alignItems: "center",
    marginBottom: height * 0.015,
  },
  titleText: {
    color: Colors.Text,
    marginBottom: height * 0.05,
    fontSize: width * 0.08,
    fontFamily: 'Archivo-Medium',
    textAlign: 'center',
    marginTop: height * 0.055,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Accent,
    borderColor: Colors.Text,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: height * 0.015,
    marginBottom: height * 0.015,
    marginHorizontal: width * 0.05,
    width: width * 0.9,
  },
  buttonIcon: {
    marginRight: width * 0.02,
  },
  buttonText: {
    color: Colors.Text,
    fontSize: width * 0.045,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  termsText: {
    color: Colors.Text,
    fontSize: width * 0.03,
    fontFamily: 'Inter-Regular',
    textAlign: "center",
    width: width * 0.6,
    marginBottom: height * 0.07,
  },
  loginRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
  },
  loginPromptText: {
    color: Colors.Text,
    fontSize: width * 0.045,
    fontFamily: 'Inter-Regular',
    marginRight: width * 0.01,
    textAlign: 'center',
  },
  loginLinkText: {
    color: Colors.Accent,
    fontSize: width * 0.045,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
});