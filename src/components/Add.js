import React from 'react';
import axios from "axios";

import {Helmet} from "react-helmet";

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
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeHandeler = this.onChangeHandeler.bind(this);
    this.goBack = this.goBack.bind(this);
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
      this.goBack();
    })
    .catch((error) =>{
      alert("SOMETHING WENT WRONG")
    })

    this.setState({
      titleValue : "",
      descValue : "",
      dirValue : "",
      ratingValue : "",
    })
  }

  goBack(){
    this.props.history.goBack();
  }

  onChangeHandeler(e){
    const value = e.target.value;
    this.setState({
      [e.target.name]: value,
    });
    console.log(e.target.name + " : " + value);
  }

  render(){
    return (
      <div className="overall">
        <h1>Add A New Movie</h1>
        <Helmet>
          <title>Matti - Add</title>
        </Helmet>
        <form onSubmit={this.onSubmit}>
          Title
          <input 
            name="titleValue" 
            value={this.state.titleValue} 
            onChange={this.onChangeHandeler} 
            placeholder="title"
          />
          Description
          <textarea
            name="descValue" 
            value={this.state.descValue} 
            onChange={this.onChangeHandeler} 
            placeholder="description"
          />
          Director
          <input 
            name="dirValue" 
            value={this.state.dirValue} 
            onChange={this.onChangeHandeler} 
            placeholder="director"
          />
          Rating
          <input 
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
