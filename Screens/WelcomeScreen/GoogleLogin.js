import React from "react"
import { StyleSheet, Text, View, Image, Button } from "react-native"
import Expo from "expo"
import * as Google from 'expo-google-app-auth';


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: "",
      isAndroid: false
    }
  }
  signIn = async () => {
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
        let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
        ) : (
          <LoginPage signIn={this.signIn} />
        )}
      </View>
    )
  }
}

const LoginPage = props => {
  return (
    <View>
      <Text style={styles.header}>Sign In With Google</Text>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  )
}

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome:{props.name}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
    </View>
  )
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