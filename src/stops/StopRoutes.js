import React, { useEffect } from 'react';
import styles from './styles';
import { StyledView, StyledScrollView } from '../_abstract/Styled';
import { createUniquesArr } from '../_abstract/uniquesArr';
import { WorkingIndicator, ErrorMessage } from '../_commons/Messages';
import Route from '../routes/Route';
import useRequest from '../_abstract/useRequest';
import { URI } from '../_commons/constants';
import { arrNotEqualAt } from '../_abstract/arrNotEqualAt';

const Main = StyledView( { style: styles.main } );
const List = StyledScrollView( { style: styles.list } );

const normalizeStopRoutes = data => {

    data = data.filter( row => row.hidden === '0' );

    // avoid some duplicated entries included in api responses (distinguished only by MasterLineCode)
    const uniqueRoutes = createUniquesArr();
    data = data.filter( row => uniqueRoutes.push( row.RouteCode + row.RouteDescr ) );

    // group all line descriptions by route code
    const linesDescr = {};
    data.forEach( row => linesDescr[ row.LineCode ] = {} );
    data.forEach( row => linesDescr[ row.LineCode ][ row.RouteCode ] = row.LineDescr );
    // {     
    //     "1137": {  // LineCode:
    //         "2458": "ΕΥΓΕΝΕΙΑ-ΧΑΡΑΥΓΗ-ΠΕΙΡΑΙΑΣ Α (ΚΥΚΛΙΚΗ)",  // RouteCode: LineDescr
    //         "2646": "ΕΥΓΕΝΕΙΑ-ΧΑΡΑΥΓΗ-ΠΕΙΡΑΙΑΣ Α (ΚΥΚΛΙΚΗ)"
    //     }, 
    //     "1197": {
    //         "2644": "ΕΥΓΕΝΕΙΑ-ΧΑΡΑΥΓΗ-ΠΕΙΡΑΙΑΣ Β (ΚΥΚΛΙΚΗ)",
    //         "2758": "ΕΥΓΕΝΕΙΑ-ΧΑΡΑΥΓΗ-ΠΕΙΡΑΙΑΣ Β (ΚΥΚΛΙΚΗ)"
    //     }
    // }

    // remove the common part of the line descriptions per line code 
    // trying to extract more route details, but usually seems that not exists
    Object.keys( linesDescr ).forEach( lineCode => {
        const lineDescr = linesDescr[ lineCode ];
        let descriptions = [];

        Object.keys( lineDescr ).forEach( routeCode => {
            const descr = lineDescr[ routeCode ];
            descriptions.push( descr );
        } );

        descriptions = descriptions.map( descr => descr.split( ' ' ) );
        const position = arrNotEqualAt( descriptions );

        Object.keys( lineDescr ).forEach( routeCode => {
            let descr = lineDescr[ routeCode ];
            descr = descr.split( ' ' );
            descr.splice( 0, position );
            descr = descr.join( ' ' );
            lineDescr[ routeCode ] = descr;
        } );
    } );

    data = data.map( row => ( {
        LineID: row.LineID,
        RouteCode: row.RouteCode,
        RouteDescr: row.RouteDescr,
        LineDescr: linesDescr[ row.LineCode ][ row.RouteCode ],
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