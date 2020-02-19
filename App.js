import React from 'react';
import { Text, View, StyleSheet, Button, AsyncStorage  } from 'react-native';

import HomeComponent from './components/HomeComponent';
import signInComponent from './components/signInComponent';
import GetProductComponent from './components/GetProductComponent';
import PostProductComponent from './components/PostProductComponent';
import { NativeRouter, Route, Link, Redirect  } from "react-router-native";

export default function App() {

    const authData = AsyncStorage.getItem('authentication_data');
    let auth = false;


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

        <Route exact path="/">
            {auth ? <Redirect to="/sigin" /> : <HomeComponent />}
        </Route>
        <Route exact path="/sigin" component={signInComponent} />
        <Route exact path="/getproduct" component={GetProductComponent} />
        <Route exact path="/postproduct" component={PostProductComponent} />


    </NativeRouter>

</View>
  );
}
