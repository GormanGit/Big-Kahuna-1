// npm install react-shapes --save
// https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2
import React, {Component} from 'react';
// import {Rectangle} from 'react-shapes';
import './App.css';
import avatar from './daftCat.png';
import matchedAvatar from './default.png';
class App extends Component {
  constructor() {
    super();
    this.state = {
      currentTurn: 1,
      profiles: [{
          shown: "",
          url: "",

      }],

    };
    this.baseState = []
    this.handleOnClick = this.handleOnClick.bind(this)
  }
  componentDidMount() {
    fetch('https://randomuser.me/api/?results=15')
    .then((response) => response.json())
    .then((responseJson) => responseJson.results)
    .then(newArr => newArr.concat(newArr))
    .then(doubledArr => doubledArr.sort(() => Math.random() * 2 - 1))
    .then(results => {
      return results.map((profile) => {
        return ({
          url: profile.picture.large,
          shown: avatar,
        })
      })
    })
    .then(doubledArr  => {
      this.setState({ profiles: doubledArr})
      this.baseState = doubledArr
    })
  }

  handleOnClick = (data, index) => {
    if(this.state.currentTurn === 1){

      const copy = [...this.state.profiles];
      copy[index].shown = data.url;
      this.setState({ profiles: copy })
      this.setState({ currentTurn: 2 })
      //why does baseState change???
      console.log(this.state.profiles[index].shown)

    }
    if(this.state.currentTurn === 2 && this.state.profiles[index].shown === avatar){
      //shownArrs is mapping through the profiles and making an array of just
      //the shown values
      const shownArrs = this.state.profiles.map((profile) => profile.shown)
      if(shownArrs.includes(data.url)){
        //if the new clicked is found in the shownArrs
        const matchedCopy = [...this.state.profiles];
        matchedCopy[index].shown = matchedAvatar;
        // map through the profiles and find something that is showing
        // a picture
        this.state.profiles.map((profile) => {
          if(profile.shown !== avatar){
            return profile.shown = matchedAvatar
          }
        })
        this.setState({ profiles: matchedCopy })
        //updating the profiles state to store the new matches
        alert("match")
      } else {
        const copy = [...this.state.profiles];
        copy[index].shown = data.url;
        this.setState({ profiles: copy })
        this.state.profiles.map((currentProfile) => {
          if(currentProfile.shown !== avatar){
            setTimeout(function(){
              return currentProfile.shown = avatar}, 100)
          }
        })
        this.setState({currentTurn: 1})
        this.renderAlert("Not a Match!");
      }
    }
    }

  renderAlert(display) {
    return(

      <div>
        <h1> {display}</h1>
      </div>
    )
  }

  renderprofiles() {
    const {profiles} = this.state;

      return (
        profiles.map((obj, key) => {
          return (
            <div key={key}>
              <img alt={avatar} src={profiles[key].shown} onClick={() =>
                this.handleOnClick(obj, key)}/>{obj.url}
             </div>
          )
        })
      )
  }

  render() {
    return (
      <div className="ui container">
        <div className="body">
          {this.renderAlert()}
          {this.renderprofiles()}
        </div>
      </div>
    )
  }
}

export default App;
