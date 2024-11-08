import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useMemo, useState } from 'react';
import 'react-native-reanimated';
import 'react-native-url-polyfill/auto';
import { EasyTeamProvider } from '@easyteam/ui';

import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjoxLCJsb2NhdGlvbklkIjoxLCJvcmdhbml6YXRpb25JZCI6MSwicGFydG5lcklkIjoiZDQwZTJmOTItMjUyMy00ODMzLWE5Y2MtYTk1Y2VmNTc2ODc2IiwiYWNjZXNzUm9sZSI6eyJuYW1lIjoibWFuYWdlciIsInBlcm1pc3Npb25zIjpbIlNISUZUX1JFQUQiLCJTSElGVF9XUklURSIsIlNISUZUX0FERCIsIkxPQ0FUSU9OX1JFQUQiLCJMT0NBVElPTl9BRE1JTiJdfSwicm9sZSI6eyJuYW1lIjoiTWFuYWdlciJ9LCJpYXQiOjE3MzEwNzgwODEsImV4cCI6MTczMTA4NTI4MX0.uIf-LridPyIASPnQaoDFTwAb4lpR2TlNOB4nT_WRx1Im2SsY5eiDoKLyTiZ9DYHwroICEKiTKbQJS-ZJTe_AWe1JJVnJTX3f4L7S1Nd8k-MLBCNIBpsp6ioEY-oAirfu7YdfMZh7h_WNhGUsSTDT6QATgCNdrNnCJYSu1VkQCm5PujA7Vo5gdsgd7cOx5aTYn8DBbeu9xiWl9-luPtC59cnhkVHeZ72ep8sBqsJJ2XNxAk8KgckMNZENuYBhqB3IQKYbdKQju2mINYnzWP6iE6uN8JcDcML6xbpACwfSTPtrQflq4bA-J-vRM_9Qt6cmkfqNDQGOf1Gc--_fMAWDvWz1RRwelL5COjbSsQK-l7-mUyJlmqRFhjinAnYk2v37NUfag31IpyaJv9zk-iwUBc05rg99b3DphBO747jjWTV60u58cI6frH9x4k_dPTjoomVDsXpzE98JCYsCn4Pc3JJixtSPknTnAXvtA5ZWGP0Cn9tyml5ZSqw5sq87otgR71zC0WKpHTIEDTQp3Qg4m-07MlIvIeYl6RFfAjKcIZ2ObtPzOL_gCYiXQGgbiQ0wsIfzX9UsNIaaJ0cuAEDGyT2ILUfMNGxttsYbR4ufbbn1qmi5oG0sMkOXyG8uWTdZue0dozaET8Q05M6-StJjcGd4uYk1iih6oP-E_IQHXio"; 

const customFont = {
  regular: "AvenirNext-Regular",
  bold: "AvenirNext-Bold",
  semiBold: "AvenirNext-DemiBold",
};

export default function RootLayout() {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const employees = useMemo(() => users?.map(user => ({
    id: String(user.id),
    name: user.name,
  })), [users]);

  useEffect(() => {
    console.log('fetching users');

    const getUsers = async () => {
      try {
        setIsLoading(true);
        const usersData = await (await fetch('http://192.168.0.37:3000/api/user')).json();

        console.log(usersData, 'usersData');

        setUsers(usersData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <ThemeProvider value={DarkTheme}>
        <Stack>
          {
            !isLoading ? (
              <EasyTeamProvider
                token={token} 
                employees={employees} 
                customFont={customFont}
                isGlobalTimeTrackingEnabled={true}
              >  
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </EasyTeamProvider>
            ) : null
          }
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
  );
}
