import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { lineGroupStyles as styles } from './styles';
import { CacheContext } from '../commons/CacheContext';
import useRequest from '../core/useRequest';
import { URI } from '../commons/constants';
import { WorkingIndicator, ErrorMessage } from '../commons/Messages';
import LineGroup from './LineGroup';

//const styles = lineGroupStyles;

const parseGroups = data => {
    const groups = {};

    for ( const row of data ) {
        const group = row.LineID.substr( 0, 1 );
        groups[ group ] = true;
    }

    return Object.keys( groups );
}

const LineGroups = () => {

    const { cache } = useContext( CacheContext );
    const { lines } = cache;

    const { status } = useRequest( {

        uri: URI.LINES,

        normalize: data => {
            lines.groups = parseGroups( data );
            return data.map( row => ( {
                LineCode: row.LineCode,
                LineID: row.LineID,
                LineDescr: row.LineDescr,
                routes: {},
            } ) );
        },

        store: lines,
    } );
    
    return (
        status.isRequesting ?
            <WorkingIndicator />

        : status.hasData ?
            <ScrollView style={ styles.list }>
                { lines.groups.map( ( group, i ) => (
                    <LineGroup 
                        key={ i }
                        lines={ lines }
                        group={ group }
                    />
                ) ) }
            </ScrollView>

        : status.hasError ?
            <ErrorMessage>{ lines.error }</ErrorMessage>

        : null
    );
}

export default LineGroups;
