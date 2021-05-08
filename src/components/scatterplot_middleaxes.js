import React from "react"
import { scaleLinear, axisLeft, axisBottom, select, min } from "d3"
import { FaArrowsAltV, FaArrowsAltH } from 'react-icons/fa';

function sortNumber(a, b) {
  return a - b
}

export default class ScatterPlot extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const margin = { top: 20, right: 80, bottom: 60, left: 80 }
    const width = 800 - margin.left - margin.right
    const height = 600 - margin.top - margin.bottom
    const data = this.props.data

    const xTicks = this.props.xTicks
    const yTicks = this.props.yTicks
    const label = this.props.label

    const x = scaleLinear()
      .domain([
        0, 100
        // max(data, function(d) {
        //   return d[0]
        // })
      ])
      .range([0, width])

    const y = scaleLinear()
      .domain([
        0, 100
        // max(data, function(d) {
        //   return d[1]
        // })
      ])
      .range([height, 0])

    return (
      <div>
        <p className='answerTitle'><FaArrowsAltH/> {label[0]} <FaArrowsAltV/> {label[1]}</p>
        <svg
          viewBox='0 0 800 600'
          className="chart"
        >
          <g
            transform={"translate(" + margin.left + "," + margin.top + ")"}
            width={width}
            height={height}
            className="main"
          >
            <RenderCircles data={data} scale={{ x, y }} />
            <Axis
              axis="x"
              transform={"translate(0," + height/2 + ")"}
              scale={axisBottom().scale(x).ticks(3).tickFormat((d, i) => `${xTicks[i]}`)}
            />
            <Axis
              axis="y"
              transform={"translate(" + width/2 + ", 0)"}
              scale={axisLeft().scale(y).ticks(3).tickFormat((d, i) => `${yTicks[i]}`)}
            />
          </g>
        </svg>
        
      </div>
      
    )

  }
}

class RenderCircles extends React.Component {
  render() {
    const array = this.props.data
    let renderCircles = this.props.data.map((coords, i) => (
      i != 0 ?
        <circle
          cx={this.props.scale.x(coords[0])}
          cy={this.props.scale.y(coords[1])}
          r="8"
          style={{ fill: "rgba(253, 21, 78, 0.3)" }}
          key={i}
        />
      :
        (<circle
          cx={this.props.scale.x(coords[0])}
          cy={this.props.scale.y(coords[1])}
          r="12"
          style={{fill: "rgba(253, 21, 78, 1)"}}
          className="last_circle"
          key={i}
        />,
        <text 
        className="circleLabel"
        x={this.props.scale.x(coords[0])+20}
        y={this.props.scale.y(coords[1])}
        style={{ fill: 'blue'}}
        >Your Response
        </text>
        )
    ))
    return <g>{renderCircles}</g>
  }
}

class Axis extends React.Component {
  componentDidMount() {
    const node = this.refs[this.props.axis]
    select(node).call(this.props.scale)
  }

  render() {
    return (
      <g
        className="main axis date"
        transform={this.props.transform}
        ref={this.props.axis}
      />
    )
  }
}

function linearRegression(y, x) {
  var lr = {}
  var n = y.length
  var sum_x = 0
  var sum_y = 0
  var sum_xy = 0
  var sum_xx = 0
  var sum_yy = 0

  for (var i = 0; i < y.length; i++) {
    sum_x += x[i]
    sum_y += y[i]
    sum_xy += x[i] * y[i]
    sum_xx += x[i] * x[i]
    sum_yy += y[i] * y[i]
  }

  lr["slope"] = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x)
  lr["intercept"] = (sum_y - lr.slope * sum_x) / n
  lr["r2"] = Math.pow(
    (n * sum_xy - sum_x * sum_y) /
      Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)),
    2
  )

  return x => {
    return lr.slope * x + lr.intercept
  }
}