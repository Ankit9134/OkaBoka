import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const ProfileSetupScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Dummy user data
    const dummyUserData = {
        name: name || 'John Doe', 
        age: 28,
        location: 'New York',
        interests: ['Hiking', 'Photography', 'Reading'],
        bio: 'Adventure enthusiast and nature lover',
    };

    const handleSubmit = () => {
        if (name.trim() === '') {
            alert('Please enter your name');
            return;
        }
        
        setIsSubmitted(true);
        // Simulate API call with timeout
        setTimeout(() => {
            navigation.navigate('UserForm', { userData: dummyUserData });
        }, 1000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Image
                        source={require('../../assets/images/photo.jpg')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.title}>What should we call you?</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Your Name"
                        placeholderTextColor="#999"
                        value={name}
                        onChangeText={setName}
                        editable={!isSubmitted}
                    />
                </View>

                <TouchableOpacity
                    style={[styles.submitButton, isSubmitted && styles.submitButtonDisabled]}
                    onPress={handleSubmit}
                    disabled={isSubmitted}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Text style={styles.submitButtonText}>
                        {isSubmitted ? 'Processing...' : 'Lets Get To Know You'}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.safetyText}>Your safety is our priority</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3DC4AB',
    },
    content: {
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginTop: 120,
        marginBottom: 20,
    },
    logo: {
        width: 160,
        height: 160,
        borderRadius: 80,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 100,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 15,
        fontSize: 16,
    },
    safetyText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
        color: '#666',
    },
    submitButton: {
        backgroundColor: '#0b0b0bff',
        padding: 14,
        width: 220,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 10,
    },
    submitButtonDisabled: {
        backgroundColor: '#555',
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
});

export default ProfileSetupScreen;