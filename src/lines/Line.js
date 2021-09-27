import React, { useState, useEffect } from 'react';
import { StyledView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import * as style from './style/line';
import Routes from '../routes/Routes';

const Row = StyledTouchableOpacity( { style: style.row } );
const Col2 = StyledView( { style: style.col2.view } );
const Col2Text = StyledText( { style: style.col2.text } );

const Line = props => {

    const { line } = props;

    const [ isOpen, setIsOpen ] = useState( false );

    const onPress = () => {
        if ( ! isOpen && line.routes.error ) { 
            line.routes = {};  // clear cache in case of error to request again
        }
        setIsOpen( ! isOpen );
    }

    const isDigit = char => '0123456789'.includes( char );
    const isTrolley = LineID => LineID.length <=2 && isDigit( LineID.substr( 0, 1 ) );
    // ID's of trolley lines starting with a number with 1 or 2 chars length
    const Trolley_Bus = isTrolley( line.LineID ) ? 'Trolley' : 'Bus';

    const Col1 = StyledView( { style: style.col1[ `view${ Trolley_Bus }` ] } );
    const Col1Text = StyledText( { style: style.col1[ `text${ Trolley_Bus }` ] } );

    return (
        <>
        <Row testID='line-row' onPress={ onPress }>

            <Col1 testID='line-icon'>
                <Col1Text>{ line.LineID }</Col1Text>
            </Col1>

            <Col2>
                <Col2Text>{ line.LineDescr }</Col2Text>
            </Col2>

        </Row>

        { isOpen ? <Routes line={ line } /> : null }
        </>
    );
}

export default Line;
