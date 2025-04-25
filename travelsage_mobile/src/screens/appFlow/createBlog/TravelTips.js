import { Icon } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { saveFormData, loadFormData } from '../../../utils/blogLocalStorage';

export default function TravelTips({ navigation, route }) {
    const [necessaryItems, setNecessaryItems] = useState('');
    const [nativeLanguage, setNativeLanguage] = useState('');
    const [nearestCommute, setNearestCommute] = useState('');
    const [localCuisine, setLocalCuisine] = useState('');
    const [languageCommunication, setLanguageCommunication] = useState('');
    const [culturalInsights, setCulturalInsights] = useState('');
    const [typeOfWear, setTypeOfWear] = useState('');
    const [travelChallenges, setTravelChallenges] = useState('');
    const [solutions, setSolutions] = useState('');

    const { title, body, dateTime, images, tagAndOther } = route.params;

    useEffect(() => {
        loadFormData('TravelTips').then((data) => {
            if (data) {
                setNecessaryItems(data?.necessaryItems.join(', ') || '');
                setNativeLanguage(data?.nativeLanguage || '');
                setNearestCommute(data?.nearestCommute || '');
                setLocalCuisine(data?.localCuisine || '');
                setLanguageCommunication(data?.languageCommunication || '');
                setCulturalInsights(data?.culturalInsights || '');
                setTypeOfWear(data?.typeOfWear || '');
                setTravelChallenges(data?.travelChallenges || '');
                setSolutions(data?.solutions || '');
            }
        });
    }, []);

    const handlePreview = () => {
        const updatedBlogData = {
            necessaryItems: necessaryItems?.split(',').map(item => item.trim()),
            nativeLanguage,
            nearestCommute,
            localCuisine,
            languageCommunication,
            culturalInsights,
            typeOfWear,
            travelChallenges,
            solutions,
        };

        saveFormData('TravelTips', updatedBlogData).then(() => {
            navigation.navigate('BlogPreviewScreen', { title, body, dateTime, images, tagAndOther, travelTips: updatedBlogData });
        });
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                
                {/* 🔙 Back Button */}
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" color="#5C4033" size={28} />
                </TouchableOpacity>

                <Text style={styles.header}>Fill Travel Tips</Text>

                {/* Sections remain unchanged, only styles updated */}

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Travel Essentials</Text>
                    <Text style={styles.label}>Necessary Items to Carry</Text>
                    <TextInput style={styles.input} value={necessaryItems} onChangeText={setNecessaryItems} placeholder="e.g., Sunscreen, Hiking boots, Adapter..." placeholderTextColor="#aaa" />
                    <Text style={styles.label}>Type of Wear to Carry</Text>
                    <TextInput style={styles.input} value={typeOfWear} onChangeText={setTypeOfWear} placeholder="e.g., Light cotton clothes" placeholderTextColor="#aaa" />
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Language & Communication</Text>
                    <Text style={styles.label}>Native Language</Text>
                    <TextInput style={styles.input} value={nativeLanguage} onChangeText={setNativeLanguage} placeholder="e.g., Marathi, French" placeholderTextColor="#aaa" />
                    <Text style={styles.label}>Language and Communication</Text>
                    <TextInput style={styles.input} value={languageCommunication} onChangeText={setLanguageCommunication} placeholder="e.g., English understood by most locals" placeholderTextColor="#aaa" />
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Cultural Insights</Text>
                    <Text style={styles.label}>Local Cuisine</Text>
                    <TextInput style={styles.input} value={localCuisine} onChangeText={setLocalCuisine} placeholder="e.g., Dhokla, Misal Pav" placeholderTextColor="#aaa" />
                    <Text style={styles.label}>Cultural Insights</Text>
                    <TextInput style={styles.input} value={culturalInsights} onChangeText={setCulturalInsights} placeholder="e.g., Remove shoes before entering homes" placeholderTextColor="#aaa" />
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Travel Logistics</Text>
                    <Text style={styles.label}>Nearest Commute</Text>
                    <TextInput style={styles.input} value={nearestCommute} onChangeText={setNearestCommute} placeholder="e.g., Pune Railway Station" placeholderTextColor="#aaa" />
                    <Text style={styles.label}>Travel Challenges</Text>
                    <TextInput style={styles.input} value={travelChallenges} onChangeText={setTravelChallenges} placeholder="e.g., Language barrier, power cuts" placeholderTextColor="#aaa" />
                    <Text style={styles.label}>Solutions</Text>
                    <TextInput style={styles.input} value={solutions} onChangeText={setSolutions} placeholder="e.g., Carry power bank, translation app" placeholderTextColor="#aaa" />
                </View>

                <TouchableOpacity style={styles.button} onPress={handlePreview}>
                    <Text style={styles.buttonText}>Preview Travel Tips</Text>
                    <Icon name="arrow-forward" color="white" size={22} />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#FFE9DC', // soft peachy background
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 60,
    },
    backButton: {
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    header: {
        fontSize: 28,
        fontFamily: 'Sansita-Bold',
        textAlign: 'center',
        color: '#5C4033',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#FFF5EF', // soft card background
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#FFB6A6',
        shadowOpacity: 0.15,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Sansita-Bold',
        marginBottom: 10,
        color: '#8B5E3C',
        textAlign: 'center',
    },
    label: {
        fontSize: 15,
        marginBottom: 6,
        marginTop: 10,
        fontFamily: 'Sansita-Bold',
        color: '#A9714B',
    },
    input: {
        backgroundColor: '#FFF',
        borderColor: '#FFD5BC',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        color: '#4D2C20',
    },
    button: {
        backgroundColor: '#E2725B', // warm peach
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
        borderRadius: 30,
        marginTop: 10,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontFamily: 'Sansita-Bold',
        marginRight: 6,
    },
});
