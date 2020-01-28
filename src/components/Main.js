import React from 'react';
import axios from "axios";
import Details from "./Details";
import {Helmet} from "react-helmet";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      movies : [],
      search : "",
    }
    this.onClick = this.onClick.bind(this);
    this.myGet = this.myGet.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  myGet(){
    (axios.get("http://3.120.96.16:3001/movies")
      .then((response) =>{
        console.log(response);
        this.setState({movies : response.data});
      })
      .catch(() =>{
        alert("could not find data for movies")
      })
      )
  }

  componentDidMount(){
    this.myGet();
  }

  onClick(e){
    axios.delete("http://3.120.96.16:3001/movies/" + e.target.id)
    .then((response) =>{
      console.log(response);

      this.myGet();
    })
    .catch(
      console.log("already removed"),

      this.myGet()
    );
  }

  onChange(e){
    this.setState({search : e.target.value})
  }

  renderList(){
    if(this.state.search === ""){
      return this.state.movies.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.director}</td>
            <td>{item.rating} / 5</td>
            <td className="side">
              <Link to={"/Details/" + item.id} className="link">
                <button>Details</button>
              </Link>
            </td>
            <td className="side">
              <Link to={"/Edit/" + item.id} className="link">
                <button>Edit</button>
              </Link>
            </td>
            <td className="side">
              <button onClick={this.onClick} id={item.id}>Delete</button>
            </td>
          </tr>
        )
      })
    }else{
      const result = this.state.movies.filter((movie) => {
        return movie.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || 
        movie.director.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      });
      return result.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.director}</td>
            <td>{item.rating} / 5</td>
            <td className="side">
              <Link to={"/Details/" + item.id} className="link">
                <button>Details</button>
              </Link>
            </td>
            <td className="side">
              <Link to={"/Edit/" + item.id} className="link">
                <button>Edit</button>
              </Link>
            </td>
            <td className="side">
              <button onClick={this.onClick} id={item.id}>Delete</button>
            </td>
          </tr>
        )
      })
    }
    
  }
  
  render(){
    if (!this.state.movies) {
      return <p>Loading...</p>;
    }

    return (
      <div className="overall">
        <Helmet>
          <title>Matti - Home</title>
        </Helmet>
        <h1>Movies</h1>
        <input placeholder="search by title" onChange={this.onChange} value={this.state.search}/>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Director</th>
              <th>Rating</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.renderList()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
