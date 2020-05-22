import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { FormattedMessage } from 'react-intl';
import Visualization from './visualization.js';

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = { movies: [] };
    }



    componentDidMount() {
        fetch(this.props.url).then(res => {
            return res.json();
        }).then(res => {
            this.setState({ movies: res }, () => {
                localStorage.setItem('movies', res);
            });
        })
    }


    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th><FormattedMessage
                                id="app.hashtag"
                                description="hashtag"
                                defaultMessage="{hashtag}"
                                values={{
                                    hashtag: "#",
                                }}
                            /></th>
                            <th><FormattedMessage id="Name" /></th>
                            <th><FormattedMessage id="Directed by" /></th>
                            <th><FormattedMessage id="Country" /></th>
                            <th><FormattedMessage id="Budget" /></th>
                            <th><FormattedMessage id="Release" /></th>
                            <th><FormattedMessage id="Views" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map((item, index) => (
                            <tr key={index}>
                                <td >{item.id}</td>
                                <td >{item.name}</td>
                                <td >{item.directedBy}</td>
                                <td >{item.country}</td>
                                <td >{item.budget}</td>
                                <td >{item.releaseDate}</td>
                                <td >{item.views}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {console.log("this.state.movies from listadoPelis: ",this.state.movies)}
                <Visualization data={this.state.movies}/>
            </div>
        );
    }
}

export default Movies