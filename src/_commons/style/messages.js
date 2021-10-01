import * as colors from './colors';

const text = {
    paddingLeft: 16,
    paddingRight: 16,
    fontWeight: '600',
};

const info = {
    ...text,
    color: colors.info,
};

const warning = {
    ...text,
    color: colors.warning,
};

const error = {
    ...text,
    color: colors.error,
};

const workingIndicator = {
    color: colors.warning,
    size: 'large',
};

const dialogue = {
    alignItems: 'center',
}

export { info, warning, error, workingIndicator, dialogue };