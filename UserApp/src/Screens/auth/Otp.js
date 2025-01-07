import React, { useState, useRef } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MyTheme } from '../../components/ui/theme/color/Colors';

const { width, height } = Dimensions.get('window');
export default function OtpScreen({ navigation, route }) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputs = useRef([]); // Array to store references to TextInput elements
    const { number } = route.params;

    const handleTextChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Move to next input if text length is 1 and not the last input
        if (text.length === 1 && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e, index) => {
        // Move to previous input if text is removed and not the first input
        if (e.nativeEvent.key == "Backspace" && index > 0) {
            inputs.current[index - 1].focus();
        }
    };


    return (<View style={styles.container}>
        <LinearGradient style={styles.glassyView}
            colors={['rgba(162, 0, 255, 0.1)', 'rgba(0, 255, 247, 0.3)']}></LinearGradient>
        <Text style={styles.title}>Verify</Text>
        <Text style={styles.subtitle}>OTP has been send on number <Text style={{
            fontWeight: 'bold',
            color: MyTheme.primary
        }}>{number}</Text>
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {otp.map((digit, index) => (
                <TextInput
                    key={index}
                    ref={(input) => (inputs.current[index] = input)} // Store reference in array
                    maxLength={1}
                    keyboardType="phone-pad"
                    style={styles.numberInput}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    onChangeText={(text) => handleTextChange(text, index)}
                />
            ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Profile', { number }) }}>
            <Text style={styles.button_text}>Verify</Text>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: "100%",
        justifyContent: 'center',
        backgroundColor: '#f8f8f8',
        padding: 40,
    },
    button: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222',
    },
    button_text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        marginStart: 12
    },
    subtitle: {
        fontSize: 10,
        marginTop: 10,
        marginStart: 12,
        color: '#222'
    },
    numberInput: {
        width: '14%',
        backgroundColor: '#fff',
        marginTop: 30,
        color: '#222',
        padding: 12,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: 12,
    },
    glassyView: {
        position: 'absolute',
        width: width,
        height: height,
    }
});
