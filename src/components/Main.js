import React from 'react';
import axios from "axios";
class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      movies : [],
    }
    this.onClick = this.onClick.bind(this);
    this.myGet = this.myGet.bind(this);
  }

  myGet(){
    (axios.get("http://3.120.96.16:3001/movies")
      .then((response) =>{
        console.log(response);
        this.setState({movies : response.data});
      })
      .catch(console.log("error"))
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
    )
  }

  render(){
    return (
      <div className="overall">
        <h1>hello</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Director</th>
              <th>Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.director}</td>
                  <td>{item.rating} / 5</td>
                  <td><button onClick={this.onClick} id={item.id}>Delete</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
