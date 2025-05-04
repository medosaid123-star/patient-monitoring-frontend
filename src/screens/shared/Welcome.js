import React from "react";
import { SafeAreaView, ScrollView, Image, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../styles/colors'; 
export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image 
          source={require('../../../assets/Logo.png')} 
          style={styles.image} 
        />

        <Text style={styles.text}>PressureGuard</Text>
        <Text style={styles.text2}>Wherever you are.</Text>

        {/* زر البدء */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUpMethod')}
          activeOpacity={0.8}
          accessibilityLabel="Get started"
          accessibilityHint="Navigates to the sign-up method screen"
        >
          <Text style={styles.text3}>Get started</Text>
        </TouchableOpacity>

        {/* زر المعلومات */}
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate('Info')}
          accessibilityLabel="Go to Info"
          accessibilityHint="Navigates to the info screen"
          activeOpacity={0.8}
        >
          <View style={styles.iconWrapper}>
            <MaterialIcons
              name="medical-information"
              size={24}
              color={Colors.Text}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Primary,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: Colors.Primary,
    paddingHorizontal: 20,
    justifyContent: 'center',
    shadowColor: "#120F281C",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    elevation: 6,
  },
  image: {
    width: 250, 
    height: 250,
    marginTop: 60,
    marginBottom: 60,
    alignSelf: 'center',
  },
  text: {
    color: Colors.Text,
    fontSize: 38,
    fontFamily: 'AbrilFatface-Regular', 
    textAlign: 'center',
    marginBottom: 10,
  },
  text2: {
    color: Colors.Text,
    fontSize: 19,
    fontFamily: 'Inter-Regular',
    marginBottom: 70,
    textAlign: 'center',
  },
  button: {
    width: 213,
    height: 52,
    backgroundColor: Colors.Accent,
    borderColor: Colors.Text,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 0,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#171A1F3D",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 17,
    },
    shadowRadius: 35,
    elevation: 35,
  },
  button2: {
    width: 120,
    height: 47,
    backgroundColor: Colors.Accent,
    borderColor: Colors.Text,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 0,
    marginBottom: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#171A1F3D",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 17,
    },
    shadowRadius: 35,
    elevation: 35,
  },
  iconWrapper: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text3: {
    color: Colors.Text,
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    lineHeight: 28,
    textAlign: 'center',
  },
});