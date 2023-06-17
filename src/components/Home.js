import React, { Component, useEffect } from 'react';
import Search from './Search';
import BookList from './BookList';
import Header from './Header';
import img from './images/no_image.jpg'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_by_title: '',
      books: [],
      sections: {
        currentlyReading: [],
        wantToRead: [],
        read: []
      },
      Books_not_found : false,
      Search_button_clicked : false
    };
  }

  //when user clicks on the (+) button display the search bar.
  open_search_bar = () => {

    this.setState({Search_button_clicked:true})

  }

  //update state of search_by_title to the user's search query. then call on fetchbooks fn.
  handleSearch = (query) => {
    this.setState({ search_by_title: query }, () => {
      this.fetchBooks();
    });
  };


  //using the search_by_title. 
  fetchBooks = async () => {
   
    const { search_by_title } = this.state;
    //check that the value != null or undefined
    if (search_by_title) {
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${search_by_title}`
        );
        const data = await response.json();
        //data.docs has the books. filter the books to find books that start with same string as (search-query)
        const filteredBooks = data.docs.filter((book) =>
      
        book.title.toLowerCase().startsWith(search_by_title.toLowerCase())
        );

        //if nothing matches the search... update state.
        if(filteredBooks.length===0){

          this.setState({Books_not_found:true})
        }

       
        this.setState({ books: filteredBooks });
      } catch (error) {
        console.error('Error fetching books:', error);
        this.setState({ books: [] });
      }
    } else {
      this.setState({ books: [] });
    }
  };


  addToSection = (book, target_section) => {
    const { sections } = this.state;
    const updatedSections = { ...sections };

// Check if the book already exists in the target section
const bookExists = updatedSections[target_section].some((existingBook) => existingBook.key === book.key);

//if book doesn't exist in the target section
if (!bookExists) {
 debugger
 //loop on sections
  for (const key in updatedSections) {

    //break if sections != target_section
    if (key !== target_section) {
    
      debugger
      const index = updatedSections[key].findIndex((existingBook) => existingBook.key === book.key);
      if (index !== -1) {
        //remove the book from it's previous section
        updatedSections[key].splice(index, 1);
        break;
      }
    }
  }

  updatedSections[target_section].push(book);
this.setState({ sections: updatedSections });
}

if(bookExists){

  console.log("book already exists in this section")
}


  };

  Remove_from_Library = (book) => {
    const { sections } = this.state;
    const updatedSections = { ...sections };

    for (const key in updatedSections) {
      const sectionBooks = updatedSections[key];
      const index = sectionBooks.findIndex((existingBook) => existingBook.key === book.key);
      if (index !== -1) {
        sectionBooks.splice(index, 1);
      }
    }

    this.setState({ sections: updatedSections });
  }
  
  //render sections
  renderSectionBooks = (section) => {
    const { books } = this.state;
    const sectionBooks = this.state.sections[section];
    

    return (
      //display book according to it's selected section
      <div>
        <h2 className='section_name'>{section}</h2>
        <div className="row row_section">
          {sectionBooks.map((book) => (
            <div className="col-md-3" key={book.key}>
              <div className="card">
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt="Book cover"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">{book.author_name}</p>
                  <DropdownButton
                    variant="success"
                    title={<i className="fas fa-plus"></i>}
                  >
                    <Dropdown.Item
                      onClick={() =>
                        this.addToSection(book, 'currentlyReading')
                      }
                    >
                      Currently Reading
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => this.addToSection(book, 'wantToRead')}
                    >
                      Want to Read
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => this.addToSection(book, 'read')}
                    >
                      Read
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => this.Remove_from_Library(book)}
                    >
                      None
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  render() {
    const {Search_button_clicked} = this.state;
    //if filtered books are empty... display that no books were found for the user.
    if(this.state.Books_not_found){
    if (this.state.books.length === 0) {
      console.log("No book was found");
      return (
        <div>
         <h1>No Books were found that matches "{this.state.search_by_title}"</h1>
        </div>
      );
    }
  }

    return (
      <div>
        <Header/>
        {Search_button_clicked && (
        <Search onSearch={this.handleSearch} />
        )}
        <BookList books={this.state.books} addToSection={this.addToSection} />
        {this.renderSectionBooks('currentlyReading')}
        {this.renderSectionBooks('wantToRead')}
        {this.renderSectionBooks('read')}

        <div className='btn-search'> <button id='btn_open' onClick={this.open_search_bar}> + </button> </div>
      </div>
    );
  }
}

export default Home;
