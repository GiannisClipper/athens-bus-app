import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useRequest from '../_abstract/useRequest';
import { URI } from '../_commons/constants';
import { WorkingIndicator, ErrorMessage } from '../_commons/Messages';
import Route from './Route';

const Routes = props => {

    const { line } = props;
    const { routes } = line;

    const navigation = useNavigation();

    const { status } = useRequest( {

        uri: URI.ROUTES_OF_LINE + line.LineCode,

        normalize: data => data
            .map( row => ( {
                LineID: line.LineID,
                LineCode: row.LineCode,
                RouteCode: row.RouteCode,
                RouteDescr: row.RouteDescr,
                RouteType: row.RouteType,
                stops: {},
                schedule: {},
                coords: {},
                map: {},
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
