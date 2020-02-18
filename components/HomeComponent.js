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
    RefreshControl
} from 'react-native';

import Scanner from './Scanner';
import LogoComponent from './LogoComponent';

export default class HomeComponent extends React.Component {

    // constructor() {
    //
    //
    //
    //     // this.handleClick = this.handleClick.bind(this);
    // }

    state = {
        scannerState: false,
        language: '',
        name: '',
        cell: '',
        hasData: false,
        text: '1'
    };

    handleLanguage = (langValue) => {
        fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState(() => ({
                    name: responseJson.movies[0].title,
                    cell: responseJson.movies[0].releaseYear,
                    hasData: true,
                }));

                alert(this.state.hasData);

            })
            .catch((error) => {
                console.error(error);
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

    handleClick() {
        this.setState(state => ({
            scannerState: !state.scannerState,
            hasData: false
        }));
    }



    render() {

        let openTxt = 'Open scanner';

        if(this.state.scannerState){
            openTxt = 'Close scanner';
        } else {
            openTxt = 'Open scanner';
        }

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignContent: 'center'
            }}>
               <LogoComponent/>

               <View style={{
                   justifyContent: 'center',
                   flexDirection: 'row',
               }}>
                <Button
                    color="#00a65a"
                    title={openTxt}
                    onPress={()=> {this.handleClick()}}
                />
               </View>

                {this.state.scannerState && <Scanner onReadCode={this.handleLanguage} skipScanPass={this.skipScan} />}

                {this.state.hasData &&
                    <View style={styles.dataBlock}>
                         <Text>Name: {this.state.name} </Text>
                         <Text>Cell: {this.state.cell} </Text>

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
