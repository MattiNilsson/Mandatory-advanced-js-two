import React from 'react';
import axios from "axios";

import {Helmet} from "react-helmet";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class Add extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title : "title",
      description : "desciption",
      director : "director",
      rating : " rating",

      titleValue : "",
      descValue : "",
      dirValue : "",
      ratingValue : "",

      redirect : false,
      error : "",
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeHandeler = this.onChangeHandeler.bind(this);
  }

  onSubmit(e){
    e.preventDefault();
    console.log(
      this.state.titleValue,
      this.state.descValue,
      this.state.dirValue,
      this.state.ratingValue,
    );

    axios.post("http://3.120.96.16:3001/movies" ,
    {
      title : this.state.titleValue,
      description : this.state.descValue,
      director : this.state.dirValue,
      rating : this.state.ratingValue,
    })
    .then((response) =>{
      console.log(response);
      this.setState({redirect : true});
    })
    .catch((error) =>{
      this.setState({error : error.response.data[0].message})
      console.log(error.response)
//      alert(error.response.data[0].message);
    })

    this.setState({
      titleValue : "",
      descValue : "",
      dirValue : "",
      ratingValue : "",
    })
  }

  onChangeHandeler(e){
    const value = e.target.value;
    this.setState({
      [e.target.name]: value,
    });
    console.log(e.target.name + " : " + value);
  }

  render(){
    if(this.state.redirect){
      return (<Redirect to="/"></Redirect>)
    }

    return (
      <div className="overall">
        <h1>Add A New Movie</h1>
        <Helmet>
          <title>Matti - Add</title>
        </Helmet>
        <p className="error" style={{color : "red"}}>{this.state.error}</p>
        <form onSubmit={this.onSubmit}>
          Title
          <input 
            required
            name="titleValue" 
            value={this.state.titleValue} 
            onChange={this.onChangeHandeler} 
            placeholder="title"
          />
          Description
          <textarea
            required
            name="descValue" 
            value={this.state.descValue} 
            onChange={this.onChangeHandeler} 
            placeholder="description"
          />
          Director
          <input 
            required
            name="dirValue" 
            value={this.state.dirValue} 
            onChange={this.onChangeHandeler} 
            placeholder="director"
          />
          Rating
          <input 
            required
            type="number"
            step="0.1"
            name="ratingValue" 
            value={this.state.ratingValue} 
            onChange={this.onChangeHandeler} 
            placeholder="rating"
          />
          <button className="btn" type="submit">Add Movie</button>
        </form>
      </div>
    );
  }
}
export default Add;
