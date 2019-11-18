import React from "react"
import { StyleSheet, Text, View, Image, Button } from "react-native"
import Expo from "expo"
import * as Google from 'expo-google-app-auth';



  

  const handleLogin = (user) => {

        axios.post('/user/login', {

            username: user.email,
            password: this.state.password,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber

        })
        .then((res) => {
            if(res.data.message !== undefined || res.data.error !== undefined) {
                //to-do show error or message and check repassword and password match
                console.log(res.data);

            } else if (res.data.token !== undefined) {
                deviceStorage.saveItem("userKey", res.data.token);
                this.props.navigation.navigate('AddDogInfo');
            }
        })
        .catch((err) => {
            console.log(err);
        });

    }


const signIn = async () => {
    let config = {   
        clientId : '1052898278525-mmgduocm94ekp53nojsnr2bhrho7bt3v.apps.googleusercontent.com'
      //   : this.state.isAndroid
      //     ?
      //     '1052898278525-c0tbueohhc3rqcto0gu8e8umkqt6p9mr.apps.googleusercontent.com'
      //     :
      //      '1052898278525-voe0dlmojlm2p9dn5da16u16fald8u69.apps.googleusercontent.com' // ios client id
  }
      const { type, accessToken, user } = await Google.logInAsync(config, )

    if (type === 'success') {
      // Then you can use the Google REST API
      console.log(accessToken)
      let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(user)
      
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
})

export default signIn