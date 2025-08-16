import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
const ProfileSetup = () => {
     const navigation=useNavigation();
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [relationshipStatus, setRelationshipStatus] = useState(null);
    const [occupation, setOccupation] = useState(null);

    // State for dynamic follow-up questions
    const [role, setRole] = useState('');
    const [workType, setWorkType] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [studyStatus, setStudyStatus] = useState('');

    const handleInterestSelect = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(item => item !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const handleContinue = () => {
        // Save all selections
        const profileData = {
            interests: selectedInterests,
            relationshipStatus,
            occupation,
            role,
            workType,
            schoolName,
            studyStatus
        };
        console.log(profileData);
        router.push('/Home/home');
    };

    const renderFollowUpQuestion = () => {
        switch (occupation) {
            case 'Employee':
                return (
                    <View style={styles.followUpContainer}>
                          <TextInput
                            style={styles.input}
                            placeholder=""
                            value={role}
                            onChangeText={setRole}
                        />
                        <Text style={styles.sectionTitle}>What's your role there?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your role"
                            value={role}
                            onChangeText={setRole}
                        />
                    </View>
                );
            case 'Freelancer':
                return (
                    <View style={styles.followUpContainer}>
                        <Text style={styles.sectionTitle}>What kind of work do you do?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Describe your work"
                            value={workType}
                            onChangeText={setWorkType}
                        />
                    </View>
                );
            case 'Other':
                return (
                    <View style={styles.followUpContainer}>
                        <Text style={styles.sectionTitle}>What kind of work do you do?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Describe your work"
                            value={workType}
                            onChangeText={setWorkType}
                        />
                    </View>
                );
            case 'Student':
                return (
                    <View style={styles.followUpContainer}>
                        <Text style={styles.sectionTitle}>What's your School/college name?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter school/college name"
                            value={schoolName}
                            onChangeText={setSchoolName}
                        />
                        <Text style={styles.sectionTitle}>Currently studying in?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your current study status"
                            value={studyStatus}
                            onChangeText={setStudyStatus}
                        />
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <AntDesign name="arrowleft" size={28} color="#757575" />
            </TouchableOpacity>
            <Text style={styles.title}>Let us understand who you're looking for and where you're at.</Text>

            {/* Interested In Section */}
            <Text style={styles.sectionTitle}>Interested In <Text style={styles.subtitle}>(Who’s energy do you connect with?)</Text></Text>

            <View style={styles.optionsContainer}>
                {['Male', 'Female', 'Other'].map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.optionButtonm,
                            selectedInterests.includes(option) && styles.selectedOption
                        ]}
                        onPress={() => handleInterestSelect(option)}
                    >
                        <Text style={[
                            styles.optionText,
                            selectedInterests.includes(option) && styles.selectedOptionText
                        ]}>
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Relationship Status Section */}
            <Text style={styles.sectionTitle}>Relationship Status</Text>
            <View style={styles.optionsContainer}>
                {['Single', 'In A Relationship', 'Prefer Not To Say'].map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.optionButton,
                            relationshipStatus === option && styles.selectedOption
                        ]}
                        onPress={() => setRelationshipStatus(option)}
                    >
                        <Text style={[
                            styles.optionText,
                            relationshipStatus === option && styles.selectedOptionText
                        ]}>
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Are You Section */}
            <Text style={styles.sectionTitle}>Are You</Text>
            <View style={styles.optionsContainer}>
                {['Student', 'Employee', 'Freelancer', 'Other'].map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.optionButton,
                            occupation === option && styles.selectedOption
                        ]}
                        onPress={() => setOccupation(option)}
                    >
                        <Text style={[
                            styles.optionText,
                            occupation === option && styles.selectedOptionText
                        ]}>
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Dynamic Follow-up Questions */}
            {renderFollowUpQuestion()}
            {/* Continue Button */}
            <TouchableOpacity
                style={[
                    styles.continueButton,
                    (!selectedInterests.length || !relationshipStatus || !occupation) && styles.disabledButton
                ]}
                onPress={handleContinue}
                disabled={!selectedInterests.length || !relationshipStatus || !occupation}
            >
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>

            <Text style={styles.subtext}>Your very first vibe</Text>

            {/* Skip Button */}
            <TouchableOpacity
                style={styles.skipButton}
                onPress={() => router.push('/Home/home')}
            >
                <Text style={styles.skipButtonText}>Skip For Now</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#3DC4AB',
        paddingBottom: 40,
    },
    backButton: {
        // position: 'absolute',
        left: 5,
        marginTop: 20,
    },
    title: {
        marginTop: 30,
        fontSize: 20,
         color: '#00000',
        fontWeight: 'bold',
        marginBottom: 50,
        // textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
         color: '#00000',
        // marginTop: 20,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 13,
        color: '#00000',

    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
       
    },
    optionButtonm: {
        flex: 1,
        minWidth: 100,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedOption: {
        backgroundColor: '#3f51b5',
        borderColor: '#3f51b5',
    },
    optionText: {
        color: '#00000',
        fontSize: 16,
    },
    selectedOptionText: {
        color: 'white',
    },
    optionButton: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        minWidth: 160,
        // marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        backgroundColor: '#ffff',
        justifyContent: 'space-between'
    },
    selectedOption: {
        backgroundColor: '#2E3A3F',
        borderColor: '#888',
    },
    optionText: {
        fontSize: 16,
    },
    followUpContainer: {
        marginTop: 15,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor:'white',
        padding: 14,
        marginBottom: 15,
        fontSize: 16,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 30,
    },
    continueButton: {
       backgroundColor: '#2E3A3F',
        padding: 14,
        width: 220,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 10,
        marginTop:40,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    continueButtonText: {
         color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    subtext: {
        textAlign: 'center',
        color: '#000',
    },
    skipButton: {
        padding: 10,
        alignItems: 'center',
    },
    skipButtonText: {
        color: '#000',
        fontSize: 16,
    },
});

export default ProfileSetup;