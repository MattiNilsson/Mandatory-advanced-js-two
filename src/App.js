import React from 'react';
import Main from "./components/Main";
import Add from "./components/Add";
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      home : "Add",
      page : <Main />,
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick(e){
    if(this.state.home === "Home"){
      this.setState({home : "Add"});
      this.setState({page : <Main />});;
      return;
    }else{
      this.setState({home : "Home"});
      this.setState({page : <Add />});;
      return;
    }
  }

  render(){
    return (
      <div className="App">
        {this.state.page}
        <button className="btn" onClick={this.onClick}>{this.state.home}</button>
      </div>
    );
  }
}

export default App;
