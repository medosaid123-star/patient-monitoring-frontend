import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Colors } from '../../styles/colors';

const { width, height } = Dimensions.get("window");

// Sample contacts data
const initialContacts = [
  { id: '1', name: 'Jane Smith', relation: 'Daughter' },
  { id: '2', name: 'Lisa John', relation: 'Family Contact' },
  { id: '3', name: 'David Mark', relation: 'Doctor Contact' },
  { id: '4', name: 'Sarah Brown', relation: 'Sister' },
];

export default function PEmergencyContacts({ navigation, route }) {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  const [selectedNav, setSelectedNav] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState(initialContacts);
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  // Update contacts when a new contact is added
  useEffect(() => {
    if (route.params?.newContact) {
      const updatedContacts = [...contacts, route.params.newContact];
      setContacts(updatedContacts);
      setFilteredContacts(updatedContacts);
    }
  }, [route.params?.newContact]);

  if (!fontsLoaded) {
    return null;
  }

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    if (query === '') {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(query)
      );
      setFilteredContacts(filtered);
    }
  };

  const renderContact = ({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => navigation.navigate('ContactInfo', { contact: item })}
    >
      <MaterialCommunityIcons
        name="account"
        size={width * 0.15}
        color={Colors.Accent}
        style={styles.contactIcon}
      />
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.contactRelation}>{item.relation}</Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back-ios"
            size={width * 0.06}
            color={Colors.lightText}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <MaterialIcons
          name="contact-emergency"
          size={width * 0.05}
          color={Colors.lightText}
          style={styles.headerIcon}
        />
        <Text style={styles.headerText}>Emergency Contacts</Text>
      </View>
      <View style={styles.searchBar}>
        <MaterialIcons
          name="search"
          size={width * 0.05}
          color={Colors.textInput}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={Colors.textInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>
      <TouchableOpacity
        style={styles.AddContactButton}
        onPress={() => navigation.navigate('AddContact')}
      >
        <MaterialCommunityIcons
          name="account-plus"
          size={width * 0.15}
          color={Colors.lightText}
          style={styles.AddContactIcon}
        />
        <Text style={styles.AddContactText}>Add Emergency Contact</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={filteredContacts}
        renderItem={renderContact}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.contactRow}
        contentContainerStyle={styles.contactList}
        ListHeaderComponent={renderHeader}
      />
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
              color={selectedNav === "Home" ? "#F9F9F9" : "#126591"}
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
              color={selectedNav === "Medicine" ? "#F9F9F9" : "#126591"}
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
              color={selectedNav === "Account" ? "#F9F9F9" : "#126591"}
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
              color={selectedNav === "Settings" ? "#F9F9F9" : "#126591"}
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
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background, // #0C3C63
  },
  contactList: {
    paddingHorizontal: width * 0.025,
    paddingBottom: height * 0.15, // Space for bottom nav bar
  },
  contactRow: {
    justifyContent: 'space-between',
    marginBottom: height * 0.03,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.05,
    marginBottom: height * 0.01,
    marginLeft: width * 0.03,
  },
  backIcon: {
    marginRight: width * 0.03,
  },
  headerIcon: {
    marginRight: width * 0.02,
  },
  headerText: {
    color: Colors.lightText,
    fontSize: width * 0.05,
    fontFamily: 'Inter_700Bold',
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.navBackground,
    borderColor: Colors.border,
    borderRadius: width * 0.03,
    borderWidth: 1,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.03,
    marginHorizontal: width * 0.06,
  },
  searchIcon: {
    marginRight: width * 0.02,
  },
  searchInput: {
    flex: 1,
    color: Colors.Primary,
    fontSize: width * 0.045,
    fontFamily: 'Inter_400Regular',
  },
  AddContactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${Colors.white}40`,
    borderRadius: width * 0.03,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.03,
    marginHorizontal: width * 0.06,
  },
  AddContactIcon: {
    marginRight: width * 0.03,
  },
  AddContactText: {
    color: Colors.Text,
    fontSize: width * 0.045,
    fontFamily: 'Inter_700Bold',
  },
  contactItem: {
    width: width * 0.42,
    alignItems: 'center',
  },
  contactIcon: {
    backgroundColor: Colors.secBG,
    borderRadius: width * 0.5, // Half of icon size for circle
    padding: width * 0.07,
    marginBottom: height * 0.01,
  },
  contactName: {
    color: Colors.Text,
    fontSize: width * 0.04,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },
  contactRelation: {
    color: Colors.textInput,
    fontSize: width * 0.035,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
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
    fontFamily: 'Inter_700Bold',
  },
  activeNavText: {
    color: "#F9F9F9",
    fontFamily: 'Inter_700Bold',
  },
});