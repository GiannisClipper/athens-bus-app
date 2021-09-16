import { StyleSheet } from 'react-native';
import patterns from '../_commons/stylePatterns';

const lineGroupStyles = StyleSheet.create( {

    main: {
        ...patterns.main,
    },

    list: {
        ...patterns.list,
    },

    row: {
        ...patterns.row,
        borderTopWidth: 1,
        borderTopColor: 'steelblue',
    },
    rowIcon: {
        ...patterns.rowIcon,
    },
    rowIconText: {
        ...patterns.rowIconText,
        fontSize: 28,
        color: 'steelblue',
    },
    rowDescr: {
        ...patterns.rowDescr,
    },
    rowDescrText: {
        ...patterns.rowDescrText,
    },

} );

const lineStyles = StyleSheet.create( {

    row: {
        ...patterns.row,
        borderTopWidth: 1,
        borderTopColor: 'skyblue',
    },
    rowIconBlue: {
        ...patterns.rowIcon,
        backgroundColor: 'blue',
        opacity: 0.75,
    },
    rowIconYellow: {
        ...patterns.rowIcon,
        backgroundColor: 'yellow',
        opacity: 0.75,
    },
    rowIconTextBlue: {
        ...patterns.rowIconText,
        color: 'powderblue',
    },
    rowIconTextYellow: {
        ...patterns.rowIconText,
        color: 'steelblue',
    },
    rowDescr: {
        ...patterns.rowDescr,
    },
    rowDescrText: {
        ...patterns.rowDescrText,
    },

} );

export { lineGroupStyles, lineStyles };