import parsePath from 'utils/parsePath';
import { toastr } from 'react-redux-toastr';
import messages from 'modules/MakeTest/utils/messages';
import { GET_TEST_DETAILS } from 'modules/Tests/utils/actionTypes';

const GET_TEST_TO_COMPLETED = 'GET_TEST_TO_COMPLETED';
const UPDATE_TEST_DETAILS_DATA = 'UPDATE_TEST_DETAILS_DATA';

export default function handleMessage(store, history, { type, data }) {
  switch (type) {
    case GET_TEST_TO_COMPLETED: {
      toastr.success(
        `Użytkownik ${data.users[0].details.firstName} ${
          data.users[0].details.surname
        } otworzył twój test: ${data.test.name}`
      );

      break;
    }

    case UPDATE_TEST_DETAILS_DATA: {
      console.log('data',data);
      // store.dispatch({
      //   type: `${GET_TEST_DETAILS}_SUCCESS`,
      //   data
      // });
      break;
    }
  }
}
