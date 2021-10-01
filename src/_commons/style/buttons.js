import * as colors from './colors';

const view = {
    borderWidth: 1,
    margin: 8,
    paddingTop: 4,
    paddingLeft: 32,
    paddingBottom: 4,
    paddingRight: 32,
};

const text = {
    fontWeight: '600',
};

const warning = {
    view: {
        ...view,
        borderColor: colors.warning,
    },
    text: {
        ...text,
        color: colors.warning,
    },
};

const error = {
    view: {
        ...view,
        borderColor: colors.error,
    },
    text: {
        ...text,
        color: colors.error,
    },
};

export { warning, error };