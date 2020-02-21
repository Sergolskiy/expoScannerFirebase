import React from 'react';
import { Text, View, StyleSheet, Button, AsyncStorage  } from 'react-native';

import HomeComponent from './components/HomeComponent';
import signInComponent from './components/signInComponent';
import firebaseComponent from './components/Firebase/firebase';
import GetProductComponent from './components/GetProductComponent';
import PostProductComponent from './components/PostProductComponent';
import { NativeRouter, Route, Link, Redirect  } from "react-router-native";
import * as firebase from 'firebase';

export default function App() {

    const authData = AsyncStorage.getItem('authentication_data');
    let auth = false;

    const firebaseConfig = {
        apiKey: "AIzaSyAOb5yORKPBag8IYZrBClxlYRwkajelg9A",
        authDomain: "test-fa05f.firebaseapp.com",
        databaseURL: "https://test-fa05f.firebaseio.com",
        projectId: "test-fa05f",
        storageBucket: "test-fa05f.appspot.com",
        messagingSenderId: "430181871646",
        appId: "1:430181871646:web:0284a31be7cbbf36acbe0f",
        measurementId: "G-QDSYXW375L"
    };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }


    if (authData !== null) {
        auth = false;
    } else {
        auth = true;
    }

  return (



<View
    style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: 40,
        backgroundColor: '#367fa9'
    }}>



    <NativeRouter>
        {/*<Link*/}
            {/*to="/firebase"*/}
            {/*underlayColor="#f0f4f7"*/}
        {/*>*/}
            {/*<Text style={{color: '#ffffff', flex:0, width:142, textAlign: 'center', }}>OPEN GET PRODUCT</Text>*/}
        {/*</Link>*/}

        <Route exact path="/">
            {auth ? <Redirect to="/sigin" /> : <HomeComponent />}
        </Route>
        <Route exact path="/sigin" component={signInComponent} />
        <Route exact path="/getproduct" component={GetProductComponent} />
        <Route exact path="/postproduct" component={PostProductComponent} />
        <Route exact path="/firebase" component={firebaseComponent} />


    </NativeRouter>

</View>
  );
}
