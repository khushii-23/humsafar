import React from 'react';
import { View, Text, Button } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/Auth';
const CustomDrawerContent = () => {
    const navigation = useNavigation();

    const { authData, signOut } = useAuth()

    const handleLogout = () => {
        // Implement logout logic
        signOut()
    };

    // console.log(auth.user)

    return (
        <>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View>
                    {/* Header */}
                    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>AttendEase v0.2.0</Text>
                    </View>

                    {/* Drawer Content */}
                    {authData.role === 0 ? null :
                        <DrawerContentScrollView style={{ flex: 1 }}>
                            {/* Navigation Items */}
                            <View style={{ paddingVertical: 5 }}>
                                <Button title="Create Portal" onPress={() => navigation.navigate('Create Portal')} color='#d9534f' />
                            </View>
                            <View style={{ paddingVertical: 5 }}>
                                <Button title="View Portals" onPress={() => navigation.navigate('View Portals')} color='#d9534f' />
                            </View>
                            {/* Logout Button */}
                        </DrawerContentScrollView>
                    }
                    <View style={{ paddingVertical: 20 }}>
                        <Button title='Logout' onPress={handleLogout} color='#d9534f' />
                    </View>
                </View>
            </View>
            <View style={{ paddingVertical: 30, alignSelf: 'center' }}>
                <Text style={{ color: '#d9534f', fontSize: 30, fontWeight: 'bold' }}>AttendEase <Text style={{ fontSize: 18, color: 'black' }}>v0.2.0</Text></Text>
                <Text style={{ color: 'black', textAlign: 'center' }}>By Developers Cell Somaiya</Text>
            </View>
        </>
    );
};

export default CustomDrawerContent;
