import React, { Component } from 'react';

class Joke extends Component {
    constructor(props) {
        super(props);
        this.state = { joke: "" };
    }

    componentDidMount() {
        if (!navigator.onLine) {
            if (localStorage.getItem('joke') === null)
                this.setState({ joke: "loading..." })
            else
                this.setState({ joke: localStorage.getItem('joke') });
        }
      
        fetch("https://api.chucknorris.io/jokes/random")
          .then(res => {
              return res.json();
          }).then(res => {
              this.setState({ joke: res.value });
              localStorage.setItem('joke', res.value);
          });
    }

    render() {
        return (
            <div>
                {this.state.joke}
            </div>
        );
    }
}

export default Joke;