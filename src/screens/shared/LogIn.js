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
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../api/apiClient";
import { Colors } from "../../styles/colors";

const { width, height } = Dimensions.get("window");

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogIn = async () => {
    let newErrors = { email: "", password: "", general: "" };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Please enter an email address.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
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

    setErrors(newErrors);

    if (!isValid) return;

    setIsLoading(true);
    try {
      const response = await apiClient.post("/api/users/login", {
        email,
        password,
      });

      const { token, data: { user } } = response.data;

      // تخزين التوكن وبيانات المستخدم في AsyncStorage
      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify({
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
        })
      );

      console.log("Log In successful:", response.data);

      // التنقل بناءً على دور المستخدم
      navigation.navigate("Home", { role: user.role });
    } catch (error) {
      let errorMessage = "Failed to log in. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setErrors({ ...newErrors, general: errorMessage });
      console.error("Log In error:", errorMessage);
    } finally {
      setIsLoading(false);
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
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.loginText}>Log In</Text>
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
        {errors.general && (
          <Text style={styles.generalErrorText}>{errors.general}</Text>
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
            <MaterialIcons
              name="email"
              size={width * 0.05}
              color="#A4B2AE"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Enter email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              style={styles.textInput}
              autoCapitalize="none"
              keyboardType="email-address"
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
          {errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View
            style={[styles.inputWrapper, errors.password && styles.inputError]}
          >
            <MaterialIcons
              name="lock"
              size={width * 0.05}
              color="#A4B2AE"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Enter password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
              style={styles.textInput}
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
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>

        <View style={styles.loginButtonContainer}>
          <FontAwesome
            name="stethoscope"
            size={width * 0.2}
            color={Colors.Text}
            style={styles.stethoscopeIcon}
          />
          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.disabledButton]}
            onPress={handleLogIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.Text} />
            ) : (
              <Text style={styles.loginButtonText}>Log In</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.centerContainer}>
          <Text style={styles.orText}>OR LOG IN WITH</Text>
        </View>

        <View style={styles.socialContainer}>
          <View style={styles.socialIcons}>
            <TouchableOpacity
              onPress={() => console.log("Google login pressed!")}
            >
              <FontAwesome
                name="google"
                size={width * 0.06}
                color={Colors.Text}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log("Facebook login pressed!")}
            >
              <FontAwesome
                name="facebook"
                size={width * 0.06}
                color={Colors.Text}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log("Apple login pressed!")}
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
      </View>

      <SafeAreaView style={styles.safeAreaBottom} edges={["bottom"]} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#D9EEFF",
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
  loginText: {
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
    backgroundColor: "#F3F4F6",
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
    color: Colors.textInput,
    opacity: 0.9,
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
  loginButtonContainer: {
    position: "relative",
    alignItems: "center",
    marginTop: height * 0.02,
  },
  loginButton: {
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
  disabledButton: {
    opacity: 0.6,
  },
  loginButtonText: {
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
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialIcon: {
    marginHorizontal: width * 0.035,
  },
});