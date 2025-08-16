import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
const VerificationScreen = () => {
    const navigation = useNavigation();
    const [timer, setTimer] = useState(4);
    const [canResend, setCanResend] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputs = useRef([]);

    const handleChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Auto focus to next input
        if (text && index < 3) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleResend = () => {
        if (canResend) {
            // Resend logic here
            setTimer(4);
            setCanResend(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <Text style={styles.title}>Verify your number</Text>
            <Text style={styles.subtitle}>We've sent a code to your phone</Text>


            <View style={styles.containerp}>
                {[0, 1, 2, 3].map((index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        onChangeText={(text) => handleChange(text, index)}
                        value={otp[index]}
                        keyboardType="number-pad"
                        maxLength={1}
                        ref={(ref) => (inputs.current[index] = ref)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                    //   placeholder="0"
                    />
                ))}
            </View>
            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => router.push('/Init/ProfileScreen')}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <Text style={styles.submitButtonText}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleResend}
                disabled={!canResend}
                style={styles.resendButton}
            >
                <Text style={styles.resendText}>
                    Didn't receive code?{' '}
                    <Text style={[styles.resendLink, !canResend && styles.disabledLink]}>
                        Resend
                    </Text>
                </Text>
            </TouchableOpacity>
            <View><Text style={styles.resendText}> You can request a new code in 4 seconds</Text></View>
            {!canResend && (
                <Text style={styles.timerText}>
                    You can request a new code in {timer} seconds
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#3DC4AB',
    },
    header: {
        alignItems: 'center',
        marginTop: 120,
        marginBottom: 100,
    },
    logo: {
        width: 170,
        height: 170,
    },
    containerp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        marginVertical: 10,
    },
    input: {
        width: 80,
        height: 100,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
        color: '#000',
    },
    subtitle: {
        fontSize: 14,
        color: '#3c3c3cff',
        marginBottom: 20,
        textAlign: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
        color: '#000',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    resendButton: {
        marginBottom: 10,
    },
    resendText: {
        fontSize: 14,
        color: '#282828ff',
        textAlign: 'center',
    },
    resendLink: {
        color: '#212322ff',
        fontWeight: '600',
    },
    disabledLink: {
        color: '#999',
    },
    timerText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: '#0b0b0bff',
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

export default VerificationScreen;