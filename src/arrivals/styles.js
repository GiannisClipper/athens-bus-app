import { StyleSheet } from 'react-native';
import patterns from '../_commons/stylePatterns';

const styles = StyleSheet.create( {
    nav: {
        ...patterns.nav,
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

    main: {
        ...patterns.main,
    },

    list: {
        ...patterns.list,
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