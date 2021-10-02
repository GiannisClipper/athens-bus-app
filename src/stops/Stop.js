import React, { useContext } from 'react';
import * as rootNavigation from '../_commons/logic/rootNavigation';
import { StyledView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import { StopIcon } from '../_commons/Icons';
import * as style from './style/stops';
import { StopsContext } from './StopsContext';

const Row = StyledTouchableOpacity( { style: style.row } );
const Col1 = StyledView( { style: style.col1.view } );
const Col2 = StyledView( { style: style.col2.view } );
const Col2Text = StyledText( { style: style.col2.text } );

const Stop = props => {

    const { stopCode } = props;
    const { stops, saveStops } = useContext( StopsContext );
    const stop = stops[ stopCode ];

    const onPress = () => {
        if ( stop.arrivals.data ) {
            // remove current data due to force request and get the most recent arrivals
            stop.arrivals = { data: null, error: null };
            saveStops( { ...stops, [ stop.StopCode ]: stop } );
        }

        rootNavigation.navigate( 'StopNav', { stop } );  
        // navigation.navigate() passes the parameters to the component throught `props.route.params`
    }

    return (
        <>
        <Row 
            testID='stop-row'
            onPress={ onPress }
        >

            <Col1>
                <StopIcon { ...style.icon } />
            </Col1>

            <Col2>
                <Col2Text>{ `${ stop.StopDescr } (${ stop.StopCode })` }</Col2Text>
            </Col2>

        </Row>

        </>
    );
}

export default Stop;
