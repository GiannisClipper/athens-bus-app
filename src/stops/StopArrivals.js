import React, { useContext, useState, useEffect } from 'react';

import { StyledView, StyledScrollView } from '../_abstract/Styled';
import * as style from './style/stopArrivals';

import { StopsContext } from './StopsContext';
import { RoutesContext } from '../routes/RoutesContext';
import { URI } from '../_commons/logic/constants';
import { useRequest, initRequestStatus } from '../_abstract/logic/useRequest';
import { stopRoutesResponseHandler, stopArrivalsResponseHandler } from '../stops/logic/responseHandlers';
import useInterval from '../_abstract/logic/useInterval';

import { WorkingIndicator, InfoMessage, Dialogue, ErrorMessage } from '../_commons/Messages';
import { ErrorButton } from '../_commons/Buttons';
import StopArrival from './StopArrival';

const Container = StyledView( { style: style.container } );
const List = StyledScrollView( { style: style.list } );

const REFRESH_TIME = 20000;  // milliseconds

const StopArrivals = props => {

    const { navigation, stopCode } = props;
    const { stops, saveStops } = useContext( StopsContext );
    const stop = stops[ stopCode ];
    const { routeCodes, arrivals } = stop;
    const { routes, saveRoutes } = useContext( RoutesContext );

    const routesRequest = useRequest( {
        uri: URI.ROUTES_OF_STOP + stopCode,
        requestStatus: initRequestStatus( routeCodes ),
        responseHandler: response => stopRoutesResponseHandler( {
            stops, stopCode, saveStops, routes, saveRoutes, response 
        } ),
    } );

    const arrivalsRequest = useRequest( {
        uri: URI.ARRIVALS_OF_STOP + stopCode,
        requestStatus: initRequestStatus( arrivals ),
        responseHandler: response => stopArrivalsResponseHandler( {
            stops, stopCode, saveStops, response 
        } ),
    } );

    const routesStatus = routesRequest.status;
    const routesSetStatus = routesRequest.setStatus;
    const arrivalsStatus = arrivalsRequest.status;
    const arrivalsSetStatus = arrivalsRequest.setStatus;


    const [ refreshTime, setRefreshTime ] = useState( REFRESH_TIME );

    const intervalId = useInterval( {
        action: () => arrivalsSetStatus( { toRequest: true } ),
        duration: refreshTime,
    } );

    useEffect( () => {
        const unsubscribe = navigation.addListener( 'blur', () => {
            setRefreshTime( null );
        } );
        return unsubscribe;
    }, [ navigation ]);

    useEffect( () => {
        const unsubscribe = navigation.addListener( 'focus', () => {
            if ( ! refreshTime ) { // when interval is suspended
                arrivalsSetStatus( { toRequest: true } );
                setRefreshTime( REFRESH_TIME );
            }
        } );
        return unsubscribe;
    }, [ navigation, refreshTime ]);

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
                <Dialogue>
                    { routeCodes.error ? <ErrorMessage>{ routeCodes.error }</ErrorMessage> : null }
                    { arrivals.error ? <ErrorMessage>{ arrivals.error }</ErrorMessage> : null }
                    <ErrorButton 
                        label='Retry'
                        onPress={ () => {
                            if ( routeCodes.error ) {
                                routesSetStatus( { toRequest: true } ) 
                            }
                            if ( arrivals.error ) {
                                arrivalsSetStatus( { toRequest: true } ) 
                            }
                        } }
                    />
                </Dialogue>

            : null }

        </Container>
    );
}

export default StopArrivals;
