
import React, { Component } from 'react';
// Load Highcharts
import { withHighcharts ,HighchartsChart, Chart, Title, Subtitle, XAxis, YAxis, LineSeries, Legend, PieSeries, ColumnSeries, PolarSeries} from 'react-jsx-highcharts';
import Highcharts from 'highcharts';
import * as d3 from "d3";

// Load a module
require('highcharts/modules/funnel')(Highcharts);
const plotOptions = {
    series: {
      pointStart: 2010
    }
  };

class ChartTest extends Component{
    componentDidMount(){
        console.log(d3);
        var jsonCircles = [
        { "x_axis": 30, "y_axis": 30, "radius": 20, "color" : "green" },
        { "x_axis": 70, "y_axis": 70, "radius": 20, "color" : "purple"},
        { "x_axis": 110, "y_axis": 100, "radius": 20, "color" : "red"}];

        var svgContainer = d3.select("body").append("svg")
                                .attr("width", 200)
                                .attr("height", 200);

        var circles = svgContainer.selectAll("circle")
                            .data(jsonCircles)
                            .enter()
                            .append("circle");

        var circleAttributes = circles
                                .attr("cx", function (d) { return d.x_axis; })
                                .attr("cy", function (d) { return d.y_axis; })
                                .attr("r", function (d) { return d.radius; })
                                .style("fill", function(d) { return d.color; });
    }
    render () {
        return (
        <div>
            <div id="chart">
                <circle cx="25" cy="25" r="25" fill="purple" />
            </div>
        
       
          </div>
        );
      }
}














export default withHighcharts(ChartTest, Highcharts);
{/* <HighchartsChart>
            <Chart />
       
            <Title>Solar Employment Growth by Sector, 2010-2016</Title>
       
            <Subtitle>Source: thesolarfoundation.com</Subtitle>
       
            <Legend layout="vertical" align="right" verticalAlign="middle" />
       
            <XAxis>
              <XAxis.Title>Time</XAxis.Title>
            </XAxis>
       
            <YAxis id="number">
              <YAxis.Title>Number of employees</YAxis.Title>
              <PieSeries id="installation" name="Installation" data={[{name:"JavaScript", y:68}, {name:"PHP", y:68},{name:"node.js", y:68},]} />
           
            </YAxis>
            
        </HighchartsChart>
        <HighchartsChart plotOptions={plotOptions}>
            <Chart />

            <Title>Solar Employment Growth by Sector, 2010-2016</Title>

            <Subtitle>Source: thesolarfoundation.com</Subtitle>

            <Legend layout="vertical" align="right" verticalAlign="middle" />

            <XAxis>
                <XAxis.Title>Time</XAxis.Title>
            </XAxis>

            <YAxis id="number">
                <YAxis.Title>Number of employees</YAxis.Title>
                <LineSeries id="installation" name="Installation" data={[43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]} />
                <LineSeries id="manufacturing" name="Manufacturing" data={[24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]} />
                <LineSeries id="sales-distribution" name="Sales & Distribution" data={[11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]} />
                <LineSeries id="project-development" name="Project Development" data={[null, null, 7988, 12169, 15112, 22452, 34400, 34227]} />
                <LineSeries id="other" name="Other" data={[12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]} />
            </YAxis>
        </HighchartsChart>
        
        <HighchartsChart>
        <Chart />

        <Title>Combination chart</Title>

        <Legend />

        <XAxis id="x" categories={['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']} />

        <YAxis id="number">
            <ColumnSeries id="jane" name="Jane" data={[3, 2, 1, 3, 4]} />
        </YAxis>
        </HighchartsChart> */}