import React, { useEffect } from 'react';

import { StyledView, StyledScrollView } from '../_abstract/Styled';
import * as style from './style/stops';

import { URI } from '../_commons/logic/constants';
import { useRequest, initRequestStatus } from '../_abstract/logic/useRequest';
import { stopRoutesResponseHandler } from './logic/responseHandlers';

import { WorkingIndicator, ErrorMessage } from '../_commons/Messages';
import Route from '../routes/Route';

const Container = StyledView( { style: style.container } );
const List = StyledScrollView( { style: style.list } );

const StopRoutes = props => {

    const { stop } = props;
    const { routes } = stop;

    const { status } = useRequest( {
        uri: URI.ROUTES_OF_STOP + stop.StopCode,
        requestStatus: initRequestStatus( routes ),
        responseHandler: response => stopRoutesResponseHandler( routes, response ),
    } );

    // useEffect( () => console.log( 'StopRoutes', routes.data ) );

    return ( 
        <Container testID='routes'>

        { status.isRequesting ?
            <WorkingIndicator />

        : status.hasData ?
            <List>
            { routes.data.map( ( route, i ) => (
                <Route 
                    key={ i }
                    route={ route }
                />
            ) ) } 
            </List>

        : status.hasError ?
            <ErrorMessage>{ routes.error }</ErrorMessage>

        : null }

        </Container>
    );
}

export default StopRoutes;
