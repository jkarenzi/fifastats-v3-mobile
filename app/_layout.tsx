import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Toast, { BaseToast, ErrorToast, BaseToastProps } from 'react-native-toast-message';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Entypo } from '@expo/vector-icons';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  const toastConfig = {

    success: (props:BaseToastProps) => (
      <BaseToast
        {...props}
        style={{
          borderLeftWidth: 0
        }}
        contentContainerStyle={{
          backgroundColor: '#22C55E',
          borderRadius: 5
        }}
        text1Style={{
          fontSize: 15,
          fontWeight: 600,
          fontFamily: 'Poppins-Medium',
          color: 'white'
        }}
      />
    ),
    error: (props:BaseToastProps) => (
        <ErrorToast
          {...props}
          style={{
            borderLeftWidth: 0
          }}
          contentContainerStyle={{
            backgroundColor: '#EF4444',
            borderRadius: 5
          }}
          text1Style={{
            fontSize: 15,
            fontWeight: 600,
            fontFamily: 'Poppins-Medium',
            color: 'white'
          }}
        />
    ),
  }

  useEffect(() => {
    if (loaded) {
      new Promise(resolve => setTimeout(resolve, 3000)).then(() => {
        SplashScreen.hideAsync();
      });
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
        <Tabs.Screen name='index' options={{tabBarIcon: ({focused}) => (<Entypo name="home" size={24} color={focused?"#3A66BD":"grey"} />)}}/>
        <Tabs.Screen name='submitStats' options={{tabBarIcon: ({focused}) => (<FontAwesome5 name="pen-alt" size={20} color={focused?"#3A66BD":"grey"} />)}}/>
      </Tabs>
      <Toast config={toastConfig}/>
    </>
  );
}
