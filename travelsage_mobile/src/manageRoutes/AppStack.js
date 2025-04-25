import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/Auth';
import InterestsScreen from '../components/InterestsScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from '@rneui/themed';
import AddNewBlogNavigator from '../manageRoutes/AddNewBlogNavigator';
import SearchBlogs from '../screens/appFlow/SearchBlogs';
import ViewBlogsNavigator from '../manageRoutes/ViewBlogsNavigator';
import SageAINavigator from './SageAiRoutes';
import { View, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export const AppStack = () => {
  const { authData } = useContext(AuthContext);

  return (
    <>
      {authData?.user?.interest?.length === 0 ? (
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="InterestsScreen" component={InterestsScreen} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#FF6B6B"
          inactiveColor="#333"
          shifting={true}
          barStyle={styles.tabBar}
          labeled={false}
        >
          <Tab.Screen
            name="Home"
            component={ViewBlogsNavigator}
            options={{
              tabBarIcon: ({ color }) => (
                <View style={styles.iconWrapper}>
                  <Icon name="home-filled" type="material" color={color} size={26} />
                </View>
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchBlogs}
            options={{
              tabBarIcon: ({ color }) => (
                <View style={styles.iconWrapper}>
                  <Icon name="search" type="material" color={color} size={26} />
                </View>
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="New Blog"
            component={AddNewBlogNavigator}
            options={{
              tabBarIcon: ({ color }) => (
                <View style={styles.iconWrapper}>
                  <Icon name="add" type="material" color={color} size={26} />
                </View>
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={SageAINavigator}
            options={{
              tabBarIcon: ({ color }) => (
                <View style={styles.iconWrapper}>
                  <Icon name="assistant" type="material" color={color} size={26} />
                </View>
              ),
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFF1E6',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    height: 70,
    paddingBottom: 10,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    top: -2,
  },
  addIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8F3',
    borderRadius: 30,
    padding: 6,
    elevation: 8,
    top: -20,
  },
});
