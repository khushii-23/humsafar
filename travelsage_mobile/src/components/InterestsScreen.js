import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import { useAuth } from '../contexts/Auth';

export default function InterestsScreen() {

    const navigation = useNavigation();

    const interestData = [
        { label: "Historical Sites", value: "Historical Sites" },
        { label: "Beaches", value: "Beaches" },
        { label: "Mountains", value: "Mountains" },
        { label: "Cities", value: "Cities" },
        { label: "National Parks", value: "National Parks" },
        { label: "Deserts", value: "Deserts" },
        { label: "Islands", value: "Islands" },
        { label: "Forests", value: "Forests" },
        { label: "Lakes", value: "Lakes" },
        { label: "Villages", value: "Villages" },
        { label: "Archaeological Sites", value: "Archaeological Sites" },
        { label: "Cultural Landmarks", value: "Cultural Landmarks" },
        { label: "Temples", value: "Temples" },
        { label: "Monasteries", value: "Monasteries" },
        { label: "Museums", value: "Museums" },
        { label: "Wildlife Reserves", value: "Wildlife Reserves" },
        { label: "Gardens and Botanical Parks", value: "Gardens and Botanical Parks" },
        { label: "Waterfalls", value: "Waterfalls" },
        { label: "Caves", value: "Caves" },
        { label: "Castles and Palaces", value: "Castles and Palaces" },
        { label: "Hot Springs", value: "Hot Springs" },
        { label: "Rivers", value: "Rivers" },
        { label: "Savannas", value: "Savannas" }
    ];

    const authData = useAuth()

    const [selectedInterests, setSelectedInterests] = useState([]);

    const handlePress = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(item => item !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const handleSubmitInterest = () => {
        authData.updateInterests({userId: authData.authData._id, interests: selectedInterests})
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#008080',
            position: 'relative'  // Ensure children can use absolute positioning relative to this container
        }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Sansita-Bold', color: 'black', fontSize: 50 }}>TravelSage</Text>
                <Text style={{ fontFamily: 'Sansita-Regular', color: 'black', fontSize: 25, paddingVertical: 20 }}>What are your Interests..?</Text>
            </View>
            <View style={{ flex: 2 }}>
                <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: 'center', paddingHorizontal: 20 }}>
                    {interestData.map((d, i) => (
                        <TouchableOpacity
                            style={{
                                width: '30%',
                                margin: 5,
                                alignItems: 'center',
                                padding: 10,
                                borderRadius: 50,
                                backgroundColor: selectedInterests.includes(d.value) ? '#FFA07A' : '#EDC6BA'
                            }}
                            key={i}
                            onPress={() => handlePress(d.value)}
                        >
                            <Text style={{ color: 'black', fontSize: 20, fontFamily: 'Sansita-Regular' }}>{d}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    backgroundColor: '#FFA07A',
                    borderRadius: 25,
                    padding: 15,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={() => handleSubmitInterest()}
            >
                <Icon
                    name='arrow-right'
                    type='font-awesome'
                    color='black'
                />
                <Text style={{ color: 'black', fontSize: 20, fontFamily: 'Sansita-Regular' }}>Next
                </Text>
            </TouchableOpacity>
        </View>
    )
}
