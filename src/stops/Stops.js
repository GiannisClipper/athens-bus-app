import React, { useEffect, useState } from 'react';
import styles from './styles';
import { StyledView, StyledScrollView } from '../_abstract/Styled';
import useRequest from '../_abstract/useRequest';
import { URI } from '../_commons/constants';
import { WorkingIndicator, ErrorMessage } from '../_commons/Messages';
import { Stop } from './Stop';

const Main = StyledView( { style: styles.main } );
const List = StyledScrollView( { style: styles.list } );

const Stops = props => {

    const { data, linesNavigation } = props;
    const { route } = data;
    const { stops } = route;

    const { status } = useRequest( {

        uri: URI.STOPS_OF_ROUTE + route.RouteCode,

        normalize: data => data
            .map( row => ( {
                StopCode: row.StopCode,
                StopDescr: row.StopDescr,
                arrivals: {},
                routes: {},
            } ) ),

        store: stops,
    } );
    
    return (
        <Main testID='stops'>

        { status.isRequesting ?
            <WorkingIndicator />

        : status.hasData ?
            <List>
            { stops.data.map( ( stop, i ) => (
                <Stop 
                    key={ i }
                    stop={ stop }
                    linesNavigation={ linesNavigation }
                />
            ) ) } 
            </List>

        : status.hasError ?
            <ErrorMessage>{ stops.error }</ErrorMessage>

        : null }

        </Main>
    );
}

export default Stops;
