import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// SHARED
import Welcome from '../screens/shared/Welcome';
import TermsConditions from '../screens/shared/TermsConditions';
import Info from '../screens/shared/Info';
import LogIn from '../screens/shared/LogIn';
import SignUp from '../screens/shared/SignUp';
import SignUpInfo from '../screens/shared/SignUpInfo';
import SignUpMethod from '../screens/shared/SignUpMethod';

// Patient
import AddContact from '../screens/patient/AddContact';
import PAlerts from '../screens/patient/PAlerts';
import PatientHome from '../screens/patient/PatientHome';
import PMedicineReminder from '../screens/patient/PMedicineReminder';
import PEmergencyContacts from '../screens/patient/PEmergencyContacts';
import ContactInfo from '../screens/patient/ContactInfo';
import PAddMedicine from '../screens/patient/PAddMedicine';
import PChangeEmail from '../screens/patient/PChangeEmail';
import PChangePassword from '../screens/patient/PChangePassword';
import PChooseLanguage from '../screens/patient/PChooseLanguage';
import PChosenMedicine from '../screens/patient/PChosenMedicine';
import PDiseaseCheck from '../screens/patient/PDiseaseCheck';
import PDiseaseChecker from '../screens/patient/PDiseaseChecker';
import PDoctorLocator from '../screens/patient/PDoctorLocator';
import PEditMedicine from '../screens/patient/PEditMedicine';
import PHospitalLocator from '../screens/patient/PHospitalLocator';
import PMedicineInfo from '../screens/patient/PMedicineInfo';
import PPrivacy from '../screens/patient/PPrivacy';
import PProfile from '../screens/patient/PProfile';
import PProfileEdit from '../screens/patient/PProfileEdit';
import PSetting from '../screens/patient/PSetting';
import PVideoCall from '../screens/patient/PVideoCall';
import PChat from '../screens/patient/PChat';

// Companion
import CMedicineReminder from '../screens/companion/CMedicineReminder';
import CAlerts from '../screens/companion/CAlerts';
import AddPatient from '../screens/companion/AddPatient';
import PatientInfo from '../screens/companion/PatientInfo';
import Patients from '../screens/companion/Patients';
import CompanionHome from '../screens/companion/CompanionHome';
import CAddMedicine from '../screens/companion/CAddMedicine';
import CChangeEmail from '../screens/companion/CChangeEmail';
import CChangePassword from '../screens/companion/CChangePassword';
import CChooseLanguage from '../screens/companion/CChooseLanguage';
import CChosenMedicine from '../screens/companion/CChosenMedicine';
import CDiseaseCheck from '../screens/companion/CDiseaseCheck';
import CDiseaseChecker from '../screens/companion/CDiseaseChecker';
import CDoctorLocator from '../screens/companion/CDoctorLocator';
import CEditMedicine from '../screens/companion/CEditMedicine';
import CHospitalLocator from '../screens/companion/CHospitalLocator';
import CMedicineInfo from '../screens/companion/CMedicineInfo';
import CPrivacy from '../screens/companion/CPrivacy';
import CProfile from '../screens/companion/CProfile';
import CProfileEdit from '../screens/companion/CProfileEdit';
import CSetting from '../screens/companion/CSetting';
import CVideoCall from '../screens/companion/CVideoCall';
import CChat from '../screens/companion/CChat';

// لو عندك شاشة SwitchAccount تأكد أنك مستوردها هنا
// import SwitchAccount from '../screens/shared/SwitchAccount'; // مثال

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Shared Screens */}
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignUpInfo" component={SignUpInfo} />
      <Stack.Screen name="SignUpMethod" component={SignUpMethod} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
      {/* <Stack.Screen name="SwitchAccount" component={SwitchAccount} /> */}



      <Stack.Screen name="Home">
{(props) => {
  const { route } = props;
  const role = route.params?.role || 'shared';
  return role === 'patient' ? <PatientHome {...props} /> : <CompanionHome {...props} />;
}}
</Stack.Screen>


      {/* Patient Screens */}
      <Stack.Screen name="AddContact" component={AddContact} />
      <Stack.Screen name="PAlerts" component={PAlerts} />
      <Stack.Screen name="PatientHome" component={PatientHome} />
      <Stack.Screen name="PMedicineReminder" component={PMedicineReminder} />
      <Stack.Screen name="PEmergencyContacts" component={PEmergencyContacts} />
      <Stack.Screen name="ContactInfo" component={ContactInfo} />
      <Stack.Screen name="PAddMedicine" component={PAddMedicine} />
      <Stack.Screen name="PChangeEmail" component={PChangeEmail} />
      <Stack.Screen name="PChangePassword" component={PChangePassword} />
      <Stack.Screen name="PChooseLanguage" component={PChooseLanguage} />
      <Stack.Screen name="PChosenMedicine" component={PChosenMedicine} />
      <Stack.Screen name="PDiseaseCheck" component={PDiseaseCheck} />
      <Stack.Screen name="PDiseaseChecker" component={PDiseaseChecker} />
      <Stack.Screen name="PDoctorLocator" component={PDoctorLocator} />
      <Stack.Screen name="PEditMedicine" component={PEditMedicine} />
      <Stack.Screen name="PHospitalLocator" component={PHospitalLocator} />
      <Stack.Screen name="PMedicineInfo" component={PMedicineInfo} />
      <Stack.Screen name="PPrivacy" component={PPrivacy} />
      <Stack.Screen name="PProfile" component={PProfile} />
      <Stack.Screen name="PProfileEdit" component={PProfileEdit} />
      <Stack.Screen name="PSetting" component={PSetting} />
      <Stack.Screen name="PVideoCall" component={PVideoCall} />
      <Stack.Screen name="PChat" component={PChat} />

      {/* Companion Screens */}
      <Stack.Screen name="CMedicineReminder" component={CMedicineReminder} />
      <Stack.Screen name="CAlerts" component={CAlerts} />
      <Stack.Screen name="AddPatient" component={AddPatient} />
      <Stack.Screen name="PatientInfo" component={PatientInfo} />
      <Stack.Screen name="Patients" component={Patients} />
      <Stack.Screen name="CompanionHome" component={CompanionHome} />
      <Stack.Screen name="CAddMedicine" component={CAddMedicine} />
      <Stack.Screen name="CChangeEmail" component={CChangeEmail} />
      <Stack.Screen name="CChangePassword" component={CChangePassword} />
      <Stack.Screen name="CChooseLanguage" component={CChooseLanguage} />
      <Stack.Screen name="CChosenMedicine" component={CChosenMedicine} />
      <Stack.Screen name="CDiseaseCheck" component={CDiseaseCheck} />
      <Stack.Screen name="CDiseaseChecker" component={CDiseaseChecker} />
      <Stack.Screen name="CDoctorLocator" component={CDoctorLocator} />
      <Stack.Screen name="CEditMedicine" component={CEditMedicine} />
      <Stack.Screen name="CHospitalLocator" component={CHospitalLocator} />
      <Stack.Screen name="CMedicineInfo" component={CMedicineInfo} />
      <Stack.Screen name="CPrivacy" component={CPrivacy} />
      <Stack.Screen name="CProfile" component={CProfile} />
      <Stack.Screen name="CProfileEdit" component={CProfileEdit} />
      <Stack.Screen name="CSetting" component={CSetting} />
      <Stack.Screen name="CVideoCall" component={CVideoCall} />
      <Stack.Screen name="CChat" component={CChat} />







    </Stack.Navigator>
  );
}
