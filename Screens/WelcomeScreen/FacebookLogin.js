import * as Facebook from 'expo-facebook';
import { Platform } from "@unimodules/core";
import React from 'react';
import axios from '../../util/Axios';
import deviceStorage from '../../services/deviceStorage';

class FacebookLogin extends React.Component {

    isAndroid = () => { return (Platform.OS === "android") ? true : false; }

    handleLogin = async (user, navigation) => {

        const u = await axios.post('/user/external/login', {

            username: user.name,
            externalID: user.id,
            externalType: "Faceboook"

        })
        if (u.data.token !== undefined) {
            await deviceStorage.saveItem("userKey", u.data.token);
            if(u.data.message === 'user created') {
                navigation.navigate('AddDogInfo')
            } else if (u.data.message === 'success') {
                deviceStorage.saveItem('isLoggedIn', '1');
                navigation.navigate('Feed')
            }
        } 

    }

    logIn = async (navigator) => {
        try {
        const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync('2491239704446176', {
            permissions: ['public_profile'],
        });
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            const jsonres = await response.json();
            this.handleLogin(jsonres, navigator);
        } else {
            // type === 'cancel'
            navigator.navigate('Splash')
        }
        } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
        }
    }
}

const facebookLogin = new FacebookLogin
 export default facebookLogin;