import * as colors from './colors';

const container = {
    color: colors.sharp,
    backgroundColor: colors.smoother,
    flex: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
};

const list = {
    width: '100%',
};

const row = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 8,
};

const col1 = {
    view: {
        width: 34,
        height: 34,
        borderRadius: 50,
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
};

const col2 = {
    view: {
        justifyContent: 'center',
        flex: 0.9,
    },
    text: {
        padding: 0,
        fontSize: 13,
        color: colors.sharp,
    },
};

export { container, list, row, col1, col2 };