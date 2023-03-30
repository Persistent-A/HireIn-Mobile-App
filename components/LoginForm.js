import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { employeeState, loginEmployee } from '../auth/authSlice';
import { useSetRecoilState } from 'recoil';


export default function LoginForm({ navigation }) {
  const onPressedSigupButton = () => {
    navigation.navigate('SignupForm')
  }

  const setEmployeeState = useSetRecoilState(employeeState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => {
    if(!email || !password) {
      alert('Please fill all the fields')
    }else {
      const serverData = await loginEmployee(email, password)
      if (serverData) {
      setEmployeeState(serverData);
      console.log(serverData);
      navigation.navigate('employeeDashboard')
      };
    }
    }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" || Platform.OS === "android" ? "padding" : "height"}
    >
        <View style={styles.form}>
          <Text style={styles.title}>Welcome back!</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor = "#828ca9"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholderTextColor = "#828ca9"
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressedSigupButton}>
            <Text style={styles.linkText}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.linkText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#091930'
  },
  form: {
    backgroundColor: 'transparent',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#ccd6f6'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    width: '100%',
    borderRadius: 10,
    color: '#ccd6f6'
  },
  button: {
    backgroundColor: '#64ffda',
    borderColor: '#64ffda',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    marginBottom: 40
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkText: {
    color: '#ccd6f6',
    marginVertical: 5,
  },
});
