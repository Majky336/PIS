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
import { connect } from 'react-redux';

import Loader from '../components/Loader';
import { colors } from '../StyleConstants/Styles';
import { getUser } from '../components/User/reducer';
import { fetchBookList } from '../components/BookList/actions';
import { getBookList, isBookListFetching, getBookListError } from '../components/BookList/reducer';

const mockBooks = [
  {
    name: 'Haryy Potter a kameň mudrcov',
    autor: 'J.K. Rowling',
    ISBN: 'ISBN-103-598-21500-2',
    zaner: 'Fantasy',
    popis: 'Harry hľadá šuter a čávo s 2 ksichtami nechce aby ho našiel.',
    rokVydania: '2005',
  },
  {
    name: 'Hobbit',
    autor: 'Tolkien',
    ISBN: 'ISBN-103-598-21501-0',
    zaner: 'Fantasy',
    popis: 'Liliput ide hľadať nejakú bigass horu.',
    rokVydania: '2011',
  },
  {
    name: 'Super Kuchyňa',
    autor: 'Jamie Oliver',
    ISBN: 'ISBN-103-598-21504-5',
    zaner: 'Hobby',
    popis: 'Brit so strapatými vlasmi ťa chce naučiť ako spraviť niečo iné ako špagety alebo praženicu.',
    rokVydania: '2014',
  },
];

class BookListPage extends Component {
  componentDidMount = () => {
    const { fetchBookList } = this.props;

    fetchBookList();
  }

  renderTableRow = () => {
    return mockBooks.map((book, index) => {
      const { name, autor, ISBN, zaner, popis, rokVydania } = book;
      const isOdd = index % 2 === 1;

      const style = {
        backgroundColor: isOdd ? colors.contrast : colors.white,
      }

      return (
        <TableRow style={style} key={name}>
          <TableRowColumn>{name}</TableRowColumn>
          <TableRowColumn>{autor}</TableRowColumn>
          <TableRowColumn>{zaner}</TableRowColumn>
          <TableRowColumn>{ISBN}</TableRowColumn>
          <TableRowColumn>{rokVydania}</TableRowColumn>
          <TableRowColumn>{popis}</TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
    const { isBookListFetching } = this.props;

    if (isBookListFetching) {
      return <Loader />;
    }

    return (
      <div>
        <div className='container-fluid'>
          <div className='col-sm-10 offset-sm-1 title'>
            <h1>Knihy na vypožičanie</h1>
            <Table>
              <TableHeader displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>Meno</TableHeaderColumn>
                  <TableHeaderColumn>Autor</TableHeaderColumn>
                  <TableHeaderColumn>Žáner</TableHeaderColumn>
                  <TableHeaderColumn>ISBN</TableHeaderColumn>
                  <TableHeaderColumn>Rok vydania</TableHeaderColumn>
                  <TableHeaderColumn>Popis</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
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
