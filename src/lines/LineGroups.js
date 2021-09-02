import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { lineGroupStyles as styles } from './styles';
import { CacheContext } from '../_commons/CacheContext';
import useRequest from '../_abstract/useRequest';
import { URI } from '../_commons/constants';
import { WorkingIndicator, ErrorMessage } from '../_commons/Messages';
import LineSearch from './LineSearch';
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
                <LineSearch
                    key={ -1 }
                    lines={ lines }
                />

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
