import React from 'react';
import { View } from 'react-native';
import useRequest from '../_abstract/useRequest';
import { URI } from '../_commons/constants';
import { WorkingIndicator, ErrorMessage } from '../_commons/Messages';
import Route from './Route';

const Routes = props => {

    const { line, navigation } = props;
    const { routes } = line;

    const { status } = useRequest( {

        uri: URI.ROUTES_OF_LINE + line.LineCode,

        normalize: data => data
            .map( row => ( {
                LineID: line.LineID,
                RouteCode: row.RouteCode,
                RouteDescr: row.RouteDescr,
                RouteType: row.RouteType,
                stops: {},
            } ) )
            .sort( ( row1, row2 ) => row1.RouteType < row2.RouteType ? -1 : 1 ),

        store: routes,
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
                        navigation={ navigation }
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
