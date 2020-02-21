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
    Picker,
    RefreshControl, AsyncStorage
} from 'react-native';

import Scanner from './Scanner';
import { NativeRouter, Route, Link, Redirect  } from "react-router-native";
import LogoComponent from './LogoComponent';

export default class GetProductComponent extends React.Component {

    state = {
        scannerState: true,
        hasData: false,
        text: '1',
        auth: false,
        temporaryProduct: {
            name: '',
            user: '',
            upc: '',
        },
        products: [],
        productsData: false,
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

    readCode = (dataScan) => {
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
                // alert(str);
                this.setState(() => ({
                    temporaryProduct: {
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
            this.skipTemporaryProduct();
        }
    };

    addScanProduct = (data) => {
        if(data){
            let state = this.state.products;
            state.push(this.state.temporaryProduct);

           this.skipTemporaryProduct();

            let str = JSON.stringify(this.state.products, null, 4);
            alert(str);
        }
    };

    skipTemporaryProduct = () => {
        this.setState(() => ({
            temporaryProduct: {
                name: '',
                user: '',
                upc: '',
            },
            hasData: false
        }));
    };

    removeLastProduct = () => {

        if(this.state.products.length > 0){
            let state = this.state.products;
            state.splice(-1,1);

            let str = JSON.stringify(this.state.products, null, 4);
            alert(str);
        }

    };

    doneProduct = () => {

        this.addScanProduct(true);

        this.setState(() => ({
            hasData: false,
            productsData: true,
        }))
    };


    closeOrder = () => {

        this.skipTemporaryProduct();

        this.setState(() => ({
            productsData: false,
            scannerState: false,
        }));

        let that = this;
        setTimeout(() => {
            that.setState(() => ({
                scannerState: true,
            }));
        }, 100);

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

                <ScrollView>
                    {this.state.scannerState &&

                    <Scanner onReadCode={this.readCode} skipScanPass={this.skipScan} addScanProductPass={this.addScanProduct} />

                    }


                    {this.state.hasData &&
                    <View style={styles.dataBlock}>
                        <Text>Name: {this.state.temporaryProduct.name} </Text>
                        <Text>User: {this.state.temporaryProduct.user} </Text>
                        <Text>Upc: {this.state.temporaryProduct.upc} </Text>

                        {/*<View style={styles.inputBlock}>*/}
                            {/*<Text>Count </Text>*/}
                            {/*<TextInput*/}
                                {/*style={styles.inputStyle}*/}
                                {/*placeholder="Count"*/}
                                {/*value={this.state.text}*/}
                                {/*onChangeText={(text) => this.setState({text})}*/}
                            {/*/>*/}
                        {/*</View>*/}

                        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10,}}>
                            {this.state.products.length > 0 &&
                                <Button
                                    color="#00a65a"
                                    title='remove last'
                                    onPress={this.removeLastProduct}
                                />
                            }

                                <Button
                                    color="#00a65a"
                                    title='done'
                                    onPress={this.doneProduct}
                                />

                        </View>

                    </View>
                    }

                    {this.state.productsData &&
                        <View style={styles.dataBlock}>
                            <View style={styles.productsDataList}>
                                {this.state.products.map(product =>
                                    <View style={styles.productsDataItem}>
                                        <Text> <Text style={styles.fontBold}>Name:</Text>  {product.name} </Text>
                                        <Text><Text style={styles.fontBold}>User:</Text> {product.user} </Text>
                                        <Text><Text style={styles.fontBold}>Upc:</Text> {product.upc} </Text>
                                    </View>
                                )}

                            </View>

                            <View>
                                <Text style={styles.fontBold}>Select shelf</Text>

                                <View style={{ borderWidth: 1, borderColor: 'black', marginBottom: 20}}>
                                    <Picker
                                        selectedValue={this.state.selectVal}
                                        style={{height: 30, width: '100%',}}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({selectVal: itemValue})
                                        }>
                                        <Picker.Item label="Select" value="Select" />
                                        <Picker.Item label="Java" value="java" />
                                        <Picker.Item label="JavaScript" value="js" />
                                    </Picker>
                                </View>

                                <Button
                                    color="#00a65a"
                                    title='Close order'
                                    onPress={this.closeOrder}
                                />
                            </View>

                        </View>
                    }

                </ScrollView>

            </View>
        );
    }

}

const styles = StyleSheet.create({

    fontBold: {
        fontWeight: 'bold',
    },

    productsDataList: {
        flex: 0,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    productsDataItem: {
        flex: 0,
        height: 100,
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        marginBottom: 10
    },

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
        marginBottom: 20,
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
