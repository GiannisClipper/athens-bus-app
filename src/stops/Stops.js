import React, { useContext } from 'react';
import { StyledView, StyledScrollView } from '../_abstract/Styled';
import * as style from './style/stops';

import { RoutesContext } from '../routes/RoutesContext';
import { StopsContext } from './StopsContext';
import { URI } from '../_commons/logic/constants';
import { useRequest, initRequestStatus } from '../_abstract/logic/useRequest';
import { stopsResponseHandler } from './logic/responseHandlers';

import { WorkingIndicator, Dialogue, ErrorMessage } from '../_commons/Messages';
import { ErrorButton } from '../_commons/Buttons';
import Stop from './Stop';

const Container = StyledView( { style: style.container } );
const List = StyledScrollView( { style: style.list } );

const Stops = props => {

    const { routeCode } = props;
    const { routes, saveRoutes } = useContext( RoutesContext );
    const route = routes[ routeCode ];
    const { stopCodes } = route;

    const { stops, saveStops } = useContext( StopsContext );

    const { status, setStatus } = useRequest( {
        uri: URI.STOPS_OF_ROUTE + routeCode,
        requestStatus: initRequestStatus( stopCodes ),
        responseHandler: response => stopsResponseHandler( {
            routes, routeCode, saveRoutes, stops, saveStops, response 
        } ),
    } );

    return (
        <Container testID='stops'>

        { status.isRequesting ?
            <WorkingIndicator />

        : status.hasData && stopCodes.data ?
            <List>
            { stopCodes.data.map( ( stopCode, i ) => (
                <Stop 
                    key={ i }
                    stopCode={ stopCode }
                />
            ) ) } 
            </List>

        : status.hasError?
            <Dialogue>
                <ErrorMessage>{ stopCodes.error }</ErrorMessage>
                <ErrorButton 
                    label='Retry'
                    onPress={ () => setStatus( { toRequest: true } ) }
                />
            </Dialogue>

        : null }

        </Container>
    );
}

export default Stops;
