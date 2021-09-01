import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { lineGroupStyles as styles } from './styles';
import Lines from './Lines';

const LineGroup= props => {

    const { lines, group } = props;

    const [ isOpen, setIsOpen ] = useState( false );

    const onPress = () => setIsOpen( ! isOpen );

    useEffect( () => console.log( 'Rendering LineGroup:' + group ) );

    return (
        <>
        <TouchableOpacity style={ styles.row } onPress={ onPress }>

            <View style={ styles.rowIcon }>
                <Text style={ styles.rowIconText }>{ group } </Text>
            </View>

            <View style={ styles.rowDescr }>
            </View>

        </TouchableOpacity>

        { isOpen ? <Lines lines={ lines } group={ group } /> : null }
        </>
    );
}

export default LineGroup;
