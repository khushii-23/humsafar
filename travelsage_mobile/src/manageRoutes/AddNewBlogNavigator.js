import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddNewBlog from '../screens/appFlow/createBlog/AddNewBlog';
import UploadPictureScreen from '../screens/appFlow/createBlog/UploadPictureScreen';
import BlogPreviewScreen from '../screens/appFlow/createBlog/BlogPreviewScreen';
import MapScreen from '../screens/appFlow/createBlog/MapScreen';
import AddTagsAndLocation from '../screens/appFlow/createBlog/AddTagsAndLocation';
import TravelTips from '../screens/appFlow/createBlog/TravelTips';
import RNSecureStorage from 'rn-secure-storage';

const AddNewBlogStack = createNativeStackNavigator();

const AddNewBlogNavigator = () => {

    return (
        <AddNewBlogStack.Navigator>
            <AddNewBlogStack.Screen
                name="AddNewBlog"
                component={AddNewBlog}
                options={{ headerShown: false }}
            />
            <AddNewBlogStack.Screen
                name="UploadPictureScreen"
                component={UploadPictureScreen}
                options={{ headerShown: false }}
            />
            <AddNewBlogStack.Screen
                name="AddTagsAndLocation"
                component={AddTagsAndLocation}
                options={{ headerShown: false }}
            />
            <AddNewBlogStack.Screen
                name="TravelTips"
                component={TravelTips}
                options={{ headerShown: false }}
            />
            <AddNewBlogStack.Screen
                name="BlogPreviewScreen"
                component={BlogPreviewScreen}
                options={{ headerShown: false }}
            />
        </AddNewBlogStack.Navigator>
    );
};

export default AddNewBlogNavigator;
