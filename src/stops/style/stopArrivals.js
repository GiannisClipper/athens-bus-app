import * as colors from '../../_commons/style/colors';
import * as screen from '../../_commons/style/screen';

const { container, list, row, col2 } = screen;

const col1 = {
    ...screen.col1,
    text: {
        ...screen.col1.text,
        fontSize: 16,
        color: colors.sharper,
    }
};

export { container, list, row, col1, col2 };
