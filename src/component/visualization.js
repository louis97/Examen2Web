import React, { Component } from 'react';
import * as d3 from "d3";

const url="https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json";

class Visualization extends Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
        console.log(this.state.data);
    }

    componentDidMount() {
        fetch(url).then(res => {
            return res.json();
        }).then(res => {
            this.setState({ data: res }, () => {
                localStorage.setItem('data', res);
                this.drawChart();
            });
        })
    }


    drawChart() {
       
        const canvas = d3.select("#canvas")
        const width = 700
        const height = 500
        const margin = {
            top: 10,
            left: 50,
            bottom: 40,
            right: 10
        }
        
        const iwidth = width - margin.left - margin.right
        const iheight = height - margin.top - margin.bottom

        const svg = canvas.append("svg")
        svg.attr("width", width);
        svg.attr("height", height);

        let g = svg
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)

        const y = d3.scaleLinear()
            .domain([0, 10000000])
            .range([iheight, 0])

        const x = d3.scaleBand()
            .domain(this.state.data.map(d => d.name))
            .range([0, iwidth])
            .padding(0.1)

        const bars = g.selectAll("rect").data(this.state.data)

        bars.enter()
            .append("rect")
            .attr("class", "bar")
            .style("fill", "orange")
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.views))
            .attr("height", d => iheight - y(d.views))
            .attr("width", x.bandwidth())

        g.append("g")
            .classed("x--axis", true)
            .call(d3.axisBottom(x))
            .attr("transform", `translate(0, ${iheight})`)

        g.append("g")
            .classed("y--axis", true)
            .call(d3.axisLeft(y))
    }

    render() {
        return (
            <div id="canvas"></div>
        );
    }

}

export default Visualization;