import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
const UserForm = () => {
    const navigation = useNavigation();
    const [dob, setDob] = useState({
        day: '',
        month: '',
        year: ''
    });

    const [gender, setGender] = useState('');
    const [location, setLocation] = useState('');
    const [what, setWhat] = useState('');
    const [useCurrentLocation, setUseCurrentLocation] = useState(false);

    const handleInputChange = (name, value) => {
        if (name in dob) {
            setDob(prev => ({ ...prev, [name]: value }));
        } else {
            if (name === 'gender') setGender(value);
            if (name === 'location') setLocation(value);
             if (name === 'what') setWhat(value);
        }
    };

    const validateForm = () => {
        // Check if all DOB fields are filled
        if (!dob.day || !dob.month || !dob.year) {
            Alert.alert('Error', 'Please enter your complete date of birth');
            return false;
        }

        // Validate day (1-31)
        const day = parseInt(dob.day);
        if (isNaN(day) || day < 1 || day > 31) {
            Alert.alert('Error', 'Please enter a valid day (1-31)');
            return false;
        }

        // Validate month (1-12)
        const month = parseInt(dob.month);
        if (isNaN(month) || month < 1 || month > 12) {
            Alert.alert('Error', 'Please enter a valid month (1-12)');
            return false;
        }

        // Validate year (reasonable age range)
        const currentYear = new Date().getFullYear();
        const year = parseInt(dob.year);
        if (isNaN(year) || year < 1900 || year > currentYear) {
            Alert.alert('Error', 'Please enter a valid year');
            return false;
        }

        // Check if gender is selected
        if (!gender) {
            Alert.alert('Error', 'Please select your gender');
            return false;
        }

        // Check if location is provided when not using current location
        if (!useCurrentLocation && !location) {
            Alert.alert('Error', 'Please enter your location or enable current location');
            return false;
        }

        return true;
    };

    const handleContinue = () => {
        if (!validateForm()) {
            return; // Don't proceed if validation fails
        }

        const formData = {
            dob: `${dob.day}/${dob.month}/${dob.year}`,
            gender,
            what,
            location: useCurrentLocation ? 'current' : location
        };
        
        console.log('Form submitted:', { userData: formData });
        navigation.navigate('ProfileSetup', { userData: formData });
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <AntDesign name="arrowleft" size={28} color="#757575" />
            </TouchableOpacity>
            <Text style={styles.header}>A little about you so we match better</Text>

            <Text style={styles.sectionHeader}>Date of Birth</Text>
            <View style={styles.dobContainer}>
                <TextInput
                    style={styles.dobInput}
                    placeholder="DD"
                    value={dob.day}
                    onChangeText={(text) => handleInputChange('day', text)}
                    keyboardType="numeric"
                    maxLength={2}
                />
                <TextInput
                    style={styles.dobInput}
                    placeholder="MM"
                    value={dob.month}
                    onChangeText={(text) => handleInputChange('month', text)}
                    keyboardType="numeric"
                    maxLength={2}
                />
                <TextInput
                    style={styles.dobInput}
                    placeholder="YYYY"
                    value={dob.year}
                    onChangeText={(text) => handleInputChange('year', text)}
                    keyboardType="numeric"
                    maxLength={4}
                />
            </View>

            <Text style={styles.sectionHeader}>Gender</Text>
            <View style={styles.genderContainer}>
                <TouchableOpacity
                    style={[styles.genderOption, gender === 'Male' && styles.selectedGender]}
                    onPress={() => handleInputChange('gender', 'Male')}
                >
                    <Text style={gender === 'Male' ? { color: 'white' } : {}}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.genderOption, gender === 'Female' && styles.selectedGender]}
                    onPress={() => handleInputChange('gender', 'Female')}
                >
                    <Text style={gender === 'Female' ? { color: 'white' } : {}}>Female</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.genderOption, gender === 'Other' && styles.selectedGender]}
                    onPress={() => handleInputChange('gender', 'Other')}
                >
                    <Text style={gender === 'Other' ? { color: 'white' } : {}}>Other</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Write Here"
                value={what}
                onChangeText={(text) => handleInputChange('what', text)}
            />

            <Text style={styles.sectionHeader}>Location (City,Country)</Text>
            {!useCurrentLocation && (
                <TextInput
                    style={styles.input}
                    placeholder="Enter your location"
                    value={location}
                    onChangeText={(text) => handleInputChange('location', text)}
                />
            )}

            <View style={styles.locationOption}>
                <View style={styles.switchContainer}>
                    <Switch
                        value={useCurrentLocation}
                        onValueChange={(val) => setUseCurrentLocation(val)}
                    />
                    <Text style={styles.switchLabel}>Use current location</Text>
                </View>
            </View>
       
            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleContinue}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <Text style={styles.submitButtonText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton}>
                <Text>Who are you open to connecting with?</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#3DC4AB',
    },
    backButton: {
        // position: 'absolute',
        left: 5,
        marginTop: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 30,
        textAlign: 'center',
    },
    sectionHeader: {
        fontSize: 15,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 10,
    },
    dobContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dobInput: {
        width: '30%',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        textAlign: 'center',
    },
    genderContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    genderOption: {
        width: '30%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    selectedGender: {
        backgroundColor: '#2E3A3F',
        color: 'white'
    },
    locationOption: {
        marginBottom: 70,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    switchLabel: {
        marginLeft: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        // marginBottom: 20,
    },
    linkButton: {
        alignItems: 'center',
    },
        submitButton: {
        backgroundColor: '#2E3A3F',
        padding: 14,
        width: 180,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 10,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
});

export default UserForm;