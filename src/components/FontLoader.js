import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useFonts, Archivo_400Regular, Archivo_500Medium } from '@expo-google-fonts/archivo';
import { Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { AbrilFatface_400Regular } from '@expo-google-fonts/abril-fatface';
import { Colors } from '../styles/colors';

export default function FontLoader({ children }) {
  const [fontsLoaded] = useFonts({
    'Archivo-Regular': Archivo_400Regular,
    'Archivo-Medium': Archivo_500Medium,
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-Bold': Inter_700Bold,
    'AbrilFatface-Regular': AbrilFatface_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.Primary }}>
        <ActivityIndicator size="large" color={Colors.Text} />
      </View>
    );
  }

  return <>{children}</>;
}