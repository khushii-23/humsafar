import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/base';

export default function ShowTravelTips({ navigation, route }) {
    const [travelTip, setTravelTip] = useState({});
    const [locationObj, setLocationObj] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const [refreshing, setRefreshing] = useState('');

    const fetchTip = async () => {
        try {
            const response = await fetch(`http://10.0.41.39:8000/api/travel-tips/${route.params.blogId}`);
            if (!response.ok) throw new Error('Failed to fetch blog post');
            const data = await response.json();
            setTravelTip(data.travelTip);
            setLocationObj(!data?.travelTip?.locationObj ? null : JSON.parse(data.travelTip.locationObj));
            setError(false);
        } catch (error) {
            console.error('Error fetching blog post:', error);
            setError(true);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchTip();
    }, []);

    const Section = ({ title, children }) => (
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {children}
        </View>
    );

    const Label = ({ label, value }) => (
        <View style={styles.labelContainer}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}> {value}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" color="white" size={24} />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {locationObj && (
                    <Section title={locationObj.name + (locationObj.class ? ` (${locationObj.class})` : '')}>
                        <Text style={styles.subtitle}>{locationObj.display_name}</Text>
                    </Section>
                )}

                <Section title="Tags">
                    {travelTip.tags?.map((tag, i) => (
                        <Text key={i} style={styles.value}>• {tag}</Text>
                    ))}
                    <Label label="Category:" value={travelTip.category} />
                </Section>

                <Section title="Travel Essentials">
                    {travelTip.necessaryItems?.map((item, i) => (
                        <Text key={i} style={styles.value}>• {item}</Text>
                    ))}
                    <Label label="Type of wear:" value={travelTip.typeOfWear} />
                </Section>

                <Section title="Language & Communication">
                    <Label label="Native Language:" value={travelTip.nativeLanguage} />
                    <Label label="Can Communicate In:" value={travelTip.languageCommunication} />
                </Section>

                <Section title="Cultural Insights">
                    <Label label="Local Cuisine:" value={travelTip.localCuisine} />
                    <Label label="Culture Insights:" value={travelTip.cultureInsights} />
                </Section>

                <Section title="Travel & Logistics">
                    <Label label="Nearest Commute:" value={travelTip.nearestCommute} />
                    <Label label="Travel Challenges:" value={travelTip.travelChallenges} />
                    <Label label="Solutions:" value={travelTip.solutions} />
                </Section>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF1E6',
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    backButton: {
        backgroundColor: '#FF6B6B',
        borderRadius: 25,
        padding: 10,
        elevation: 3,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    sectionTitle: {
        fontSize: 24,
        fontFamily: 'Sansita-Bold',
        color: '#FF6B6B',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontFamily: 'Sansita-Regular',
        color: '#333',
    },
    labelContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 5,
    },
    label: {
        fontFamily: 'Sansita-Bold',
        fontSize: 16,
        color: '#333',
    },
    value: {
        fontFamily: 'Sansita-Regular',
        fontSize: 16,
        color: '#333',
    },
});
