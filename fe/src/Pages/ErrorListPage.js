import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import format from 'date-fns/format';
import { connect } from 'react-redux';

import Loader from '../components/Loader';
import { colors } from '../StyleConstants/Styles';
import { getUser } from '../components/User/reducer';
import { getErrorList, isErrorListFetching, getErrorListError } from '../components/ErrorList/reducer';
import { fetchErrorList } from '../components/ErrorList/actions';
import { parseDate } from '../lib/Parsers';

class ErrorListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
    }
  }

  componentWillMount() {
    const { history, user } = this.props;
    const { rola } = user;

    if(rola === 0) {
      history.replace('/books')
      return null;
    }
  }

  componentDidMount() {
    const { fetchErrorList } = this.props;

    fetchErrorList();
  }

  handleRowSelection = selectedRow => {
    const { errorList, history } = this.props;

    this.setState({
      selected: selectedRow,
    }, () => {
      const index = selectedRow[0];
      history.push({
        pathname: `/errors/${errorList[index].CopyId}`,
        state: { errorsList: errorList[index]},
      });
    });
  }

  isSelected = index => {
    const { selected } = this.state;

    return selected.indexOf(index) !== -1;
  }

  renderTableRow = () => {
    const { errorList } = this.props;

    if (errorList && errorList.length) {
      return errorList.map((book, index) => {
        const { Name, Isbn, YearOfPublication } = book;
        const isOdd = index % 2 === 1;
        const style = {
          backgroundColor: isOdd ? colors.contrast : colors.white,
        }

        const YearOfPublicationTimestamp = parseDate(YearOfPublication);

        return (
          <TableRow key={index} style={style} selected={this.isSelected(index)}>
            <TableRowColumn>{Name}</TableRowColumn>
            <TableRowColumn>{Isbn}</TableRowColumn>
            <TableRowColumn>{format(YearOfPublicationTimestamp, 'DD-MM-YYYY')}</TableRowColumn>
          </TableRow>
        );
      });
    }
  }

  render() {
    const { isErrorListFetching } = this.props;

    if (isErrorListFetching) {
      return (
        <div className='container-fluid wrapper'>
          <Loader />
        </div>
      )
    }

    return (
      <div>
        <div className='container-fluid' style={{fontFamily: 'Roboto'}}>
          <div className='col-sm-10 offset-sm-1 title'>
            <h1>Nahlásené chyby</h1>
            <Table selectable={true} onRowSelection={this.handleRowSelection}>
              <TableHeader displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>Výtlačok</TableHeaderColumn>
                  <TableHeaderColumn>ISBN</TableHeaderColumn>
                  <TableHeaderColumn>Rok vydania</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                deselectOnClickaway={true}
              >
                {this.renderTableRow()}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { errorList, user } = state;

  return{
    user: getUser(user),
    errorList: getErrorList(errorList),
    isErrorListFetching: isErrorListFetching(errorList),
    errorListError: getErrorListError(errorList),
  };
}

const mapDispatchToProps = {
  fetchErrorList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorListPage);
