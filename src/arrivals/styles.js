import { StyleSheet } from 'react-native';
import patterns from '../commons/stylePatterns';

const styles = StyleSheet.create( {

    main: {
        ...patterns.main,
    },

    list: {
        ...patterns.list,
    },

    navPanel: {
        ...patterns.navPanel,
    },
    navItem: {
        ...patterns.navItem,
    },
    navItemIcon: {
        ...patterns.navItemIcon,
    },
    navItemText: {
        ...patterns.navItemText,
    },
    navSeparator: {
        ...patterns.navSeparator,
    },

    row: {
        ...patterns.row,
        borderTopWidth: 1,
        borderTopColor: 'skyblue',
    },
    rowIcon: {
        ...patterns.rowIcon,
    },
    rowIconText: {
        ...patterns.rowIconText,
        fontSize: 16,
    },
    rowDescr: {
        ...patterns.rowDescr,
    },
    rowDescrText: {
        ...patterns.rowDescrText,
    },

} );

export default styles;