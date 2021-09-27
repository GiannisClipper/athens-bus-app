import * as colors from './colors';
import * as basics from './basics';

const { icon } = basics;

const drawer = {
    drawer: {
        backgroundColor: colors.smoother,
        width: '50%',
    },

    header: {
        view: {
            backgroundColor: colors.sharp,
        },

        text: {
            color: colors.smooth,
            fontWeight: '600',
        }    
    },

    item: {
        view: {
        },

        icon: {
            color: colors.sharp,
            size: 28,
        },

        text: {
            marginLeft: -16,
            color: colors.sharp,
            fontWeight: '600',
            fontSize: 16,
        },
    },
};

const stack = {
    headerStyle: {
        backgroundColor: colors.smoother,
    },

    headerTintColor: colors.sharp,

    headerTitleStyle: {
        color: colors.sharp,
        fontSize: 13,
    },
}

const tab = {
    item: {
        view: {
            inactiveBackgroundColor: colors.smooth,
            activeBackgroundColor: colors.smoother,
            // flexDirection: 'row',
            // justifyContent: 'space-around',
        },

        text: {
            flex: 1,
            color: colors.sharp,
            fontWeight: '600',
            fontSize: 18,
        },
    },
};

export { drawer, stack, tab, icon };
