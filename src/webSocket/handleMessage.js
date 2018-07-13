import parsePath from 'utils/parsePath';
import { toastr } from 'react-redux-toastr';
import messages from 'modules/MakeTest/utils/messages';

const GET_TEST_TO_COMPLETED = 'GET_TEST_TO_COMPLETED';

export default function handleMessage(store, history, { type, data }) {
  switch (type) {
    case GET_TEST_TO_COMPLETED: {
      toastr.success(`Użytkownik ${data.users[0].details.firstName} ${data.users[0].details.surname} otworzył twój test: ${data.test.name}`);
    }
  }
}
