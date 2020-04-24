import React, { Component } from 'react';

class Characters extends Component {
    constructor(props) {
        super(props);
        this.state = { characters: [] };
    }

    componentDidMount(){
        //http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150 (the hash value is the md5 digest of 1abcd1234)
        fetch('https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=862acd0466e815a90d5cec24cb5fa4bf&hash=30dc7ee6f8fe336d503cee23dfe400a4').then(res=>{
            return res.json();
        }).then(res=>{
            this.setState({ characters : res.data.results},()=>{
                localStorage.setItem('characters', res.data.results);
            });
        })
    }
    
    render() {
        return (
            <div>
                <ul>
                    {console.log(this.state.characters)}
                    {
                    this.state.characters.map((value, index)=>
                        <h1 key={value.id}>{value.name}</h1>
                        <li key={value.id}>{value.description}</li>
                    )
                    }
                    
                </ul>
            </div>
        );
    }
}

export default Characters