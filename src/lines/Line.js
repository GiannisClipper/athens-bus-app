import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { lineStyles as styles } from './styles';
import Routes from '../routes/Routes';

const Line = props => {

    const { line } = props;

    const [ isOpen, setIsOpen ] = useState( false );

    const onPress = () => setIsOpen( ! isOpen );

    // ID's of yellow lines (trolley) starting with a number and have 1 or 2 chars length

    const isDigit = char => '0123456789'.includes( char );

    const isYellow = LineID => LineID.length <=2 && isDigit( LineID.substr( 0, 1 ) );

    const Yellow_Blue = isYellow( line.LineID ) ? 'Yellow' : 'Blue';

    return (
        <>
        <TouchableOpacity style={ styles.row } onPress={ onPress }>

            <View style={ styles[ `rowIcon${ Yellow_Blue }` ] }>
                <Text style={ styles[ `rowIconText${ Yellow_Blue }` ] }>{ line.LineID }</Text>
            </View>

            <View style={ styles.rowDescr }>
                <Text style={ styles.rowDescrText }>{ line.LineDescr }</Text>
            </View>

        </TouchableOpacity>

        { isOpen ? <Routes line={ line } /> : null }
        </>
    );
}

export default Line;
