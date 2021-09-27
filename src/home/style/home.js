import * as colors from '../../_commons/style/colors';
import * as screen from '../../_commons/style/screen';

const { container } = screen;

const box = {
    portrait: {
        borderWidth: 2,
        borderColor: colors.smooth,
        paddingVertical: 100,
        paddingHorizontal: 20,
    },
    landscape: {
        borderWidth: 2,
        borderColor: colors.smooth,
        paddingVertical: 20,
        paddingHorizontal: 100,
    }
};

const nameBox = {
    alignSelf: 'center',
};

const bigText = {
    color: colors.sharp,
    fontSize: 20,
};

const smallText = {
    color: colors.sharp,
    fontSize: 12,
    textAlign: 'center',
};

const verySmallText = {
    color: colors.sharp,
    fontSize: 9,
};

const separator = {
    borderTopWidth: 1,
    borderColor: colors.sharp,
    margin: 25,
};

export { container, box, nameBox, bigText, smallText, verySmallText, separator };
