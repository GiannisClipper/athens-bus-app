import React, { useContext } from 'react';
import styles from './styles';
import { StyledView, StyledScrollView } from '../_abstract/Styled';
import { WorkingIndicator, ErrorMessage } from '../_commons/Messages';
import Route from '../routes/Route';
import useRequest from '../_abstract/useRequest';
import { URI } from '../_commons/constants';

const Main = StyledView( { style: styles.main } );
const List = StyledScrollView( { style: styles.list } );

const StopRoutes = props => {

    const { stop } = props;
    const { routes } = stop;

    const { status } = useRequest( {

        uri: URI.ROUTES_OF_STOP + stop.StopCode,

        normalize: data => data.map( row => ( {
            LineID: row.LineID,
            RouteCode: row.RouteCode,
            RouteDescr: row.RouteDescr,
            RouteType: row.RouteType,
            stops: {},
            schedule: {},
        } ) ),

        store: routes,
    } );

    return ( 
        <Main testID='routes'>

            { status.isRequesting ?
                <WorkingIndicator />

            : status.hasData ?
                <List>
                { routes.data.map( ( route, i ) => (
                    <Route 
                        key={ i }
                        route={ route }
                        // routeNavNavigation={ navigation }
                    />
                ) ) } 
                </List>

            : status.hasError ?
                <ErrorMessage>{ routes.error }</ErrorMessage>

            : null }

        </Main>
    );
}

export default StopRoutes;
