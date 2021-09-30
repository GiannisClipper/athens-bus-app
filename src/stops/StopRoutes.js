import React, { useContext, useEffect } from 'react';

import { StyledView, StyledScrollView } from '../_abstract/Styled';
import * as style from './style/stops';

import { StopsContext } from './StopsContext';
import { RoutesContext } from '../routes/RoutesContext';
import { URI } from '../_commons/logic/constants';
import { useRequest, initRequestStatus } from '../_abstract/logic/useRequest';
import { stopRoutesResponseHandler } from './logic/responseHandlers';

import { WorkingIndicator, ErrorMessage } from '../_commons/Messages';
import Route from '../routes/Route';

const Container = StyledView( { style: style.container } );
const List = StyledScrollView( { style: style.list } );

const StopRoutes = props => {

    const { stopCode } = props;
    const { stops, saveStops } = useContext( StopsContext );
    const stop = stops[ stopCode ];
    const { routeCodes } = stop;
    const { routes, saveRoutes } = useContext( RoutesContext );

    const { status } = useRequest( {
        uri: URI.ROUTES_OF_STOP + stop.StopCode,
        requestStatus: initRequestStatus( routes ),
        responseHandler: response => stopRoutesResponseHandler( {
            stops, stopCode, saveStops, routes, saveRoutes, response 
        } ),
    } );

    // useEffect( () => console.log( 'StopRoutes', routes.data ) );

    return ( 
        <Container testID='routes'>

        { status.isRequesting ?
            <WorkingIndicator />

        : status.hasData ?
            <List>
            { routeCodes.data.map( ( routeCode, i ) => (
                <Route 
                    key={ i }
                    routeCode={ routeCode }
                />
            ) ) } 
            </List>

        : status.hasError ?
            <ErrorMessage>{ routeCodes.error }</ErrorMessage>

        : null }

        </Container>
    );
}

export default StopRoutes;
