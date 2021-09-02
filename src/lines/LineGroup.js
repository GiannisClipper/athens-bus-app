import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { lineGroupStyles as styles } from './styles';
import Lines from './Lines';

const LineGroup= props => {

    const { lines, group } = props;

    const [ isOpen, setIsOpen ] = useState( false );

    const onPress = () => setIsOpen( ! isOpen );

    const isMatch = line => line.LineID.substr( 0, 1 ) === group;

    useEffect( () => console.log( 'Rendering LineGroup:' + group ) );

    return (
        <>
        <TouchableOpacity style={ styles.row } onPress={ onPress }>

            <View style={ styles.rowIcon }>
                <Text style={ styles.rowIconText }>{ group }</Text>
            </View>

            <View style={ styles.rowDescr }>
            </View>

        </TouchableOpacity>

        { isOpen ? <Lines lines={ lines } isMatch={ isMatch } /> : null }
        </>
    );
}

export default LineGroup;
