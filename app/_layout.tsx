import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    CircularBook: require('../assets/fonts/CircularStd-Book.otf'),
    CircularLight: require('../assets/fonts/CircularStd-Light.otf'),
    CooperHewittMedium: require('../assets/fonts/CooperHewitt-Medium.otf'),
    NTBrickSans: require('../assets/fonts/NTBrickSans.ttf'),
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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
import { Stack } from 'expo-router';
import ProfileScreen from '../components/ProfileScreen';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Stack>
  );
}
