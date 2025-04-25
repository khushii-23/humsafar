import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Icon } from '@rneui/base';
import { saveFormData, loadFormData } from '../../../utils/blogLocalStorage'; // path unchanged

export default function AddTagsAndLocation({ navigation }) {
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [locationObj, setLocationObj] = useState('');
    const [error, setError] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const categories = [
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

    useEffect(() => {
        loadFormData('AddTagsAndLocation').then((data) => {
            if (data) {
                setTags(data.tags.join(', ') || '');
                setCategory(data.category || '');
                setLocation(data.location || '');
                setLocationObj(data.locationObj || {});
            }
        }).catch((err) => {
            if (!err.message.includes('does not exist')) {
                console.error('Error loading form data', err);
            }
        });
    }, []);
    

    const formatHashtags = (input) => {
         // Split on space to format each word
    const words = input.split(' ').map(word => {
        // Add # if it's missing and it's not empty
        if (word && !word.startsWith('#')) {
            return `#${word}`;
        }
        return word;
    });

    // Join back with space
    const formatted = words.join(' ');

    setTags(formatted);
    };

    const handleNext = () => {
        if (!tags || !category || !location) {
            setError("Please fill out all fields.");
        } else {
            const updatedBlogData = {
                tags: tags.split(',').map(tag => tag.trim()),
                category,
                location,
                locationObj,
            };
            saveFormData('AddTagsAndLocation', updatedBlogData).then(() => {
                Keyboard.dismiss();
                navigation.navigate('TravelTips', updatedBlogData);
            });
        }
    };

    const handleSearchLocation = async (query) => {
        if (query.length < 3) return;
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`);
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error searching location:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" color="white" size={24}  />
            </TouchableOpacity>

            <Text style={styles.label}>Select Category</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={category}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label='Choose a category' value='' enabled={false} />
                    {categories.map((item, index) => (
                        <Picker.Item key={index} label={item.label} value={item.value} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>Tags (use hashtags like #travel, #sunset)</Text>
            <TextInput
                style={styles.input}
                value={tags}
                onChangeText={formatHashtags}
                placeholder="#beach, #adventure, #hiking"
                multiline
            />

            <Text style={styles.label}>Location</Text>
            <TextInput
                style={styles.input}
                value={location}
                placeholder="Search location"
                onChangeText={(text) => {
                    setLocation(text);
                    handleSearchLocation(text);
                }}
            />

            {searchResults.length > 0 && (
                <FlatList
                    data={searchResults}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setLocation(item.display_name);
                                setLocationObj(item);
                                setSearchResults([]);
                            }}
                        >
                            <Text style={styles.searchResultTitle}>{item.name || "Unnamed Place"}</Text>
                            <Text style={styles.searchResult}>{item.display_name}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.fullWidthList}
                />
            )}

            {error !== '' && (
                <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{error}</Text>
            )}

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Icon name="arrow-forward" color="white" size={24} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFECE0',
        paddingTop:80,
       // paddingBottom:100,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 24, // Slightly more spacing between sections
        marginBottom: 8, // Space between label and input
        color: '#333',
        paddingHorizontal: 10,
    },
    input: {
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        fontSize: 16,
        marginBottom: 24, // More breathing room between fields
        elevation: 2,
    },
    
    pickerContainer: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 20,
        elevation: 2,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: '#FF6F91',
        borderRadius: 25,
        padding: 12,
        elevation: 4,
        zIndex: 999,
    },
    searchResultTitle: {
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 8,
    },
    searchResult: {
        paddingVertical: 8,
        fontSize: 14,
        color: '#555',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    fullWidthList: {
        width: '100%',
        marginTop: 10,
    },
    nextButton: {
        position: 'absolute',
        bottom: 30, // Adjust based on device spacing
        right: 20,
        padding: 16,
        backgroundColor: '#FF6F91',
        borderRadius: 35,
        elevation: 4,
    },
    
});
