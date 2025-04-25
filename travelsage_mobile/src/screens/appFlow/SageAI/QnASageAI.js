import { Icon } from '@rneui/base';
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';

export default function QnASageAI({ navigation, route }) {
  const [inputText, setInputText] = useState('');
  const [sageAns, setSageAns] = useState({});
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const { category, locationName } = route.params;

  useEffect(() => {
    if (sageAns.answer) {
      setIsTyping(true);
      displayAnswerTypewriter(sageAns.answer);
    }
  }, [sageAns.answer]);

  const displayAnswerTypewriter = (answer) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= answer.length) {
        setDisplayedText(answer.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);
  };

  const handleSend = async () => {
    const payload = {
      category,
      locationName,
      question: inputText,
    };

    try {
      const response = await fetch('http://10.0.41.39:8000/api/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setSageAns(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.innerContainer}>
          <ScrollView contentContainerStyle={styles.content}>
            {displayedText === '' ? (
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Welcome to</Text>
                <Text style={styles.titleText}>SageAI</Text>
              </View>
            ) : (
              <View style={styles.displayContainer}>
                <Text style={styles.displayText}>{displayedText}</Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              multiline
              placeholder="Type your question here..."
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Icon name="send" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1E6',
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 30,
  },
  welcomeText: {
    fontFamily: 'Sansita-Bold',
    fontSize: 50,
    color: '#CFCFCF',
  },
  titleText: {
    fontFamily: 'Sansita-Bold',
    fontSize: 80,
    color: '#CFCFCF',
  },
  displayContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  displayText: {
    fontSize: 20,
    color: '#333',
    fontFamily: 'Sansita-Regular',
    lineHeight: 28,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 4,
    marginTop: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Sansita-Regular',
    color: '#333',
    paddingRight: 10,
  },
  sendButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 30,
    padding: 10,
  },
});
