import toLower from 'lodash/toLower';
import include from 'lodash/includes';
import trim from 'lodash/trim';

const stringInclude = (word, query) => include(toLower(word), toLower(trim(query)));

export default stringInclude;
