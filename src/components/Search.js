import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };
  }
  
  //retrieve the search query from user's input.
  
  handleInputChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  //when user clicks on search button.. update state.. pass value to onSearch (callback fn.)
  //retrieve the value of state.
  handleSearchClick = () => {
    const { searchQuery } = this.state;
    this.props.onSearch(searchQuery);
  };

  render() {
    const { searchQuery } = this.state;

    return (
     
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearchClick}>Search</button>
      </div>
    );
  }
}

export default Search;