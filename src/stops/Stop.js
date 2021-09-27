import React from 'react';
import * as RootNavigation from '../_commons/RootNavigation';
import { StyledView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import { StopIcon } from '../_commons/Icons';
import * as style from './style/stops';

const Row = StyledTouchableOpacity( { style: style.row } );
const Col1 = StyledView( { style: style.col1.view } );
const Col2 = StyledView( { style: style.col2.view } );
const Col2Text = StyledText( { style: style.col2.text } );

const Stop = props => {

    const { stop } = props;

    const onPress = () => {
        if ( stop.routes.error ) { 
            stop.routes = {};  // clear cache in case of error to request again
        }
        stop.arrivals = {};  // clear cache due to always request up to date values

        RootNavigation.navigate( 'StopNav', { stop } );  
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
