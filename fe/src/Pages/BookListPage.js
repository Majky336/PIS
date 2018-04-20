import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
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
import { parseDate } from '../lib/Parsers';
import { getUser } from '../components/User/reducer';
import { fetchBookList } from '../components/BookList/actions';
import { getBookList, isBookListFetching, getBookListError } from '../components/BookList/reducer';
import './BookListPage.css';

const styles = {
  floatingLabelStyle: {
    color: colors.black
  },
  underlineStyle: {
    borderColor: colors.contrast,
  }
};

class BookListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      selected: [],
      sortIndex: null,
    };
  }

  componentWillMount() {
    const { history, user } = this.props;
    const { rola } = user;

    if (rola === 1) {
      history.replace('/errors');
      return null;
    }
  }

  componentDidMount = () => {
    const { fetchBookList } = this.props;

    fetchBookList();
  }

  handleSearch = event => {
    const { target } = event;
    const { value } = target;

    this.setState({ searchTerm: value });
  }

  handleSort = (event, index, value) => this.setState({ sortIndex: value });

  handleRowSelection = selectedRow => {
    const { bookList, history } = this.props;

    this.setState({
      selected: selectedRow,
    }, () => {
      const index = selectedRow[0];
      history.push({
        pathname: `/books/${bookList[index].CopyId}`,
        state: { detail: bookList[index]},
      });
    });
  }

  isSelected = index => {
    const { selected } = this.state;

    return selected.indexOf(index) !== -1;
  }

  sort = (a, b) => {
    const { sortIndex } = this.state;
    const properties = ['BookName', 'Author', 'Genre'];
    const index = sortIndex - 1;

    if (a[properties[index]] < b[properties[index]]) {
      return -1;
    }
    if (a[properties[index]] > b[properties[index]]) {
      return 1;
    }
    return 0;
  }

  renderTableRow = () => {
    const { bookList } = this.props;
    const filteredList = this.getFilteredBookList();

    if (bookList && bookList.length) {
      filteredList.sort(this.sort);

      return filteredList.map((book, index) => {
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

  getFilteredBookList() {
    const { bookList } = this.props;
    const { searchTerm } = this.state;

    if (bookList) {
      return bookList.filter(book => {
        let includes = true;

        if (searchTerm) {
          includes = book.BookName.toLowerCase().includes(searchTerm.toLowerCase());
        }

        return includes;
      });
    }
  }

  render() {
    const { isBookListFetching } = this.props;
    const { searchTerm, sortIndex } = this.state;

    if (isBookListFetching) {
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
            <h1>Knihy na vypožičanie</h1>
            <div className='row' style={{ justifyContent: 'space-between'}}>
              <TextField
                id='search'
                style={{ marginBottom: 30, width: '59%' }}
                floatingLabelText="Vyhľadávanie"
                value={searchTerm}
                onChange={this.handleSearch}
                floatingLabelStyle={styles.floatingLabelStyle}
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineStyle}
              />
              <SelectField
                onChange={this.handleSort}
                style={{ marginLeft: 10 }}
                floatingLabelText="Zoradiť podľa"
                value={sortIndex}
              >
                <MenuItem value={null} primaryText='' />
                <MenuItem value={1} primaryText='Názvu' />
                <MenuItem value={2} primaryText='Autora' />
                <MenuItem value={3} primaryText='Žánru' />
              </SelectField>
            </div>
            <div className='row'>
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
            </div>
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
