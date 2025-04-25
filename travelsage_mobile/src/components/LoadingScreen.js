import { View, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';

export const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF1E6', // soft countryside background
      }}
    >
      <Text
        style={{
          fontSize: 60,
          color: '#FF6B6B', // primary coral tone
          fontFamily: 'Sansita-Bold',
          paddingBottom: 20,
        }}
      >
        humsafar
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontFamily: 'Sansita-Regular',
          color: '#1b5363', // calm deep blue
          marginBottom: 30,
        }}
      >
        Explore · Plan · Experience
      </Text>
      <ActivityIndicator color={'#35b5ae'} size="large" />
    </View>
  );
};
