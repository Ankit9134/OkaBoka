import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

import Cardimage from '../../components/Card';
import Emoji from '../../components/Emoji';

export default function Home() {
    return (

            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/images/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.header}>OkaBoka</Text>
                        
                    <View style={styles.profileContainern}>
                        <Image
                            source={require('../../assets/images/noti.gif')}
                            style={styles.profileImage}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.profileContainer}>
                        <Image
                            source={require('../../assets/images/photo.jpg')}
                            style={styles.profileImage}
                            resizeMode="cover"
                        />
                    </View>
                </View>
                
                <View style={styles.divider} />
                
                
                    <Emoji />
                    <View style={styles.divider} />
                    <ScrollView>
                     
                    <Cardimage />
                    </ScrollView>
            
            </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffffff',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#3DC4AB',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 10,
    },
    logoContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    header: {
        fontSize: 22,
        fontWeight: '800',
        right:20,
        // color: '#fff',
       
    },
    profileContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
       profileContainern: {
        width: 30,
        height: 30,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    content: {
        // paddingHorizontal: 15,
        // paddingBottom: 20,
    },
});