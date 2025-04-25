import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    SafeAreaView
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Icon } from '@rneui/base';
import { saveFormData, loadFormData } from '../../../utils/blogLocalStorage';

export default function UploadScreen({ navigation, route }) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        loadFormData('UploadScreen').then((data) => {
            if (data) {
                setImages(data.images || []);
            }
        });
    }, []);

    const handleChoosePhotos = () => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                setImages([...images, ...response.assets]);
            }
        });
    };

    const handleRemoveImage = (uri) => {
        setImages(images.filter(image => image.uri !== uri));
    };

    const handleNext = () => {
        if (images.length === 0) {
            Alert.alert('Error', 'Please select at least one image');
            return;
        }

        const formData = {
            ...route.params,
            images,
        };

        saveFormData('UploadScreen', formData).then(() => {
            navigation.navigate('AddTagsAndLocation', formData);
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back-ios" size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.title}>Upload Images</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.imageContainer}>
                    {images.length === 0 ? (
                        <Text style={styles.placeholderText}>No images selected</Text>
                    ) : (
                        images.map((image, index) => (
                            <View key={index} style={styles.imageWrapper}>
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => handleRemoveImage(image.uri)}
                            >
                                <Icon name="close" size={18} color="#fff" />
                            </TouchableOpacity>
                        
                            <Image source={{ uri: image.uri }} style={styles.image} />
                        </View>
                        
                        ))
                    )}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.uploadButton} onPress={handleChoosePhotos}>
                <Icon name="add-a-photo" color="#fff" size={22} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Icon name="arrow-forward-ios" color="#fff" size={22} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffeadd', // Soft peach background
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 20,
        marginBottom: 10,
    },
    iconButton: {
        backgroundColor: '#ff6b81',
        padding: 10,
        borderRadius: 30,
        elevation: 4,
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2d2a32',
        marginRight: 40,
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        gap: 10,
    },
    imageWrapper: {
        width: '100%',
        height: 240,
        marginVertical: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        padding: 16, // Adds visible padding around the image
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain', // Ensures full image is visible
        borderRadius: 12,
    },
    removeButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#ff6b81',
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        elevation: 6,
    },
    placeholderText: {
        fontSize: 16,
        color: '#aaa',
        marginTop: 20,
        textAlign: 'center',
        width: '100%',
    },
    uploadButton: {
        position: 'absolute',
        bottom: 90,
        right: 20,
        backgroundColor: '#ff6b81',
        padding: 16,
        borderRadius: 30,
        elevation: 5,
    },
    nextButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#ff6b81',
        padding: 16,
        borderRadius: 30,
        elevation: 5,
    },
});
