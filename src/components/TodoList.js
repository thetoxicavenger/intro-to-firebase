import React, { Component } from 'react'
import AddTodo from './AddTodo';
import Todo from './Todo'

export default class TodoList extends Component {
    state = {
        todos: []
    }
    constructor(props) {
        super(props)
        this.db = this.props.firebase.firestore()
    }
    componentDidMount = () => {
        this.db.collection('todos').get().then(querySnapshot => {
            let todos = []
            querySnapshot.forEach(todo => {
                todos.push({
                    ...todo.data(),
                    id: todo.id
                })
            });
            this.setState({
                todos
            })
        })
    }
    addTodo = ({ title, body, img }) => {
        
        const storage = this.props.firebase.storage()
        const storageRef = storage.ref()
        const imageRef = storageRef.child('images/item.jpg')

        const uploadTask = imageRef.put(img)

        uploadTask.on('state_changed', snapshot => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case this.props.firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case this.props.firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, error => {
            // Handle unsuccessful uploads
          }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                this.db.collection('todos').add({
                    title, body, img_url: downloadURL
                })
                .then(({ id }) => {

                    this.setState(({ todos }) => {
                        return {
                            todos: [...todos, {
                                id, title, body, img_url: downloadURL
                            }]
                        }
                    })
                })
            });
          });
    }
    render() {
        return (
            <div style={{ marginTop: '10px' }}>
                <h3>All Todos</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {this.state.todos.length && this.state.todos.map(({ id, title, body, img_url }) => {
                        return (
                            <Todo key={id} title={title} body={body} img_url={img_url} />
                        )
                    })}
                </div>
                <AddTodo firebase={this.props.firebase} addTodo={this.addTodo} />
            </div>
        )
    }
}
