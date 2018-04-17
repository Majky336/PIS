import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import format from 'date-fns/format';
import { connect } from 'react-redux';

import Loader from '../components/Loader';
import { colors } from '../StyleConstants/Styles';
import { parseDate } from '../lib/Parsers';
import { getUser } from '../components/User/reducer';
import { fetchBookList } from '../components/BookList/actions';
import { getBookList, isBookListFetching, getBookListError } from '../components/BookList/reducer';
import './BookListPage.css';

class BookListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
    };
  }

  componentDidMount = () => {
    const { fetchBookList } = this.props;

    fetchBookList();
  }

  handleRowSelection = selectedRow => {
    const { bookList, history } = this.props;

    this.setState({
      selected: selectedRow,
    }, () => {
      const index = selectedRow[0];
      history.push({
        pathname: `/bookDetail/${bookList[index].CopyId}`,
        state: { detail: bookList[index]},
      });
    });
  }

  isSelected = index => {
    const { selected } = this.state;

    return selected.indexOf(index) !== -1;
  }

  renderTableRow = () => {
    const { bookList } = this.props;

    if (bookList && bookList.length) {
      return bookList.map((book, index) => {
        const { Author, BookName, Genre, YearOfPublication } = book;
        const isOdd = index % 2 === 1;
        const style = {
          backgroundColor: isOdd ? colors.contrast : colors.white,
        }

        const YearOfPublicationTimestamp = parseDate(YearOfPublication);

        return (
          <TableRow key={index} style={style} selected={this.isSelected(index)}>
            <TableRowColumn>{BookName}</TableRowColumn>
            <TableRowColumn>{Author}</TableRowColumn>
            <TableRowColumn>{Genre}</TableRowColumn>
            <TableRowColumn>{format(YearOfPublicationTimestamp, 'DD-MM-YYYY')}</TableRowColumn>
          </TableRow>
        );
      });
    }
  }

  render() {
    const { isBookListFetching } = this.props;
    if (isBookListFetching) {
      return (
        <div className='container-fluid wrapper'>
          <Loader />
        </div>
      )
    }

    return (
      <div>
        <div className='container-fluid'>
          <div className='col-sm-10 offset-sm-1 title'>
            <h1>Knihy na vypožičanie</h1>
            <Table selectable={true} onRowSelection={this.handleRowSelection}>
              <TableHeader displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>Kniha</TableHeaderColumn>
                  <TableHeaderColumn>Autor</TableHeaderColumn>
                  <TableHeaderColumn>Žáner</TableHeaderColumn>
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
            <RaisedButton label='Show me profile' onClick={() => {this.props.history.push('/profil')}}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { bookList, user } = state;

  return {
    user: getUser(user),
    bookList: getBookList(bookList),
    isBookListFetching: isBookListFetching(bookList),
    bookListError: getBookListError(bookList),
  };
}

const mapDispatchToProps = {
  fetchBookList,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookListPage);
