import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SingleBlog from '../screens/appFlow/SingleBlog';
import HomeScreen from '../screens/appFlow/HomeScreen';
import ShowTravelTips from '../screens/appFlow/ShowTravelTips';
import ProfileScreen from '../screens/appFlow/profileSection/ProfileScreen';

const ViewBlogs = createNativeStackNavigator();

const ViewBlogsNavigator = () => {
    return (
        <ViewBlogs.Navigator>
            <ViewBlogs.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <ViewBlogs.Screen
                name="SingleBlog"
                component={SingleBlog}
                options={{ headerShown: false }}
            />
            <ViewBlogs.Screen
                name="ShowTravelTips"
                component={ShowTravelTips}
                options={{ headerShown: false }}
            />
            <ViewBlogs.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
        </ViewBlogs.Navigator>
    );
};

export default ViewBlogsNavigator;
