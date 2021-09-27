import React, { useState, useEffect } from 'react';

import { StyledView, StyledScrollView } from '../_abstract/Styled';
import * as style from './style/stopArrivals';

import { URI } from '../_commons/logic/constants';
import { useRequest, initRequestStatus } from '../_abstract/logic/useRequest';
import { stopRoutesResponseHandler, stopArrivalsResponseHandler } from '../stops/logic/responseHandlers';

import { WorkingIndicator, InfoMessage, ErrorMessage } from '../_commons/Messages';
import StopArrival from './StopArrival';

const Container = StyledView( { style: style.container } );
const List = StyledScrollView( { style: style.list } );

const StopArrivals = props => {

    const { navigation, stop } = props;
    const { arrivals, routes } = stop;

    const [ refreshTime, setRefreshTime ] = useState( null );

    useEffect( () => {
        const unsubscribe = navigation.addListener( 'focus', () => {
            setRefreshTime( 20000 );
        } );
        return unsubscribe;
    }, [ navigation ]);

    useEffect( () => {
        const unsubscribe = navigation.addListener( 'blur', () => {
            setRefreshTime( null );
        } );
        return unsubscribe;
    }, [ navigation ]);

    const routesRequest = useRequest( {
        uri: URI.ROUTES_OF_STOP + stop.StopCode,
        requestStatus: initRequestStatus( routes ),
        responseHandler: response => stopRoutesResponseHandler( routes, response ),
    } );

    const arrivalsRequest = useRequest( {
        uri: URI.ARRIVALS_OF_STOP + stop.StopCode,
        requestStatus: initRequestStatus( arrivals ),
        responseHandler: response => stopArrivalsResponseHandler( arrivals, response ),
        refreshTime, // 20000 milliseconds
    } );

    const routesStatus = routesRequest.status;
    const arrivalsStatus = arrivalsRequest.status;

    return (
        <Container testID='arrivals'>

            { arrivalsStatus.isRequesting || routesStatus.isRequesting ?
                <WorkingIndicator />

            : arrivalsStatus.hasData && routesStatus.hasData && arrivals.data.length === 0 ?
                <InfoMessage>{ 'No arrivals found.' }</InfoMessage>

            : arrivalsStatus.hasData && routesStatus.hasData ?
                <List>
                    { arrivals.data.map( ( arrival, i ) => (
                        <StopArrival
                            key={ i }
                            arrival={ arrival }
                            routes={ routes }
                        />
                    ) ) } 
                </List>

            : arrivalsStatus.hasError || routesStatus.hasError ?
                <ErrorMessage>{ arrivals.error + ' ' + routes.error }</ErrorMessage>

            : null }

        </Container>
    );
}

export default StopArrivals;
