import { Alert, Dimensions, Linking, PermissionsAndroid, Platform, StyleSheet, Text, TextInput, Touchable, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, View } from 'react-native';
import { MyTheme } from '../ui/theme/color/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { PrivacyPolicyUrl, TermsOfService } from '../../data/const/URLs';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

const openPrivacyPolicy = () => {
    Linking.canOpenURL(PrivacyPolicyUrl).then(supported => {
        //     if (supported) {
        Linking.openURL(PrivacyPolicyUrl);
        // } else {
        //     console.log("Don't know how to open URI: " + PrivacyPolicyUrl);
        // }
    });
};

const openTermCondition = () => {
    Linking.canOpenURL(TermsOfService).then(supported => {
        // if (supported) {
        Linking.openURL(TermsOfService);
        // } else {
        //     console.log("Don't know how to open URI: " + TermsOfService);
        // }
    });
};

export default function GetStarted({ navigation }) {

    const [perGranted, setPerGranted] = useState(false)

    const goToNext = () => {
        if(perGranted){
            navigation.navigate("Login")
        }
    }

    const continueClick = async () => {

        if (Platform.OS === 'android') {
            const checkPermissions = (permissions) => {
                return Promise.all(permissions.map((p) => PermissionsAndroid.check(p)))
            }

            let granted = await checkPermissions([
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION])

            console.log(granted);
            if (granted[0] === true || Platform.Version < '33') {
                console.log("Notification granted");
            } else {
                PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS]).then(
                    (result) => {
                        if (result['android.permission.POST_NOTIFICATIONS'] === 'granted') {
                            console.log("Notification granted.");
                        }
                    })
            }

            if (granted[1] === false || granted[2] === false) {
                PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                ]).then((result) => {
                    if (result['android.permission.ACCESS_COARSE_LOCATION'] &&
                        result['android.permission.ACCESS_FINE_LOCATION'] === 'granted') {
                        console.log("Location granted");
                        setPerGranted(true)
                        goToNext()
                    }
                })
            } else {
                setPerGranted(true)
                goToNext()
            }
        }
    }

    return (
        <View style={[styles.container, {
            backgroundColor: MyTheme.windowBackground
        }]}>
            <LinearGradient style={styles.glassyView}
                colors={['rgba(255, 0, 221, 0.1)', 'rgba(0, 255, 247, 0.3)']}></LinearGradient>
            <Text style={{ fontWeight: 'bold', fontSize: 28, textAlign: 'center' }}>Let's go to infinite destinations</Text>
            <TouchableOpacity style={styles.button}
                onPress={continueClick}>
                <Text style={styles.button_text}>Continue </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', width: '100%', flexWrap: 'wrap', paddingHorizontal: 20, justifyContent: 'center' }}>
                <Text style={styles.condition_text}>By clicking continue you confirm that you agree to ZIP's </Text>
                <TouchableOpacity onPress={openTermCondition}><Text style={styles.link_text}>Terms of services</Text></TouchableOpacity>
                <TouchableHighlight><Text style={[styles.condition_text]}>  and  </Text></TouchableHighlight>
                <TouchableOpacity onPress={openPrivacyPolicy}><Text style={styles.link_text}>Privacy Policy.</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: "100%",
        top: '70%',
        position: 'absolute',
        alignItems: 'center',
        padding: 30,
        borderTopStartRadius: 20
    },
    button: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 20,
        marginBottom: 20,
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
    condition_text: {
        color: '#555',
        opacity: 0.2,
        fontSize: 8,
        fontWeight: 'bold'
    },
    link_text: {
        fontSize: 8,
        color: MyTheme.link,
        textDecorationLine: 'underline'
    },
    numberInput: {
        width: '100%',
        backgroundColor: '#eaeaea',
        marginTop: 18,
        color: '#222',
        padding: 12,
        borderRadius: 12,
    },
    glassyView: {
        position: 'absolute',
        width: width,
        height: '100%',
        backdropFilter: 'blur(10px)',
    },
});
