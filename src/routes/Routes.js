import React from 'react';
import { View } from 'react-native';

import { URI } from '../_commons/constants';
import { useRequest, initRequestStatus } from '../_abstract/useRequest';
import { routesResponseHandler } from './logic/responseHandlers';

import { WorkingIndicator, ErrorMessage } from '../_commons/Messages';
import Route from './Route';

const Routes = props => {

    const { line } = props;
    const { routes } = line;

    const { status } = useRequest( {
        uri: URI.ROUTES_OF_LINE + line.LineCode,
        requestStatus: initRequestStatus( routes ),
        responseHandler: response => routesResponseHandler( routes, response, line.LineID ),
    } );
 
    return (
        <View testID='routes'>

            { status.isRequesting ?
                <WorkingIndicator />

            : status.hasData ?
                <>
                { routes.data.map( ( route, i ) => (
                    <Route 
                        key={ i }
                        route={ route }
                    />
                ) ) } 
                </>

            : status.hasError ?
                <ErrorMessage>{ routes.error }</ErrorMessage>

            : null }

        </View>
    );
}

export default Routes;
