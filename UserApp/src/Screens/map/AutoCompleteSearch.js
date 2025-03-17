import React from 'react';
import { View } from 'react-native';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-api';

const GooglePlacesInput = ({ onSelect }) => {
  return (
    <View>
      {/* <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2}
        autoFocus={true}
        returnKeyType={'search'}
        placeholderTextColor={'#333'}
        onPress={(data, details) => {
          onSelect(details);
        }}
        query={{
          key: 'YOUR_API_KEY',
          language: 'en',
          types: '(cities)',
        }}
        styles={{
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: '#5d5d5d',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
        currentLocation={true}
        currentLocationLabel="Current location"
      /> */}
    </View>
  );
};

export default GooglePlacesInput;