import React from 'react';
import useRequest from '../core/useRequest';
import { URI } from '../commons/constants';
import { WorkingIndicator, ErrorMessage } from '../commons/Messages';
import Route from './Route';

const Routes = props => {

    const { line } = props;
    const { routes } = line;

    const { status } = useRequest( {

        uri: URI.ROUTES_OF_LINE + line.LineCode,

        normalize: data => data
            .map( row => ( {
                RouteCode: row.RouteCode,
                RouteDescr: row.RouteDescr,
                RouteType: row.RouteType,
                stops: {},
            } ) )
            .sort( ( row1, row2 ) => row1.RouteType < row2.RouteType ? -1 : 1 ),

        store: routes,
    } );
 
    return (
        status.isRequesting ?
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

        : null
    );
}

export default Routes;
