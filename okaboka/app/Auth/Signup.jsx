import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneNumberChange = (text) => {
    const cleanedText = text.replace(/\D/g, '');
    setPhoneNumber(cleanedText);
  };

  const handleSubmit = () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    if (phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    console.log('Phone number submitted:', phoneNumber);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Verification', { phoneNumber });
    }, 1000);
  };

  const handleWhatsAppLogin = () => {
    Alert.alert('Coming Soon', 'WhatsApp login will be available soon');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to okaBoka</Text>
          <Text style={styles.subtitle}>Connect with emotionally similar people</Text>
          <Image
            source={require('../../assets/images/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.formTitle}>Let's start with your number your world begins here.</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              autoComplete="tel"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              maxLength={15} 
            />
          </View>

          <Text style={styles.orText}>or</Text>

          <TouchableOpacity 
            style={styles.whatsappButton}
            onPress={handleWhatsAppLogin}
            disabled={isLoading}
          >
            <Text style={styles.whatsappButtonText}>Continue With Whatsapp</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitButton, isLoading && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={isLoading}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? 'Sending...' : 'Send Me The Code'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.privacyText}>We'll never share your number</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3DC4AB',
  },
  content: {
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 170,
    height: 170,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 30,
    color: '#000',
  },
  formContainer: {
    borderRadius: 20,
    padding: 20,
    marginTop: 50,
  },
  formTitle: {
    fontSize: 14,
    marginTop: 10,
    color: '#000000',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 15,
    color: '#101010ff',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 15,
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 15,
    color: '#666',
  },
  whatsappButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  whatsappButtonText: {
    color: '#666',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#0b0b0bff',
    padding: 14,
    width: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#666',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  privacyText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#252525ff',
  },
});