const patterns = {

    nav: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'powderblue',
    },
    navItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'steelblue',
    },
    navItemIcon: {
        fontSize: 16,
        fontWeight: '600',
        color: 'skyblue',
        padding: 2,
    },
    navItemText: {
        fontSize: 14,
        color: 'skyblue',
        padding: 2,
    },
    navSeparator: {
        // width: 1,
        // backgroundColor: 'powderblue',
        // borderTopWidth: 4,
        // borderBottomWidth: 4,
        // borderColor: 'steelblue',
    },

    main: {
        color: 'steelblue',
        backgroundColor: 'powderblue',
        flex: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },

    list: {
        width: '100%',
    },

    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 8,
    },
    rowIcon: {
        width: 34,
        height: 34,
        borderRadius: 50,
        justifyContent: 'center',
    },
    rowIconText: {
        fontSize: 13,
        textAlign: 'center',
    },
    rowDescr: {
        justifyContent: 'center',
        flex: 0.9,
    },
    rowDescrText: {
        padding: 0,
        fontSize: 13,
        color: 'steelblue',
    },

}

export default patterns;
