import React from 'react';
import axios from "axios";

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
    })
    .catch(console.log("error"))

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
    return (
      <div className="overall">
        <h1>add</h1>
        <form onSubmit={this.onSubmit}>
          <input 
            name="titleValue" 
            value={this.state.titleValue} 
            onChange={this.onChangeHandeler} 
            placeholder="title"
          />
          <input 
            name="descValue" 
            value={this.state.descValue} 
            onChange={this.onChangeHandeler} 
            placeholder="description"
          />
          <input 
            name="dirValue" 
            value={this.state.dirValue} 
            onChange={this.onChangeHandeler} 
            placeholder="director"
          />
          <input 
            type="number"
            step="0.1"
            name="ratingValue" 
            value={this.state.ratingValue} 
            onChange={this.onChangeHandeler} 
            placeholder="rating"
          />
          <button type="submit">Add Movie</button>
        </form>
      </div>
    );
  }
}
export default Add;
