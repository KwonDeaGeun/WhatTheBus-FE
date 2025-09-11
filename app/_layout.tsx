import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


import { useColorScheme } from '@/hooks/useColorScheme';
import { useEffect } from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Web-only: Prevent default gesture and control touchmove for canvas/map
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const gestureHandler = (e: Event) => {
        e.preventDefault();
      };
      const touchMoveHandler = (e: TouchEvent) => {
        const target = e.target as HTMLElement;
        if (
          (target.tagName === 'CANVAS') ||
          (typeof target.closest === 'function' && target.closest('#map'))
        ) {
          e.stopPropagation(); // Prevent RN WebView scroll
        }
      };
      document.addEventListener('gesturestart', gestureHandler);
      document.addEventListener('touchmove', touchMoveHandler, { passive: false });
      return () => {
        document.removeEventListener('gesturestart', gestureHandler);
        document.removeEventListener('touchmove', touchMoveHandler);
      };
    }
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
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
