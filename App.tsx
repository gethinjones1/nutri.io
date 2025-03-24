import 'react-native-reanimated';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from './src/components/ui/toast';
import LoginScreen from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { auth } from './src/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import GoalSettingScreen from './src/screens/GoalSettingScreen';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const AuthStack = () => (
    <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#f9fafb' },
        }}
    >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
);

const AppStack = () => (
    <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#f9fafb' },
        }}
    >
        <Stack.Screen name="Home" component={GoalSettingScreen} />
    </Stack.Navigator>
);

const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Optionally show a loading screen until Firebase finishes checking auth state
    if (loading) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ToastProvider>
                <NavigationContainer>
                    {user ? <AppStack /> : <AuthStack />}
                </NavigationContainer>
            </ToastProvider>
        </QueryClientProvider>
    );
};

export default App;
