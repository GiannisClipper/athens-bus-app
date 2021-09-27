import React, { useState, useEffect } from 'react';
import { StyledView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import * as style from './style/lineGroups';
import Lines from './Lines';

const Row = StyledTouchableOpacity( { style: style.row } );
const Col1 = StyledView( { style: style.col1.view } );
const Col1Text = StyledText( { style: style.col1.text } );
const Col2 = StyledView( { style: style.col2.view } );

const LineGroup= props => {

    const { lines, group} = props;

    const [ isOpen, setIsOpen ] = useState( false );

    const onPress = () => setIsOpen( ! isOpen );

    const isMatch = line => line.LineID.substr( 0, 1 ) === group;

    useEffect( () => console.log( 'Rendering LineGroup:' + group ) );

    return (
        <>
        <Row 
            testID='group-row'
            onPress={ onPress }
        >

            <Col1>
                <Col1Text>{ group }</Col1Text>
            </Col1>

            <Col2 />

        </Row>

        { isOpen ? <Lines lines={ lines } isMatch={ isMatch } /> : null }
        </>
    );
}

export default LineGroup;
