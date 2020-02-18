import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

import HomeComponent from './components/HomeComponent';

export default function App() {


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
            <HomeComponent/>
</View>
  );
}
