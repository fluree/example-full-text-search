import React, { Component } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { flureeFetch } from './flureeFetch';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

class Main extends Component {
  state = {
    recipes: [],
    page: 1,
    searchTerm: ""
  }

  searchRecipes = (e) => {
    if(e) {    e.preventDefault(); }
    const { searchTerm, page } = this.state;
    const offset = (page - 1) * 10;

    let query = {
      "select": {"?recipe": [  {"*": {"_compact": true} } ] },
      "where": [
        ["?recipe", "fullText:recipe", searchTerm]
      ],
      "limit": 10,
      "offset": offset
    }

    flureeFetch({
      "ip": "http://localhost:8080", 
      "network": "fluree", 
      "db": "recipe",
      "endpoint": "query",
      "body": query })
      .then(res => res.json)    
      .then(res => this.setState({ recipes: res }));
  }

  nextPage = () => {
    const { page } = this.state;
    this.setState({ page: page + 1}, this.searchRecipes);
  }

  previousPage = () => {
    const { page } = this.state;
    this.setState({ page: page - 1}, this.searchRecipes);
  }

  render(){
    const columns = [
    { Header: "Recipe", accessor: "title" },
    { Header: "Instructions", accessor: "instructions", style: { 'white-space': 'unset'}},
    { Header: "Ingredients", accessor: "ingredients" }]

    return(
      <div>
        <Row>
          <Col xs={12}>
            <h2>Fluree Recipe Demo</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-left" style={{margin: "10px"}}> 
            <Form inline onSubmit={e => this.searchRecipes(e)}>
              <Form.Group controlId="searchTerm">
                <Form.Label>Search:&nbsp;&nbsp;&nbsp;</Form.Label>
                <Form.Control type="text" placeholder="" value={this.state.searchTerm} 
                onChange={e => this.setState({ searchTerm: e.target.value})}/>
              </Form.Group>
              <div style={{marginLeft: "20px"}}>
                <Button type="submit">Search</Button>
              </div>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
              <ol>
              { this.state.recipes && 
              <ReactTable 
              previousText={""}
              nextText={""}
              data={this.state.recipes} 
              columns={columns} 
              defaultPageSize={10}
              showPagination={false}
              style={{overflow:'wrap'}}/>}
              </ol>
          </Col>
          <Col xs={1}>
            <span style={{marginLeft: "40px"}}>
              <Button disabled={this.state.page === 1} onClick={this.previousPage}>Previous</Button>
            </span>          
          </Col>
          <Col xs={10}/>
          <Col xs={1}>
          <span style={{marginRight: "10px"}}>
              <Button onClick={this.nextPage}>Next</Button>
            </span>
          </Col>
        </Row>
      </div>
    )
  }
}


function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
