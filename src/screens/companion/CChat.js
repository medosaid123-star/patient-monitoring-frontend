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
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontLoader from "../../components/FontLoader"; // Adjust path
import { Colors } from "../../styles/colors";

const { width, height } = Dimensions.get("window");

export default function Chat({ navigation, route }) {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  // Extract recipient data from route params (e.g., from PatientProfile)
  const recipient = route?.params?.recipient || { name: "Mary Doe", status: "Online" };

  // Log navigation to debug
  useEffect(() => {
    console.log("Chat screen opened with recipient:", recipient);
  }, []);

  // Simulate initial messages (optional, remove if not needed)
  useEffect(() => {
    if (isFontLoaded) {
      setMessages([
        { text: "Hello! How can I assist you today?", isSender: false, type: "text" },
      ]);
    }
  }, [isFontLoaded]);

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages([
        ...messages,
        { text: inputText, isSender: true, type: "text" },
      ]);
      setInputText("");
      // Simulate receiver response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "Thanks for your message!", isSender: false, type: "text" },
        ]);
      }, 1000);
    }
  };

  const sendFile = () => {
    setMessages([
      ...messages,
      {
        text: "Document1.docx",
        isSender: true,
        type: "file",
        size: "12MB",
        date: new Date().toLocaleDateString(),
      },
    ]);
  };

  // Handle font loading state
  const handleFontLoad = () => {
    setIsFontLoaded(true);
  };

  if (!isFontLoaded) {
    return (
      <FontLoader onFontsLoaded={handleFontLoad}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.background }}>
          <ActivityIndicator size="large" color={Colors.Accent} />
          <Text style={{ color: Colors.Text, fontSize: width * 0.04, marginTop: height * 0.02 }}>
            جارٍ تحميل الخطوط...
          </Text>
        </View>
      </FontLoader>
    );
  }

  return (
    <FontLoader>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <MaterialIcons
                name="arrow-back-ios"
                size={width * 0.06}
                color={Colors.Text}
              />
            </TouchableOpacity>
            <View style={styles.profileContainer}>
              <Text style={styles.username}>{recipient.name}</Text>
              <Text style={styles.status}>{recipient.status}</Text>
            </View>
            <MaterialIcons
              name="account-circle"
              size={width * 0.15}
              color={Colors.Accent}
            />
          </View>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
          >
            {messages.map((message, index) => (
              <View
                key={index}
                style={[
                  styles.messageContainer,
                  message.isSender
                    ? styles.senderMessage
                    : styles.receiverMessage,
                ]}
              >
                {message.type === "text" ? (
                  <Text
                    style={[
                      styles.messageText,
                      message.isSender
                        ? styles.senderText
                        : styles.receiverText,
                    ]}
                  >
                    {message.text}
                  </Text>
                ) : (
                  <View style={styles.fileContainer}>
                    <MaterialIcons
                      name="description"
                      size={width * 0.06}
                      color={Colors.Primary}
                    />
                    <Text style={styles.fileName}>{message.text}</Text>
                    <Text style={styles.fileSize}>{message.size}</Text>
                    <Text style={styles.fileDate}>{message.date}</Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={sendFile}>
              <MaterialIcons
                name="attach-file"
                size={width * 0.06}
                color={Colors.textInput}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="اكتب رسالة"
              placeholderTextColor={Colors.textInput}
              value={inputText}
              onChangeText={setInputText}
              style={styles.textInput}
            />
            <TouchableOpacity onPress={sendMessage}>
              <MaterialIcons
                name="send"
                size={width * 0.06}
                color={Colors.Accent}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </FontLoader>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // #0C3C63
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.background,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: height * 0.003 },
    shadowRadius: width * 0.015,
    elevation: 6,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.02,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.05,
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.05,
  },
  backButton: {
    marginRight: width * 0.05,
  },
  profileContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  username: {
    color: Colors.Text,
    fontSize: width * 0.06,
    fontFamily: "Inter-Bold",
  },
  status: {
    color: Colors.textInput,
    fontSize: width * 0.035,
    fontFamily: "Inter-Regular",
  },
  messageContainer: {
    marginBottom: height * 0.02,
    maxWidth: width * 0.7,
  },
  senderMessage: {
    alignSelf: "flex-end",
  },
  receiverMessage: {
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: width * 0.035,
    fontFamily: "Inter-Regular",
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    borderRadius: width * 0.04,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  senderText: {
    backgroundColor: Colors.Accent,
    color: Colors.Text,
  },
  receiverText: {
    backgroundColor: Colors.navBackground,
    color: Colors.Primary,
  },
  fileContainer: {
    backgroundColor: Colors.Accent,
    borderRadius: width * 0.04,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: width * 0.03,
    flexDirection: "row",
    alignItems: "center",
  },
  fileName: {
    color: Colors.Text,
    fontSize: width * 0.035,
    fontFamily: "Inter-Bold",
    flex: 1,
    marginLeft: width * 0.02,
  },
  fileSize: {
    color: Colors.textInput,
    fontSize: width * 0.03,
    fontFamily: "Inter-Regular",
  },
  fileDate: {
    color: Colors.textInput,
    fontSize: width * 0.03,
    fontFamily: "Inter-Regular",
    marginLeft: width * 0.02,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.navBackground,
    borderRadius: width * 0.03,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    marginHorizontal: width * 0.05,
    marginBottom: height * 0.02,
  },
  textInput: {
    flex: 1,
    fontSize: width * 0.035,
    fontFamily: "Inter-Regular",
    color: Colors.Primary,
    marginHorizontal: width * 0.02,
  },
});