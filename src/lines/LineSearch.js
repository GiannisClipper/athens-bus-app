import React, { useState, useEffect } from 'react';
import { StyledView, StyledTouchableOpacity, StyledText, StyledTextInput } from '../_abstract/Styled';
import * as style from './style/lineGroups';
import Lines from './Lines';

const Row = StyledTouchableOpacity( { style: style.row } );
const Col1 = StyledView( { style: style.col1.view } );
const Col1Text = StyledText( { style: style.col1.text } );
const Col2 = StyledView( { style: style.col2.view } );
const Col2TextInput = StyledTextInput( { style: style.col2.text } );

const searchLines = ( lines, searchText ) => 
    searchText !== ''
        ? 
        Object.keys( lines ).filter( lineCode => 
            lines[ lineCode ].LineID.includes( searchText ) || lines[ lineCode ].LineDescr.includes( searchText ) 
        )
        : 
        [];

const LineSearch= props => {

    const { lines } = props;

    const [ searchText, setSearchText ] = useState( '' );

    const [ isOpen, setIsOpen ] = useState( false );

    const onPress = () => setIsOpen( ! isOpen );

    // useEffect( () => console.log( 'Rendering LineSearch' ) );

    return (
        <>
        <Row
            testID='search-row' 
            onPress={ onPress }
        >

            <Col1>
                <Col1Text> ? </Col1Text>
            </Col1>

            <Col2>
                <Col2TextInput
                    placeholder="to search..."
                    value={ searchText }
                    onFocus ={ () => setIsOpen( true ) }
                    onChangeText={ setSearchText }
                    onFocus ={ () => setIsOpen( true ) }
                />  
            </Col2>

        </Row>

        { isOpen ? <Lines lineCodes={ searchLines( lines, searchText ) } /> : null }
        </>
    );
}

export default LineSearch;
