import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import img from './images/no_image.jpg'
class BookList extends Component {


  render() {
    const { books } = this.props;

    return (
      <div className="container">
        <div className="row">
          {books.map((book) => (
            <div key={book.key} className="col-md-3 mb-3">
              <div className="card">
                {book.cover_i ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    className="card-img-top"
                    alt={book.title}
                  />
                ) : (
                  <img
                 src={img}
                    className="card-img-top"
                    alt="Unknown"
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">{book.author_name}</p>
                  <DropdownButton
                    variant="success"
                    title={<i className="fas fa-plus"></i>}
                  >
                    <Dropdown.Item
                      onClick={() =>
                        this.props.addToSection(book, 'currentlyReading')
                      }
                    >
                      Currently Reading
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => this.props.addToSection(book, 'wantToRead')}
                    >
                      Want to Read
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => this.props.addToSection(book, 'read')}
                    >
                      Read
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default BookList;
