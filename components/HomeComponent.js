import React, { Component }  from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    AsyncStorage
} from 'react-native';


import { NativeRouter, Route, Link, Redirect  } from "react-router-native";
import LogoComponent from './LogoComponent';

export default class HomeComponent extends React.Component {

    state = {
        scannerState: false,
        language: '',
        name: '',
        cell: '',
        hasData: false,
        text: '1',
        auth: false,
        product: {
            name: '',
            user: '',
            upc: '',

        }
    };

    componentDidMount() {
        AsyncStorage.getItem('authentication_data').then((res) => {
            if (res == null) {
                this.setState(() => ({
                    auth: true
                }))
            }
        });
    }

    logout() {
        AsyncStorage.removeItem('authentication_data');
        this.setState(state => ({
            auth: true
        }));
    }



    render() {

        let openTxt = 'Open scanner';
        this.state.scannerState ? openTxt = 'Close scanner' : openTxt = 'Open get product';

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignContent: 'center'
            }}>

                <View style={styles.logout}>
                    <Button
                        color="#00a65a"
                        title='Logout'
                        style={{
                            marginTop: 10,
                            width: 100
                        }}
                        onPress={() => {this.logout()}}
                    />
                </View>


                {this.state.auth ? <Redirect to="/sigin" /> : <View/>}

                <LogoComponent/>

               <View style={{
                   justifyContent: 'center',
                   flexDirection: 'column',
                   alignItems: 'center'
               }}>

                   <Link
                       to="/getproduct"
                       underlayColor="#f0f4f7"
                       style={styles.button}
                   >
                       <Text style={{color: '#ffffff', flex:0, width:142, textAlign: 'center', }}>OPEN GET PRODUCT</Text>
                   </Link>
                   <Link
                       to="/postproduct"
                       underlayColor="#f0f4f7"
                       style={styles.button}
                   >
                       <Text style={{color: '#ffffff'}}>OPEN POST PRODUCT</Text>
                   </Link>
               </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({

    logout: {
        flex: 0,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        padding: 10,
        paddingTop: 0
    },

    button: {
        flex: 0,
        backgroundColor: '#00a65a',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 10,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#333333'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },

    dataBlock:{
        flex: 0,
        flexDirection: 'column',
        alignContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 2
    },

    inputBlock:{
        flex: 0,
        flexDirection: 'column',
        alignContent: 'center',
        marginTop: 5,
        marginBottom: 10,
    },

    inputStyle:{
        height: 30,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 5,
        width: '50%'
    }
});


// AppRegistry.registerComponent('HomeComponent', () => HomeComponent);
