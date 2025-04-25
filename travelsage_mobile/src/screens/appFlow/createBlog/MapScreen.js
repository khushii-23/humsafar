import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker, UrlTile, PROVIDER_DEFAULT } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = ({ navigation, route }) => {
    const [region, setRegion] = useState({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });

    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleRegionChangeComplete = (region) => {
        setRegion(region);
        setSelectedLocation({
            latitude: region.latitude,
            longitude: region.longitude,
        });
    };

    const handleSaveLocation = () => {
        if (selectedLocation) {
            route.params.onLocationSelect(selectedLocation);
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_DEFAULT}
                style={styles.map}
                initialRegion={region}
                onRegionChangeComplete={handleRegionChangeComplete}
            >
                <UrlTile
                    urlTemplate="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maximumZ={19}
                    flipY={false}
                />
                {selectedLocation && (
                    <Marker coordinate={selectedLocation} />
                )}
            </MapView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleSaveLocation}>
                    <Text style={styles.buttonText}>Save Location</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#008080',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default MapScreen;
