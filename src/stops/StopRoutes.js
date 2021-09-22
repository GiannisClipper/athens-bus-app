import React, { useEffect } from 'react';
import styles from './styles';
import { StyledView, StyledScrollView } from '../_abstract/Styled';
import { WorkingIndicator, ErrorMessage } from '../_commons/Messages';
import Route from '../routes/Route';
import useRequest from '../_abstract/useRequest';
import { URI } from '../_commons/constants';

const Main = StyledView( { style: styles.main } );
const List = StyledScrollView( { style: styles.list } );

const normalizeStopRoutes = data => {

    data = data.filter( row => row.hidden === '0' );

    const checksums = [];
    data = data.filter( row => {
        const checksum = row.RouteCode + row.RouteDescr;
        const exists = checksums.includes( checksum );
        if ( ! exists ) {
            checksums.push( checksum );
        }
        // console.log( 'checksums', checksums )
        return ! exists;
    } );

    data = data.map( row => ( {
        LineID: row.LineID,
        LineDescr: row.LineDescr,
        RouteCode: row.RouteCode,
        RouteDescr: row.RouteDescr,
        RouteType: row.RouteType,
        stops: {},
        schedule: {},
    } ) );

    data = data.sort( ( row1, row2 ) => row1.LineID < row2.LineID ? -1 : 1 );

    return data;
}

const StopRoutes = props => {

    const { stop } = props;
    const { routes } = stop;

    const { status } = useRequest( {

        uri: URI.ROUTES_OF_STOP + stop.StopCode,

        normalize: normalizeStopRoutes,

        store: routes,
    } );

    useEffect( () => console.log( 'StopRoutes', routes.data ) );

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
export { StopRoutes, normalizeStopRoutes };