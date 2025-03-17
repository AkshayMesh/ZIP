import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ActivityIndicator, Alert, useColorScheme } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MyTheme } from '../../components/ui/theme/color/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import GooglePlacesInput from './AutoCompleteSearch';
import { Modal } from 'react-native';
import { Button } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch, useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import { setDropLocation, setPickupLocation } from '../../data/redux/SliceReducer';
import { GOOGLE_MAP_KEY } from '../../data/const/URLs';

const { width, height } = Dimensions.get('window');
const BOTTOM_SHEET_HEIGHT = 200;

const DEFAULT_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.001,
  longitudeDelta: 0.001,
};

export default function MapScreen({ navigation }) {
  const darkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const [region, setRegion] = useState(DEFAULT_REGION);
  const [isLoading, setIsLoading] = useState(true);
  const [pickupLong, setPickupLong] = useState(0);
  const [pickupLat, setPickupLat] = useState(0);
  const [dropLong, setDropLong] = useState(0);
  const [dropLat, setDropLat] = useState(0);
  const [pickUpSelected, setPickUpSelected] = useState(false);
  const [dropSelected, setDropSelected] = useState(false);
  const [mapTitle, setMapTitle] = useState("Choose Pick Up Point")
  // const { pickupLocation } = useSelector((state) => state.pickupDrop)
  // const { dropLocation } = useSelector((state) => state.pickupDrop)
  const [modalVisible, setModalVisible] = useState(false);
  const mapRef = useRef(null);

  const onContinueClick = () => {
    // dispatch(setPickupLocation(location));
    if(dropSelected) {
      //TODO
    } else if (pickUpSelected) {
      setDropSelected(true);
      setMapTitle("Book Your Ride");
    } else {
      setPickUpSelected(true);
      setMapTitle("Choose Drop Point");
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        };
        setRegion(newRegion);
        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 1000);
        }
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const onMapReady = () => {
    setIsLoading(false);
    getCurrentLocation();
  };

  const handleLocationSelect = (location) => {
    setModalVisible(false);
  };

  const onRegionChange = (region) => {
    const { latitude, longitude } = region;
    if (dropSelected) {

    } else 
    if (pickUpSelected){
      setDropLat(latitude);
      setDropLong(longitude);
    } else {
      setPickupLat(latitude);
      setPickupLong(longitude)
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={darkMode ? mapDarkStyle : mapStandardStyle}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onMapReady={onMapReady}
        onRegionChange={onRegionChange}>
        {pickUpSelected && dropSelected && <MapViewDirections
          origin={{ latitude: pickupLat, longitude: pickupLong }}
          destination={{ latitude: dropLat, longitude: dropLong }}
          strokeWidth={3}
          apikey={GOOGLE_MAP_KEY}
          strokeColor="black"
        />}
        {pickUpSelected && <Marker
          coordinate={{
            latitude: pickupLat,
            longitude: pickupLong,
          }}
          // image={<Icon name="map-marker" size={12} color={MyTheme.primary}/>}
          title='Pick Up'>
        </Marker>}
        {dropSelected && <Marker
          coordinate={{
            latitude: dropLat,
            longitude: dropLong,
          }}
          // image={<Icon name="map-marker" size={12} color={'red'}/>}
          title='Drop'>
        </Marker>}
      </MapView>

      {/* Custom Marker UI */}
      <View style={styles.marker}>
        <Icon name="map-marker" size={30} color={MyTheme.primary} />
      </View>

      {/* {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={MyTheme.primary} />
          <Text style={styles.loadingText}>Loading Map...</Text>
        </View>
      )} */}

      <View style={styles.bottomSheet}>
        <Text style={styles.title}>{mapTitle}</Text>

        <View style={styles.locationInputs}>
          <View style={styles.inputContainer}>
            <Icon name="map-marker" size={12} color={MyTheme.primary} />
            <Text numberOfLines={1} style={styles.inputText}>{"Lat : "+pickupLat + ", Long" + pickupLong}</Text>
          </View>
          {pickUpSelected && (<View style={styles.inputContainer}>
            <Icon name="map-marker" size={12} color={'red'} />
            <Text numberOfLines={1} style={styles.inputText}>{"Lat : "+dropLat + ", Long" + dropLong}</Text>
          </View>)}
        </View>

        <TouchableOpacity style={styles.bookButton} onPress={onContinueClick}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const mapStandardStyle = []
const mapDarkStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height - BOTTOM_SHEET_HEIGHT,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  loadingText: {
    marginTop: 10,
    color: MyTheme.primary,
    fontSize: 16,
  },
  currentLocationButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: MyTheme.primary,
    borderRadius: 30,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  locationInputs: {
    gap: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  inputText: {
    color: '#666',
    fontSize: 16,
  },
  bookButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  marker: {
    position: 'absolute',
    width: width,
    height: height - BOTTOM_SHEET_HEIGHT - 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
});