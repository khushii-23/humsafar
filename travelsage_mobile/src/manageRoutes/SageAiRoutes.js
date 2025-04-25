import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SeedDataSageAI from '../screens/appFlow/SageAI/SeedDataSageAI';
import QnASageAI from '../screens/appFlow/SageAI/QnASageAI';

const SageAIStack = createNativeStackNavigator();

const SageAINavigator = () => {

    return (
        <SageAIStack.Navigator>
            <SageAIStack.Screen
                name="SeedDataSageAI"
                component={SeedDataSageAI}
                options={{ headerShown: false }}
            />
            <SageAIStack.Screen
                name="QnASageAI"
                component={QnASageAI}
                options={{ headerShown: false }}
            />
        </SageAIStack.Navigator>
    );
};

export default SageAINavigator;
