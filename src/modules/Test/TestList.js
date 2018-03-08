import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchQuestions} from './actions';


import Card from 'libs/ui/Card';
import STRINGS from './strings';
import Table from "libs/ui/Table/Table";
import Button from "../../libs/ui/Button/Button";

class TestList extends Component {
  componentWillMount() {
    this.props.fetchQuestions();
  }

  getDataTable() {
    const {questions} = this.props;
    const columns = [
      {
        id: 'index',
        content: 'Index'
      },
      {
        id: 'question',
        content: 'Question',
      },
      {
        id: 'description',
        content: 'Description',
      }
    ];

    const rows = questions.map(({question, description, id}, index) => {
      return {
        id,
        index: index + 1,
        question,
        description,
      }
    });

    return {
      columns,
      rows,
    }
  }


  render() {
    const {columns, rows} = this.getDataTable();
    return (
      <Card title={STRINGS.HEADER.QUESTIONS_LIST}>
        <Table
          columns={columns}
          rows={rows}
        />
        <Button onClick={() => this.props.history.push(`/test/add`)}>Add question</Button>
      </Card>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    questions: state.test.questions,
  }
};

const mapDispatchToProps = {
  fetchQuestions,
};

export default connect(mapStateToProps, mapDispatchToProps)(TestList)