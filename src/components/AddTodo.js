import React, { Component } from 'react'

export default class AddTodo extends Component {
    state = {
        title: '',
        body: '',
        img: null
    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = e => {
        e.preventDefault()
        this.props.addTodo(this.state)
        this.setState({
            title: '',
            body: '',
            img: null
        });
    }
    onFileChange = e => {
        this.setState({
            img: e.target.files[0]
        })
    }
    render() {
        return (
            <div>
                <h3>Add a Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Title</label>
                    </div>
                    <div>
                        <input type="text" value={this.state.title} onChange={this.onChange} name="title" />
                    </div>
                    <div>
                        <label>Body</label>
                    </div>
                    <div>
                        <input type="text" value={this.state.body} onChange={this.onChange} name="body" />
                    </div>
                    <div>
                        <label>Image</label>
                    </div>
                    <div>
                        <input type="file" onChange={this.onFileChange} name="img" />
                    </div>
                    <div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        )
    }
}
