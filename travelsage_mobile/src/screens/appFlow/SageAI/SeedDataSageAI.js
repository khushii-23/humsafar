import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Icon } from '@rneui/base';

export default function SeedDataSageAI({ navigation }) {
  const [category, setCategory] = useState('');
  const [locationName, setLocationName] = useState('');
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
      <View style={styles.headerSection}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.titleText}>SageAI</Text>
      </View>

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item enabled={false} label='Select Category' value='' />
          {categories.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={locationName}
        placeholder='Enter location name'
        placeholderTextColor="#aaa"
        multiline
        onChangeText={(text) => {
          setLocationName(text);
          handleSearchLocation(text);
        }}
      />

      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          inverted
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              setLocationName(item.name);
              setLocationObj(item);
              setSearchResults([]);
            }}>
              <Text style={styles.searchResultTitle}>{item.name}</Text>
              <Text style={styles.searchResult}>{item.display_name}</Text>
            </TouchableOpacity>
          )}
          style={styles.fullWidthList}
        />
      )}

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.navigate('QnASageAI', { category, locationName })}
        >
          <Icon name="arrow-forward" color="white" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF1E6', // countryside cream
  },
  headerSection: {
    marginTop: 10,
    marginBottom: 30,
  },
  welcomeText: {
    fontFamily: 'Sansita-Bold',
    fontSize: 50,
    color: '#1b5363',
  },
  titleText: {
    fontFamily: 'Sansita-Bold',
    fontSize: 70,
    color: '#FF6B6B',
  },
  label: {
    fontSize: 18,
    fontFamily: 'Sansita-Regular',
    marginBottom: 5,
    color: '#90564d',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    fontSize: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#edc6ba',
    borderWidth: 1,
    fontFamily: 'Sansita-Regular',
    marginBottom: 20,
    color: '#0d1314',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#edc6ba',
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    fontFamily: 'Sansita-Regular',
  },
  searchResult: {
    fontFamily: 'Sansita-Regular',
    fontSize: 15,
    color: '#1b5363',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchResultTitle: {
    fontFamily: 'Sansita-Bold',
    fontSize: 18,
    color: '#35b5ae',
    marginTop: 10,
  },
  fullWidthList: {
    width: '100%',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontFamily: 'Sansita-Regular',
  },
  containerButton: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  floatingButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
});
