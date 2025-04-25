import { Icon } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Alert,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { saveFormData, loadFormData } from '../../../utils/blogLocalStorage';

export default function AddNewBlog({ navigation, route }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [images, setImages] = useState([]);
    const [tagAndOther, setTagAndOther] = useState({});
    const [travelTips, setTravelTips] = useState({});
    const [dateTime, setDateTime] = useState('');

    useEffect(() => {
        loadFormData('AddNewBlog').then((data) => {
            if (data) {
                setTitle(data.title || '');
                setBody(data.body || '');
                setImages(data.images || []);
                setTagAndOther(data.tagAndOther || {});
                setTravelTips(data.travelTips || {});
                setDateTime(data.dateTime || new Date().toLocaleString());
            } else {
                setDateTime(new Date().toLocaleString());
            }
        });
    }, []);

    const handleNext = () => {
        if (!title || !body) {
            Alert.alert('Missing Fields', 'Please enter both a title and some content.');
            return;
        }

        const formData = {
            title,
            body,
            dateTime,
            images,
            tagAndOther,
            travelTips,
        };

        saveFormData('AddNewBlog', formData).then(() => {
            navigation.navigate('UploadPictureScreen', formData);
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.flex}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.heading}>✍️ Create New Blog</Text>

                    <Text style={styles.label}>Blog Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Enter blog title"
                        placeholderTextColor="#aaa"
                    />

                    <Text style={styles.label}>Published on</Text>
                    <Text style={styles.dateTime}>{dateTime}</Text>

                    <Text style={styles.label}>Blog Content</Text>
                    <TextInput
                        style={[styles.input, styles.bodyInput]}
                        value={body}
                        onChangeText={setBody}
                        placeholder="Start writing your blog..."
                        multiline
                        textAlignVertical="top"
                        placeholderTextColor="#aaa"
                    />

                    <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
                        <Icon name="arrow-forward" color="white" size={24} />
                        <Text style={styles.submitText}>Next</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fef6f1',
    },
    flex: {
        flex: 1,
    },
    container: {
        padding: 20,
        paddingBottom: 80,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4b2e83',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        color: '#555',
        marginBottom: 6,
        marginTop: 12,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        color: '#000',
    },
    bodyInput: {
        minHeight: 120,
        textAlignVertical: 'top',
    },
    dateTime: {
        fontSize: 14,
        color: '#666',
        paddingLeft: 6,
        marginBottom: 8,
    },
    submitButton: {
        flexDirection: 'row',
        backgroundColor: '#4caf50',
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        alignSelf: 'center',
        elevation: 4,
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});
