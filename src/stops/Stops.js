import React, { useEffect, useState } from 'react';
import useRequest from '../core/useRequest';
import { URI } from '../commons/constants';
import { WorkingIndicator, ErrorMessage } from '../commons/Messages';
import Stop from './Stop';

const Stops = props => {

    const { route } = props;
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
        status.isRequesting ?
            <WorkingIndicator />

        : status.hasData ?
            <>
            { stops.data.map( ( stop, i ) => (
                <Stop 
                    key={ i }
                    stop={ stop }
                />
            ) ) } 
            </>

        : status.hasError ?
            <ErrorMessage>{ stops.error }</ErrorMessage>

        : null
    );
}

export default Stops;
