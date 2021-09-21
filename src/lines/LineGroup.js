import React, { useState, useEffect } from 'react';
import { StyledView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import { lineGroupStyles as styles } from './styles';
import Lines from './Lines';

const Row = StyledTouchableOpacity( { style: styles.row } );
const RowIcon = StyledView( { style: styles.rowIcon } );
const RowIconText = StyledText( { style: styles.rowIconText } );
const RowDescr = StyledView( { style: styles.rowDescr } );

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

            <RowIcon>
                <RowIconText>{ group }</RowIconText>
            </RowIcon>

            <RowDescr />

        </Row>

        { isOpen ? <Lines lines={ lines } isMatch={ isMatch } /> : null }
        </>
    );
}

export default LineGroup;
