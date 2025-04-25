import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function AuthHome() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Title Section */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleLine1}>Discover Your</Text>
                <Text style={styles.titleLine2}>Next Journey</Text>
            </View>

            {/* Buttons Section */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>REGISTER</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF1E6',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    titleLine1: {
        fontFamily: 'Sansita-Regular',
        fontSize: 40,
        color: '#317B83',
        textAlign: 'center',
    },
    titleLine2: {
        fontFamily: 'Sansita-Bold',
        fontSize: 48,
        color: '#226B6F',
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: '#FF6B6B',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 20,
        marginBottom: 20,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    registerButton: {
        backgroundColor: '#317B83',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 20,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    buttonText: {
        fontFamily: 'Sansita-Bold',
        fontSize: 22,
        color: '#FFF1E6',
    },
});
