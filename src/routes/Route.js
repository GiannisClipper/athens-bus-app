import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
// TODO:
// import Stops from '../stops/Stops';

const Route = props => {

    const { route } = props;

    const [ isOpen, setIsOpen ] = useState( false );

    const onPress = () => setIsOpen( ! isOpen );

    return (
        <>
        <TouchableOpacity style={ styles.row } onPress={ onPress }>

            <View style={ styles.rowIcon }>
                <Text style={ styles.rowIconText }>&#8679;</Text>
            </View>

            <View style={ styles.rowDescr }>
                <Text style={ styles.rowDescrText }>{ route.RouteDescr }</Text>
            </View>

        </TouchableOpacity>

        {/* TODO:
        { isOpen ? <Stops route={ route } /> : null } */}
        </>
    );
}

export default Route;
