import React, { useState, useEffect } from 'react';
import { StyledView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import * as style from './style/lineGroups';
import Lines from './Lines';

const Row = StyledTouchableOpacity( { style: style.row } );
const Col1 = StyledView( { style: style.col1.view } );
const Col1Text = StyledText( { style: style.col1.text } );
const Col2 = StyledView( { style: style.col2.view } );

const LineGroup= props => {

    const { lineGroup } = props;

    const [ isOpen, setIsOpen ] = useState( false );

    const onPress = () => setIsOpen( ! isOpen );

    // useEffect( () => console.log( 'Rendering LineGroup:' + lineGroup.lineGroup ) );

    return (
        <>
        <Row 
            testID='group-row'
            onPress={ onPress }
        >

            <Col1>
                <Col1Text>{ lineGroup.lineGroup }</Col1Text>
            </Col1>

            <Col2 />

        </Row>

        { isOpen ? <Lines lineCodes={ lineGroup.lineCodes } /> : null }
        </>
    );
}

export default LineGroup;
