import React, { useContext } from 'react';
import { View } from 'react-native';

import { LinesContext } from '../lines/LinesContext';
import { RoutesContext } from './RoutesContext';
import { URI } from '../_commons/logic/constants';
import { useRequest, initRequestStatus } from '../_abstract/logic/useRequest';
import { routesResponseHandler } from './logic/responseHandlers';

import { WorkingIndicator, ErrorMessage } from '../_commons/Messages';
import Route from './Route';

const Routes = props => {

    const { lineCode } = props;
    const { lines, saveLines } = useContext( LinesContext );
    const line = lines[ lineCode ];
    const { routeCodes } = line;

    const { routes, saveRoutes } = useContext( RoutesContext );

    const { status } = useRequest( {
        uri: URI.ROUTES_OF_LINE + lineCode,
        requestStatus: initRequestStatus( routeCodes ),
        responseHandler: response => routesResponseHandler( {
            lines, lineCode, saveLines, routes, saveRoutes, response,
        }),
    } );
 
    return (
        <View testID='routes'>

            { status.isRequesting ?
                <WorkingIndicator />

            : status.hasData ?
                <>
                { routeCodes.data.map( ( routeCode, i ) => (
                    <Route 
                        key={ i }
                        routeCode={ routeCode }
                    />
                ) ) } 
                </>

            : status.hasError ?
                <ErrorMessage>{ routeCodes.error }</ErrorMessage>

            : null }

        </View>
    );
}

export default Routes;
