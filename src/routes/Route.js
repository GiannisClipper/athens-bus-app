import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import Stops from '../stops/Stops';

const Route = props => {

    const { route } = props;

    const [ isOpen, setIsOpen ] = useState( false );

    const onPress = () => {
        if ( ! isOpen && route.stops.error ) { 
            route.stops = {};  // clear cache in case of error to request again
        }
        setIsOpen( ! isOpen );
    }

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

        { isOpen ? <Stops route={ route } /> : null }
        </>
    );
}

export default Route;
