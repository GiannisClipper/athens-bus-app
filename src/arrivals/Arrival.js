import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const Arrival = props => {

    const { arrival, routes } = props;

    const result = routes.data.filter( route => route.RouteCode === arrival.RouteCode );

    const minutes = arrival.minutes ? `${ arrival.minutes }'` : '';
    const LineID = result.length > 0 ? `[ ${ result[ 0 ].LineID } ]` : '';
    const RouteDescr = result.length > 0 ? result[ 0 ].RouteDescr : arrival.RouteCode;

    return (
        <>
        <View style={ styles.row }>

            <View style={ styles.rowIcon }>
                <Text style={ styles.rowIconText }>{ minutes }</Text>
            </View>

            <View style={ styles.rowDescr }>
                <Text style={ styles.rowDescrText }>{ `${ LineID } ${ RouteDescr }` }</Text>
            </View>

        </View>
        </>
    );
}

export default Arrival;
