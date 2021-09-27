import React from 'react';

import { StyledView, StyledScrollView } from '../_abstract/Styled';
import * as style from './style/stops';

import { URI } from '../_commons/logic/constants';
import { useRequest, initRequestStatus } from '../_abstract/logic/useRequest';
import { stopsResponseHandler } from './logic/responseHandlers';

import { WorkingIndicator, ErrorMessage } from '../_commons/Messages';
import Stop from './Stop';

const Container = StyledView( { style: style.container } );
const List = StyledScrollView( { style: style.list } );

const Stops = props => {

    const { data } = props;
    const { route } = data;
    const { stops } = route;

    const { status } = useRequest( {
        uri: URI.STOPS_OF_ROUTE + route.RouteCode,
        requestStatus: initRequestStatus( stops ),
        responseHandler: response => stopsResponseHandler( stops, response ),
    } );
    
    return (
        <Container testID='stops'>

        { status.isRequesting ?
            <WorkingIndicator />

        : status.hasData ?
            <List>
            { stops.data.map( ( stop, i ) => (
                <Stop 
                    key={ i }
                    stop={ stop }
                />
            ) ) } 
            </List>

        : status.hasError ?
            <ErrorMessage>{ stops.error }</ErrorMessage>

        : null }

        </Container>
    );
}

export default Stops;
