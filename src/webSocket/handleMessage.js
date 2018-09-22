import parsePath from 'utils/parsePath';
import { toastr } from 'react-redux-toastr';
import messages from 'modules/MakeTest/utils/messages';
import { GET_TEST_DETAILS } from 'modules/Tests/utils/actionTypes';
import { getTest } from 'modules/Tests/utils/getters';

import { size, find } from 'lodash';

const GET_TEST_TO_COMPLETED = 'GET_TEST_TO_COMPLETED';
const UPDATE_TEST_DETAILS_DATA = 'UPDATE_TEST_DETAILS_DATA';

export default function handleMessage(store, history, { type, data }) {
  switch (type) {
    case GET_TEST_TO_COMPLETED: {
      toastr.success(
        `Użytkownik ${data.users[0].firstName} ${
          data.users[0].surname
          } otworzył twój test: ${data.test.name}`
      );

      break;
    }

    case UPDATE_TEST_DETAILS_DATA: {
      let newTest = data.test;
      const oldTest = getTest(store.getState(), data.test.id);

      if (size(newTest.userAnswers) !== size(oldTest.userAnswers)) {
        newTest.userAnswers = newTest.userAnswers.map(userAnswer => {
          if (!find(oldTest.userAnswers, { id: userAnswer.id })) {
            return {
              ...userAnswer,
              new: true,
            }
          }

          return userAnswer
        })
      }

      store.dispatch({
        type: `UPDATE_TEST_DETAILS_SUCCESS`,
        data: newTest,
      });
      break;
    }
  }
}
