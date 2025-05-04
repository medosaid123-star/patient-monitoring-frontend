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
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../styles/colors";

const { width, height } = Dimensions.get("window");

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    let newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Please enter an email address.";
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Please enter a password.";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
      isValid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    try {
      // إزالة أي بيانات تسجيل سابقة
      await AsyncStorage.removeItem("signUpData");

      const signUpData = {
        email,
        password,
        passwordConfirm: confirmPassword,
      };
      await AsyncStorage.setItem("signUpData", JSON.stringify(signUpData));
      console.log("Stored signUpData:", signUpData);

      navigation.navigate("SignUpInfo", { email });
    } catch (error) {
      const errorMessage =
        error.message || "Failed to store data. Please try again.";
      console.error("Sign Up error:", errorMessage);
      setErrors({ ...newErrors, general: errorMessage });
    }
  };

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
              <Text style={styles.signUpText}>Sign up</Text>
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

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <View
            style={[
              styles.inputWrapper,
              errors.email && styles.inputError,
            ]}
          >
            <MaterialIcons
              name="email"
              size={width * 0.05}
              color="#A4B2AE"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Enter email"
              placeholderTextColor={Colors.textInput}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              style={[
                styles.textInput,
                { color: email ? Colors.Primary : Colors.textInput },
              ]}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="none"
              autoComplete="off"
            />
            {errors.email && (
              <MaterialIcons
                name="error"
                size={width * 0.05}
                color="#FF0000"
                style={styles.errorIcon}
              />
            )}
          </View>
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View
            style={[
              styles.inputWrapper,
              errors.password && styles.inputError,
            ]}
          >
            <MaterialIcons
              name="lock"
              size={width * 0.05}
              color="#A4B2AE"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Enter password"
              placeholderTextColor={Colors.textInput}
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
              style={[
                styles.textInput,
                { color: password ? Colors.Primary : Colors.textInput },
              ]}
              textContentType="none"
              autoComplete="off"
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <MaterialIcons
                name={passwordVisible ? "visibility" : "visibility-off"}
                size={width * 0.05}
                color="#A4B2AE"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
            {errors.password && (
              <MaterialIcons
                name="error"
                size={width * 0.05}
                color="#FF0000"
                style={styles.errorIcon}
              />
            )}
          </View>
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View
            style={[
              styles.inputWrapper,
              errors.confirmPassword && styles.inputError,
            ]}
          >
            <MaterialIcons
              name="lock"
              size={width * 0.05}
              color="#A4B2AE"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Confirm password"
              placeholderTextColor={Colors.textInput}
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword)
                  setErrors({ ...errors, confirmPassword: "" });
              }}
              style={[
                styles.textInput,
                {
                  color: confirmPassword
                    ? Colors.Primary
                    : Colors.textInput,
                },
              ]}
              textContentType="none"
              autoComplete="off"
            />
            <TouchableOpacity
              onPress={() =>
                setConfirmPasswordVisible(!confirmPasswordVisible)
              }
            >
              <MaterialIcons
                name={confirmPasswordVisible ? "visibility" : "visibility-off"}
                size={width * 0.05}
                color="#A4B2AE"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
            {errors.confirmPassword && (
              <MaterialIcons
                name="error"
                size={width * 0.05}
                color="#FF0000"
                style={styles.errorIcon}
              />
            )}
          </View>
          {errors.confirmPassword ? (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          ) : null}
        </View>

        <View style={styles.signUpButtonContainer}>
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.centerContainer}>
          <Text style={styles.orText}>OR SIGN UP WITH</Text>
        </View>

        <View style={styles.socialContainer}>
          <View style={styles.socialIcons}>
            <TouchableOpacity
              onPress={() => console.log("Google signup pressed!")}
            >
              <FontAwesome
                name="google"
                size={width * 0.06}
                color={Colors.Text}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log("Facebook signup pressed!")}
            >
              <FontAwesome
                name="facebook"
                size={width * 0.06}
                color={Colors.Text}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log("Apple signup pressed!")}
            >
              <Ionicons
                name="logo-apple"
                size={width * 0.06}
                color={Colors.Text}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
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
    paddingTop: height * 0.1,
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
    borderColor: "#00000000",
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.04,
    width: width * 0.9,
  },
  inputError: {
    borderColor: "#FF0000",
    borderWidth: 1,
  },
  inputIcon: {
    color: Colors.textInput,
    opacity: 0.9,
    marginRight: width * 0.02,
  },
  textInput: {
    fontSize: width * 0.04,
    flex: 1,
  },
  eyeIcon: {
    color: Colors.textInput,
    opacity: 0.5,
    marginLeft: width * 0.02,
  },
  errorIcon: {
    position: "absolute",
    right: width * 0.02,
    top: -height * 0.03,
  },
  errorText: {
    color: "#FF0000",
    fontSize: width * 0.035,
    marginTop: height * 0.005,
  },
  generalErrorText: {
    color: "#FF0000",
    fontSize: width * 0.04,
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  signUpButtonContainer: {
    position: "relative",
    alignItems: "center",
    marginTop: height * 0.015,
  },
  signUpButton: {
    alignItems: "center",
    backgroundColor: Colors.Accent,
    borderColor: Colors.Text,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: height * 0.015,
    marginHorizontal: width * 0.05,
    marginTop: height * 0.04,
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
  centerContainer: {
    alignItems: "center",
    marginTop: height * 0.03,
    marginBottom: height * 0.015,
  },
  orText: {
    color: Colors.Text,
    fontSize: width * 0.03,
    textTransform: "uppercase",
  },
  socialContainer: {
    alignItems: "center",
    marginBottom: height * 0.03,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialIcon: {
    marginHorizontal: width * 0.035,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
});