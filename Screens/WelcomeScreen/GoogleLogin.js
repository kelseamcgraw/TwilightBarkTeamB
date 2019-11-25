import * as Google from 'expo-google-app-auth';
import React from 'react';
import { Platform } from "@unimodules/core";
import axios from '../../util/Axios';
import deviceStorage from '../../services/deviceStorage';

class GoogleLogin extends React.Component{

    handleLogin = async (user, navigation) => {

        const u = await axios.post('/user/external/login', {

            username: user.email,
            externalID: user.id,
            email: user.email,
            externalType: "Google"

        })
        if (u.data.token !== undefined) {
            await deviceStorage.saveItem("userKey", u.data.token);
            if(u.data.message === 'user created') {
                console.log(u.data.message)
                navigation.navigate('AddDogInfo')
            } else if (u.data.message === 'success') {
                console.log(u.data.message)
                navigation.navigate('Feed')
            }
        } 

    }

    isAndroid = () => {

        return (Platform.OS === "android") ? true : false;

    }

    signIn = async (navigation) => {

        let config = {   
            clientId 
            : this.isAndroid()
            ?
            '1052898278525-c0tbueohhc3rqcto0gu8e8umkqt6p9mr.apps.googleusercontent.com'
            :
            '1052898278525-mmgduocm94ekp53nojsnr2bhrho7bt3v.apps.googleusercontent.com' // ios client id
    }
        const { type, accessToken, user } = await Google.logInAsync(config, )

        if (type === 'success') {
        // Then you can use the Google REST API
        let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        this.handleLogin(user, navigation);
        
        }
    }
}

const googleLogin = new GoogleLogin;
export default googleLogin;