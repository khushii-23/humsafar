import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Alert
} from 'react-native';
import { Icon } from '@rneui/base';
import Swiper from 'react-native-swiper';
import RNStorage from 'rn-secure-storage';
import { useAuth } from '../../../contexts/Auth';

const { width } = Dimensions.get('window');

export default function PreviewScreen({ navigation }) {
  const [data, setData] = useState({});
  const { authData } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const addNewBlog = await RNStorage.getItem('AddNewBlog');
        const uploadScreen = await RNStorage.getItem('UploadScreen');
        const addTagsAndLocation = await RNStorage.getItem('AddTagsAndLocation');
        const travelTips = await RNStorage.getItem('TravelTips');

        const mergedData = {
          ...JSON.parse(addNewBlog || '{}'),
          ...JSON.parse(uploadScreen || '{}'),
          ...JSON.parse(addTagsAndLocation || '{}'),
          ...JSON.parse(travelTips || '{}'),
        };

        setData(mergedData);
      } catch (error) {
        console.error('Error retrieving data from secure storage:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = () => {
    navigation.navigate('AddNewBlog', { ...data });
  };

  const uploadBlog = async () => {
    try {
      // Re-fetch data just before uploading
      const addNewBlog = JSON.parse(await RNStorage.getItem('AddNewBlog') || '{}');
      const uploadScreen = JSON.parse(await RNStorage.getItem('UploadScreen') || '{}');
      const addTagsAndLocation = JSON.parse(await RNStorage.getItem('AddTagsAndLocation') || '{}');
      const travelTips = JSON.parse(await RNStorage.getItem('TravelTips') || '{}');

      const mergedData = {
        ...addNewBlog,
        ...uploadScreen,
        ...addTagsAndLocation,
        ...travelTips,
      };

      const formData = new FormData();
      formData.append('userId', authData._id);
      formData.append('title', mergedData.title || '');
      formData.append('body', mergedData.body || '');
      formData.append('dateTime', mergedData.dateTime || '');
      formData.append('necessaryItems', mergedData.necessaryItems || []);
      formData.append('typeOfWear', mergedData.typeOfWear || '');
      formData.append('tags', mergedData.tags || []);
      formData.append('category', mergedData.category || '');
      formData.append('nativeLanguage', mergedData.nativeLanguage || '');
      formData.append('languageCommunication', mergedData.languageCommunication || '');
      formData.append('locationName', mergedData.locationObj?.name || '');
      formData.append('locationObj', JSON.stringify(mergedData.locationObj || {}));
      formData.append('localCuisine', mergedData.localCuisine || '');
      formData.append('cultureInsights', mergedData.cultureInsights || '');
      formData.append('nearestCommute', mergedData.nearestCommute || '');
      formData.append('travelChallenges', mergedData.travelChallenges || '');
      formData.append('solutions', mergedData.solutions || '');

      (mergedData.images || []).forEach((image, index) => {
        formData.append('images', {
          uri: image.uri,
          type: image.type,
          name: `image-${index}.jpg`,
        });
      });

      const response = await fetch('http://10.0.41.39:8000/api/create-blog', {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok || !responseData.success) {
        throw new Error('Failed to upload blog');
      }

      // ✅ Clear local storage after success
      await RNStorage.removeItem('AddNewBlog');
      await RNStorage.removeItem('UploadScreen');
      await RNStorage.removeItem('AddTagsAndLocation');
      await RNStorage.removeItem('TravelTips');

      // ✅ Navigate to initial screen
      navigation.navigate('AddNewBlog');
    } catch (error) {
      console.error('Error uploading blog:', error);
      Alert.alert('Error', 'There was a problem uploading your blog. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={handleEdit}>
          <Icon name="edit" color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preview Blog</Text>
        <TouchableOpacity style={styles.iconButton} onPress={uploadBlog}>
          <Icon name="check" color="white" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {data.images?.length ? (
          <Swiper style={styles.swiper} showsButtons={true}>
            {data.images.map((img, i) => (
              <View key={i} style={styles.slide}>
                <Image source={{ uri: img.uri }} style={styles.image} />
                <Text style={styles.imageCaption}>{data.locationObj?.name}</Text>
              </View>
            ))}
          </Swiper>
        ) : (
          <Text style={styles.noImagesText}>No images available</Text>
        )}

        <View style={styles.card}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.date}>{data.dateTime}</Text>
          <Text style={styles.body}>{data.body}</Text>
        </View>

        {/* Tags & Category */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tags</Text>
          {data.tags?.map((tag, i) => (
            <Text key={i} style={styles.listItem}>
              <Icon name="arrow-forward" size={15} color="#333" /> {tag}
            </Text>
          ))}
          <Text style={styles.detail}>
            <Text style={styles.bold}>Category: </Text>{data.category}
          </Text>
        </View>

        {/* Travel Essentials */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Travel Essentials</Text>
          {data.necessaryItems?.map((item, i) => (
            <Text key={i} style={styles.listItem}>
              <Icon name="arrow-forward" size={15} color="#333" /> {item}
            </Text>
          ))}
          <Text style={styles.detail}>
            <Text style={styles.bold}>Type Of Wear: </Text>{data.typeOfWear}
          </Text>
        </View>

        {/* Language Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Language and Communication</Text>
          <Text style={styles.detail}>
            <Text style={styles.bold}>Native Language Spoken: </Text>{data.nativeLanguage}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.bold}>Languages for Communication: </Text>{data.languageCommunication}
          </Text>
        </View>

        {/* Culture */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cultural Insights</Text>
          <Text style={styles.detail}>
            <Text style={styles.bold}>Local Cuisine: </Text>{data.localCuisine}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.bold}>Culture: </Text>{data.cultureInsights}
          </Text>
        </View>

        {/* Logistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Travel and Logistics</Text>
          <Text style={styles.detail}>
            <Text style={styles.bold}>Nearest Commute: </Text>{data.nearestCommute}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.bold}>Challenges: </Text>{data.travelChallenges}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.bold}>Solutions: </Text>{data.solutions}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const themeColor = '#FF6B6B';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: themeColor,
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  iconButton: {
    backgroundColor: '#ff8a8a',
    padding: 10,
    borderRadius: 50,
  },
  content: {
    padding: 15,
  },
  swiper: {
    height: 220,
  },
  slide: {
    alignItems: 'center',
  },
  image: {
    width: width - 30,
    height: 200,
    borderRadius: 12,
  },
  imageCaption: {
    textAlign: 'right',
    fontSize: 12,
    marginTop: 5,
    color: '#888',
  },
  card: {
    backgroundColor: '#fff',
    marginTop: 15,
    padding: 15,
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
  },
  body: {
    fontSize: 18,
    color: '#444',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 15,
    padding: 15,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: themeColor,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    color: '#444',
    marginBottom: 4,
    paddingLeft: 10,
  },
  detail: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  noImagesText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    padding: 20,
  },
});
