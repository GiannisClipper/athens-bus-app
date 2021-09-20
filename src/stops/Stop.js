import React from 'react';
import { StyledView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import styles from './styles';

const Row = StyledTouchableOpacity( { style: styles.row } );
const RowIcon = StyledView( { style: styles.rowIcon } );
const RowIconText = StyledText( { style: styles.rowIconText } );
const RowDescr = StyledView( { style: styles.rowDescr } );
const RowDescrText = StyledText( { style: styles.rowDescrText } );

const Stop = props => {

    const { stop, linesNavigation } = props;

    const onPress = () => {
        if ( stop.routes.error ) { 
            stop.routes = {};  // clear cache in case of error to request again
        }
        stop.arrivals = {};  // clear cache due to always request up to date values

        linesNavigation.navigate( 'StopNav', { stop } );  
        // navigation.navigate() passes the parameters to the component throught `props.route.params`
    }

    return (
        <>
        <Row 
            testID='stop-row'
            onPress={ onPress }
        >

            <RowIcon>
                <RowIconText>&#9995;&#127996;</RowIconText>
            </RowIcon>

            <RowDescr>
                <RowDescrText>{ `${ stop.StopDescr } (${ stop.StopCode })` }</RowDescrText>
            </RowDescr>

        </Row>

        {/* { isOpen 
            ? 
            <Arrivals 
                stop={ stop } 
                closeArrivals={ closeArrivals } 
                isMyStop={ isMyStop }
                toggleMyStop={ toggleMyStop }
            /> 
            : 
            null 
        } */}
        </>
    );
}

const SimpleStop = props => {

    const { stop } = props;

    return (
        <Row>

            <RowIcon>
                <RowIconText>&#9995;&#127996;</RowIconText>
            </RowIcon>

            <RowDescr>
                <RowDescrText>{ `${ stop.StopDescr } (${ stop.StopCode })` }</RowDescrText>
            </RowDescr>

        </Row>
    );
}

export default Stop;
export { Stop, SimpleStop };