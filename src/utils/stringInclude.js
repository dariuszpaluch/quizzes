import toLower from 'lodash/toLower';
import include from 'lodash/includes';
import trim from 'lodash/trim';

const stringInclude = (word, query) => {
  const _query = toLower(trim(query));
  const _word = toLower(word);

  return include(_word, _query);
};

export default stringInclude;
