import React from "react"
import { scaleLinear, max, axisLeft, axisBottom, select } from "d3"

function sortNumber(a, b) {
  return a - b
}

export default class ScatterPlot extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const margin = { top: 20, right: 15, bottom: 60, left: 60 }
    const width = 800 - margin.left - margin.right
    const height = 600 - margin.top - margin.bottom
    const data = this.props.data

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
        <h3>Scatter Plot</h3>
        <svg
          width={width + margin.right + margin.left}
          height={height + margin.top + margin.bottom}
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
              transform={"translate(0," + height + ")"}
              scale={axisBottom().scale(x)}
            />
            <Axis
              axis="y"
              transform="translate(0,0)"
              scale={axisLeft().scale(y)}
            />
          </g>
        </svg>
      </div>
    )
  }
}

class RenderCircles extends React.Component {
  render() {
    let renderCircles = this.props.data.map((coords, i) => (
      <circle
        cx={this.props.scale.x(coords[0])}
        cy={this.props.scale.y(coords[1])}
        r="8"
        style={{ fill: "rgba(25, 158, 199, .9)" }}
        key={i}
      />
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