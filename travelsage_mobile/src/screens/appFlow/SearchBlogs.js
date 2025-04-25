import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Searchbar } from 'react-native-paper';

export default function SearchBlogs({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://10.0.41.39:8000/api/blogs?limit=5');
            if (!response.ok) throw new Error('Failed to fetch blog posts');
            const data = await response.json();
            setPosts(data.blogs);
            setFilteredPosts(data.blogs);
            setError(false);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const onChangeSearch = (query) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter((post) =>
                post.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPosts(filtered);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.centered}>
                <ActivityIndicator animating={true} size="large" color="#e86f6f" />
                <Text style={styles.loadingText}>Loading...</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.centered}>
                <Text style={styles.errorText}>
                    Failed to load blog posts. Please check your internet connection and try again.
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Searchbar
                placeholder="Search blogs"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.searchbar}
                iconColor="#e86f6f"
                inputStyle={{ color: '#000' }}
            />

            {searchQuery !== '' && filteredPosts.length === 0 ? (
                <View style={styles.centered}>
                    <Text style={styles.noPostsText}>No blog posts found</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredPosts}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SingleBlog', { blog: item })}
                            style={styles.resultItem}
                        >
                            <Text style={styles.resultText}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fef6f1',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    loadingText: {
        fontSize: 18,
        color: '#777',
        marginTop: 10,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
    searchbar: {
        margin: 15,
        borderRadius: 25,
        backgroundColor: '#f6edff',
    },
    resultItem: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    resultText: {
        fontSize: 16,
        color: '#333',
    },
    noPostsText: {
        fontSize: 16,
        color: '#777',
    },
});
