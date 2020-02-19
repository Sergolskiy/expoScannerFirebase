import React, { Component }  from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Animated,
    Easing,
    ScrollView,
    RefreshControl, AsyncStorage
} from 'react-native';

import Scanner from './Scanner';
import { NativeRouter, Route, Link, Redirect  } from "react-router-native";
import LogoComponent from './LogoComponent';

export default class GetProductComponent extends React.Component {

    state = {
        scannerState: false,
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

    handleLanguage = (dataScan) => {
        fetch('https://test.skladusa.com/api/product/upc/'+dataScan, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'MjpYdWJvNWlOR3VFZVJpdzRQU2VkZmtkcEgyWnlaWXM=',
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                let str = JSON.stringify(responseJson, null, 4);
                alert(str);
                this.setState(() => ({
                    product: {
                        name: responseJson.data.product.name,
                        user: responseJson.data.product.user,
                        upc: responseJson.data.product.upc,
                    },
                    hasData: true
                }));
            });
    };

    skipScan = (data) => {
        if(data){
            this.setState(() => ({
                name: '',
                cell: '',
                hasData: false,
                text: '1'
            }));
        }
    };



    render() {

        let openTxt = 'Open scanner';

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignContent: 'center'
            }}>

                <View style={styles.logout}>
                    <View style={{
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>
                        <Link
                            to="/"
                            underlayColor="#f0f4f7"
                            style={styles.button}
                        >
                            <Text style={{color: '#ffffff'}}>BACK TO HOME</Text>
                        </Link>

                    </View>

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

                <Text style={{color: 'white', textAlign: 'center'}}>Get Product</Text>

                {/*{this.state.scannerState && }*/}

                <Scanner onReadCode={this.handleLanguage} skipScanPass={this.skipScan} />


                {this.state.hasData &&
                <View style={styles.dataBlock}>
                    <Text>Name: {this.state.product.name} </Text>
                    <Text>User: {this.state.product.user} </Text>
                    <Text>Upc: {this.state.product.upc} </Text>

                    <View style={styles.inputBlock}>
                        <Text>Count </Text>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder="Count"
                            value={this.state.text}
                            onChangeText={(text) => this.setState({text})}
                        />
                    </View>

                    <Button
                        color="#00a65a"
                        title='Send'
                        style={{
                            marginTop: 10,
                        }}
                    />

                </View>
                }


            </View>
        );
    }

}

const styles = StyleSheet.create({

    logout: {
        flex: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        paddingTop: 0,
    },

    button: {
        backgroundColor: '#00a65a',
        padding: 8,
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
