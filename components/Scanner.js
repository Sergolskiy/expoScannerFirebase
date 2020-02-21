import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Scanner(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);


    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);

        // alert(data);


        props.onReadCode(data);

        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };



    const skipScan = () => {
        props.skipScanPass(true);
    }

    const addScanProduct = () => {
        props.addScanProductPass(true);
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View
            style={{
                flexDirection: 'column',
                justifyContent: 'flex-start'
            }}>

            <View
                style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignContent: 'flex-start'
            }}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{height: 280, flex: 1}}
                />
            </View>

            <View style={{
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: 20,
                height: 36
            }}>
                {scanned &&
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20,}}>
                        <Button title={'Rescan'} onPress={() => {setScanned(false); skipScan();}} />

                        <Button title={'Next'} onPress={() => {setScanned(false); addScanProduct();}} />
                    </View>
                }
            </View>




        </View>
    );
}
