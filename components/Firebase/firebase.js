import React, { Component }  from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    AsyncStorage
} from 'react-native';

import * as firebase from 'firebase';
import 'firebase/firestore';

import { NativeRouter, Route, Link, Redirect  } from "react-router-native";

console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

export default class firebaseComponent extends React.Component {


    state = {
        scannerState: false,
        language: '',
        dataFire: '',
        dataArr: ['']
    };

    componentDidMount() {
        let that = this;
        firebase.firestore().collection("characters")
            .onSnapshot(function(querySnapshot) {
                let data = [];
                querySnapshot.forEach(function(doc) {

                    if( doc.data().complete === false){
                        data.push(doc.data().title);
                    }
                });

                that.setState(() => ({
                    dataArr: data
                }));

            });


        firebase.firestore().collection("characters").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                that.setState(() => ({
                    dataFire: doc.data().title
                }))
            });
        })
    };

    login() {
        firebase.auth().signInWithEmailAndPassword('qwerty@gmail.com', '123546').then(()  => {

        }, (error) => {
            alert(666);
        })
    }

    logout() {
        firebase.auth().signOut().then(()  => {

        }, (error) => {
            alert(666);
        })
    }

    register() {
        firebase.auth().createUserWithEmailAndPassword('qwerty@gmail.com', '123546').then(()  => {

        }, (error) => {
            alert(666);
        })
    }

    addM() {
        let ref = firebase.firestore().collection('characters').add({
            checked: false,
            user: 'sergs',
            link: 'https://www.google.com/',
        }).then(() => {

        }, (error) => {
            alert(error);
        });
    }


    readFire() {



    }





    render() {

        const items = this.state.dataArr.map(function(item){
            return <Text> {item} </Text>;
        });

        // const items = <Text> sdf </Text>;

        let openTxt = 'Open scanner';
        this.state.scannerState ? openTxt = 'Close scanner' : openTxt = 'Open get product';

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignContent: 'center'
            }}>

                <Link
                    to="/"
                    underlayColor="#f0f4f7"
                >
                    <Text style={{color: '#ffffff', flex:0, width:142, textAlign: 'center', }}>To home</Text>
                </Link>

                <Text>firebaseComponent</Text>
                {/*<Button title={'register'} onPress={() => this.register()} />*/}
                {/*<Button title={'logout'} onPress={() => this.logout()} />*/}
                {/*<Button title={'login'} onPress={() => this.login()} />*/}
                {/*<Button title={'readFire'} onPress={() => this.readFire()} />*/}


                <Button title={'add'} onPress={() => this.addM()} />

                {/*<Text>*/}
                    {/*{this.state.dataFire}*/}
                {/*</Text>*/}

                {items}

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


});

