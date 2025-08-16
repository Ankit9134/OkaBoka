import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider as PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <SafeAreaView
          style={{ flex: 1 }}
          edges={['right', 'left', 'bottom', 'top']}
        >

          <Stack>
            <Stack.Screen name="Auth" options={{ headerShown: false }} />
            <Stack.Screen name="Init" options={{ headerShown: false }} />
            <Stack.Screen name="Home" options={{ headerShown: false }} />
            <Stack.Screen name="screens/Imageselect" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}