import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const Home = () => {

    return (
        <View>
            <Text style={ styles.homeTitleText }>ATHENS BUS</Text>
            <View style={ styles.homeSeparator }/>
            <Text style={ styles.homeSubTitleText }>Application developed by GiannisClipper</Text>
            <Text style={ styles.homeSubTitleText }>for practicing and demonstration purposes,</Text>
            <Text style={ styles.homeSubTitleText }>powered by OASA telematics API</Text>
            <Text style={ styles.homeSubTitleText }></Text>
        </View>
    );
}

export default Home;
