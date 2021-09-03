import React, { useState, useEffect } from 'react';
import { StyledView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import { lineStyles as styles } from './styles';
import Routes from '../routes/Routes';

const Row = StyledTouchableOpacity( { style: styles.row } );
const RowDescr = StyledView( { style: styles.rowDescr } );
const RowDescrText = StyledText( { style: styles.rowDescrText } );

const Line = props => {

    const { line } = props;

    const [ isOpen, setIsOpen ] = useState( false );

    const onPress = () => {
        if ( ! isOpen && line.routes.error ) { 
            line.routes = {};  // clear cache in case of error to request again
        }
        setIsOpen( ! isOpen );
    }

    // ID's of yellow lines (trolley) starting with a number and have 1 or 2 chars length

    const isDigit = char => '0123456789'.includes( char );

    const isYellow = LineID => LineID.length <=2 && isDigit( LineID.substr( 0, 1 ) );

    const Yellow_Blue = isYellow( line.LineID ) ? 'Yellow' : 'Blue';

    const RowIcon = StyledView( { style: styles[ `rowIcon${ Yellow_Blue }` ] } );
    const RowIconText = StyledText( { style: styles[ `rowIconText${ Yellow_Blue }` ] } );

    return (
        <>
        <Row onPress={ onPress }>

            <RowIcon>
                <RowIconText>{ line.LineID }</RowIconText>
            </RowIcon>

            <RowDescr>
                <RowDescrText>{ line.LineDescr }</RowDescrText>
            </RowDescr>

        </Row>

        { isOpen ? <Routes line={ line } /> : null }
        </>
    );
}

export default Line;
