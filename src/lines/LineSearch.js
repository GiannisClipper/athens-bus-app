import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { lineGroupStyles as styles } from './styles';
import Lines from './Lines';

const LineSearch= props => {

    const { lines } = props;

    const [ searchText, setSearchText ] = useState( '' );

    const [ isOpen, setIsOpen ] = useState( false );

    const onPress = () => setIsOpen( ! isOpen );

    const isMatch = line => searchText !== '' && ( line.LineID.includes( searchText ) || line.LineDescr.includes( searchText ) );

    useEffect( () => console.log( 'Rendering LineSearch' ) );

    return (
        <>
        <TouchableOpacity style={ styles.row } onPress={ onPress }>

            <View style={ styles.rowIcon }>
                <Text style={ styles.rowIconText }> ? </Text>
            </View>

            <View style={ styles.rowDescr }>
                <TextInput  
                    style={ styles.rowDescrText }
                    placeholder="to search..."  
                    onFocus ={ () => setIsOpen( true ) }
                    onChangeText={ setSearchText }
                    onFocus ={ () => setIsOpen( true ) }
                />  
            </View>

        </TouchableOpacity>

        { isOpen ? <Lines lines={ lines } isMatch={ isMatch } /> : null }
        </>
    );
}

export default LineSearch;
