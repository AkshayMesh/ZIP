import { Alert, Dimensions, Linking, PermissionsAndroid, Platform, StyleSheet, Text, TextInput, Touchable, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, View } from 'react-native';
import { MyTheme } from '../ui/theme/color/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { PrivacyPolicyUrl, TermsOfService } from '../../data/const/URLs';
import { useState } from 'react';
import { Dialog, Portal, Button } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const openPrivacyPolicy = () => {
    Linking.canOpenURL(PrivacyPolicyUrl).then(supported => {
        Linking.openURL(PrivacyPolicyUrl);
    });
};

const openTermCondition = () => {
    Linking.canOpenURL(TermsOfService).then(supported => {
        Linking.openURL(TermsOfService);
    });
};

export default function GetStarted({ navigation }) {
    const [perGranted, setPerGranted] = useState(false);
    const [visibleNotificationDialog, setVisibleNotificationDialog] = useState(false);
    const [visibleLocationDialog, setVisibleLocationDialog] = useState(false);

    const goToNext = () => {
        if (perGranted) {
            navigation.navigate("Login");
        }
    };

    const continueClick = async () => {
        setVisibleNotificationDialog(true);
    };

    const requestNotificationPermission = async () => {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Notification permission granted");
            setVisibleNotificationDialog(false);
            requestLocationPermission();
        } else {
            Alert.alert("Permission Denied", "You need to allow notification permissions to proceed.");
        }
    };

    const requestLocationPermission = async () => {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);
        if (granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Location permission granted");
            setPerGranted(true);
            goToNext();
        } else {
            Alert.alert("Permission Denied", "You need to allow location permissions to proceed.");
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: MyTheme.windowBackground }]}>
            <LinearGradient style={styles.glassyView}
                colors={['rgba(255, 0, 221, 0.1)', 'rgba(0, 255, 247, 0.3)']}></LinearGradient>
            <Text style={{ fontWeight: 'bold', fontSize: 28, textAlign: 'center' }}>Let's go to infinite destinations</Text>
            <TouchableOpacity style={styles.button} onPress={continueClick}>
                <Text style={styles.button_text}>Continue </Text>
            </TouchableOpacity>

            <Text style={styles.condition_text}>By clicking continue you confirm that you agree to ZIP's </Text>
            <TouchableOpacity onPress={openTermCondition}><Text style={styles.link_text}>Terms of services</Text></TouchableOpacity>
            <TouchableHighlight><Text style={[styles.condition_text]}>  and  </Text></TouchableHighlight>
            <TouchableOpacity onPress={openPrivacyPolicy}><Text style={styles.link_text}>Privacy Policy.</Text></TouchableOpacity>

            <Portal>
                <Dialog visible={visibleNotificationDialog} onDismiss={() => setVisibleNotificationDialog(false)}>
                    <Dialog.Title>Notification Permission</Dialog.Title>
                    <Dialog.Content>
                        <Text>We need your permission to send notifications.</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setVisibleNotificationDialog(false)}>Cancel</Button>
                        <Button onPress={requestNotificationPermission}>Allow</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <Portal>
                <Dialog visible={visibleLocationDialog} onDismiss={() => setVisibleLocationDialog(false)}>
                    <Dialog.Title>Location Permission</Dialog.Title>
                    <Dialog.Content>
                        <Text>We need your permission to access your location.</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setVisibleLocationDialog(false)}>Cancel</Button>
                        <Button onPress={requestLocationPermission}>Allow</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
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
