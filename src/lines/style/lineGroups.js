import * as colors from '../../_commons/style/colors';
import * as screen from '../../_commons/style/screen';

const { container, list, col2 } = screen;

const row = {
    ...screen.row,
    borderTopWidth: 1,
    borderTopColor: colors.sharp,
};

const col1 = {
    ...screen.col1,
    text: {
        ...screen.col1.text,
        fontSize: 28,
        color: colors.sharp,
    }
};

export { container, list, row, col1, col2 };
