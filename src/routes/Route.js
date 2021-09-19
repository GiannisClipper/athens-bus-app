import React, { useState, useEffect } from 'react';
import { StyledView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import styles from './styles';

const Row = StyledTouchableOpacity( { style: styles.row } );
const RowIcon = StyledView( { style: styles.rowIcon } );
const RowIconText = StyledText( { style: styles.rowIconText } );
const RowDescr = StyledView( { style: styles.rowDescr } );
const RowDescrText = StyledText( { style: styles.rowDescrText } );

const Route = props => {

    const { route, navigation } = props;

    const [ isOpen, setIsOpen ] = useState( false );

    const onPress = () => {
        if ( ! isOpen && route.stops.error ) { 
            route.stops = {};  // clear cache in case of error to request again
        }
        setIsOpen( ! isOpen );
        navigation.navigate( 'RouteNav', { route } );
    }

    return (
        <>
        <Row 
            testID='route-row'
            onPress={ onPress }
        >

            <RowIcon>
                <RowIconText>&#8679;</RowIconText>
            </RowIcon>

            <RowDescr>
                <RowDescrText>{ route.RouteDescr }</RowDescrText>
            </RowDescr>

        </Row>

        {/* { isOpen ? <Stops route={ route } /> : null } */}
        </>
    );
}

export default Route;
