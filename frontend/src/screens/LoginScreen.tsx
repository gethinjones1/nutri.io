// LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Lock, Eye, EyeOff, User } from 'lucide-react-native';
import { useToast } from '../components/ui/toast';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();
  const { toast } = useToast();

  const handleLogin = () => {
    Keyboard.dismiss();

    if (!email || !password) {
      toast('Please fill in all fields', 'error');
      return;
    }

    // Use Firebase Authentication for email/password login.
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login successful; navigate to Home.
        toast('Login successful!', 'success');
        navigation.navigate('Home');
      })
      .catch((error) => {
        // Display the error message to the user.
        toast('Invalid email and password combination', 'error');
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.greeting}>Hey, There 👋</Text>
          <Text style={styles.subtitle}>find your job here!</Text>
          <Text style={styles.description}>Enter your email address and password to use the app</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputContainer}>
            <User size={20} color="#6C4BFF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="email@example.com"
              placeholderTextColor="#AAAAAA"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputContainer}>
            <Lock size={20} color="#6C4BFF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#AAAAAA"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              {showPassword ? (
                <EyeOff size={20} color="#9ca3af" />
              ) : (
                <Eye size={20} color="#9ca3af" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[
                styles.checkbox,
                rememberMe && styles.checkboxChecked
              ]}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberMeText}>Remember Me</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupLinkText}> Register Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  container: {
    flex: 1,
    padding: 24
  },
  headerContainer: {
    marginBottom: 40
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 12
  },
  description: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8
  },
  formContainer: {
    marginTop: 20
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#FFFFFF',
    marginBottom: 24
  },
  icon: {
    marginRight: 12
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#333333',
    fontSize: 16
  },
  eyeIcon: {
    padding: 8
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  checkboxChecked: {
    backgroundColor: '#6C4BFF',
    borderColor: '#6C4BFF'
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12
  },
  rememberMeText: {
    fontSize: 14,
    color: '#4B5563'
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#6C4BFF',
    fontWeight: '600'
  },
  loginButton: {
    backgroundColor: '#6C4BFF',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  signupText: {
    fontSize: 14,
    color: '#4B5563'
  },
  signupLinkText: {
    fontSize: 14,
    color: '#6C4BFF',
    fontWeight: '600'
  }
});

export default LoginScreen;
