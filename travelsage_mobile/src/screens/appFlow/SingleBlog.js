import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { Icon } from '@rneui/base';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

export default function SingleBlogScreen({ navigation, route }) {
  const { blog } = route.params;
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [refresh]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://10.0.41.39:8000/api/get-comments/${blog._id}`);
      const result = await response.json();
      if (result.success) {
        setComments(result.comments.reverse());
      } else {
        console.error('Failed to fetch comments:', result.message);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentUser}>{item.userId.firstName} {item.userId.lastName}</Text>
      <Text style={styles.commentText}>{item.comment}</Text>
    </View>
  );

  const handlePostComment = async () => {
    if (newComment.trim() === '') return;

    try {
      const response = await fetch('http://10.0.41.39:8000/api/post-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          userId: authData._id,
          comment: newComment,
          dateTime: new Date().toISOString(),
          blogId: blog._id
        })
      });
      const result = await response.json();
      if (result.success) {
        setNewComment('');
        setRefresh(!refresh);
      } else {
        console.error('Failed to post comment:', result.message);
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" color="white" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tipButton} onPress={() => navigation.navigate('ShowTravelTips', { blogId: blog._id })}>
          <Text style={styles.tipButtonText}>Travel Tips</Text>
          <Icon name="file-image-marker" type='material-community' color="white" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView stickyHeaderIndices={[1]}>
        <Swiper style={styles.wrapper} showsButtons={true}>
          {blog.images.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image source={{ uri: `http://10.0.41.39:8000/${image}` }} style={styles.image} />
            </View>
          ))}
        </Swiper>

        <View style={styles.card}>
          <Text style={styles.title}>{blog.title}</Text>
          <Text style={styles.dateTime}>{blog.dateTime}</Text>
          <Text style={styles.body}>{blog.body}</Text>

          <View style={styles.commentButtonWrapper}>
            <TouchableOpacity style={styles.tipButton} onPress={() => setIsPanelVisible(true)}>
              <Text style={styles.tipButtonText}>Comments</Text>
              <Icon name="comment" type='material' color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal transparent={true} visible={isPanelVisible} animationType="slide" onRequestClose={() => setIsPanelVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setIsPanelVisible(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.bottomSheetContainer}>
                <Text style={styles.commentsTitle}>Comments</Text>
                <FlatList
                  data={comments}
                  renderItem={renderComment}
                  keyExtractor={(item, index) => index.toString()}
                />
                <TextInput
                  style={styles.commentInput}
                  placeholder="Add a comment..."
                  value={newComment}
                  onChangeText={setNewComment}
                />
                <TouchableOpacity style={styles.tipButton} onPress={handlePostComment}>
                  <Text style={styles.tipButtonText}>Post Comment</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

// Just replacing the existing StyleSheet with this updated one:
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1E6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FF6B6B',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    elevation: 5,
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 20,
    padding: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
    fontFamily: 'Sansita-Bold',
  },
  dateTime: {
    fontSize: 13,
    color: '#888',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  body: {
    fontSize: 17,
    color: '#444',
    lineHeight: 26,
    marginBottom: 20,
    fontFamily: 'Sansita-Regular',
  },
  image: {
    width: width,
    height: 240,
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapper: {
    height: 240,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF1E6',
  },
  tipButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 26,
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tipButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 6,
  },
  commentButtonWrapper: {
    alignItems: 'flex-start',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  bottomSheetContainer: {
    backgroundColor: '#fff',
    padding: 20,
    height: 460,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  commentsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    fontFamily: 'Sansita-Bold',
  },
  commentContainer: {
    marginBottom: 14,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#FFECE0',
    borderColor: '#FFD1B5',
    borderWidth: 1,
  },
  commentUser: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 15,
  },
  commentText: {
    marginTop: 6,
    color: '#555',
    fontSize: 14,
  },
  commentInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    marginBottom: 14,
    backgroundColor: '#fff',
    fontSize: 15,
  },
});
