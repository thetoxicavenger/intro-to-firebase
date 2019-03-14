import React, { Component } from 'react'

export default class Todo extends Component {
  render() {
    const { title, body, img_url } = this.props
    return (
      <div style={{padding: '20px', margin: '20px', background: '#ece9e9'}}>
        <h4>{title}</h4>
        <div>
          <img src={img_url} />
        </div>
        <p>{body}</p>
      </div>
    )
  }
}
