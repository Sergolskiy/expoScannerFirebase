import React, { Component }  from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';


export default class LogoComponent extends React.Component {

    handleClick() {
        this.setState(state => ({
            scannerState: !state.scannerState
        }));
    }


    render() {

        return (
            <View style={{
                height: 50
            }}>
                <Text style={{
                    color: '#ffffff',
                    fontSize: 25,
                    textAlign: 'center'
                }}>
                    SkladUsa.com
                </Text>

            </View>
        );
    }

}
