import React, { Component } from 'react';
import { connect } from 'react-redux';
 
class CreateTodo extends Component {
  state = {
    text: ''
  };
 
  handleChange = event => {
    this.setState({
      text: event.target.value
    });
  };
 
  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch({ type: 'ADD_TODO', payload: this.state });
  };
 
  render() {
    return (
      <div>
        <form onSubmit={event => this.handleSubmit(event)}>
          <p>
            <label>add todo</label>
            <input
              type="text"
              onChange={event => this.handleChange(event)}
              value={this.state.text}
            />
          </p>
          <input type="submit" />
        </form>
      </div>
    );
  }
}
 
export default connect()(CreateTodo);
Now, if you start up the app and click the submit button, you should see your actions via a console.log in our reducer.

3. Update State
So we are properly dispatching the action, but the state is not being updated. What could be the problem? Well remember our crux of redux flow: Action -> Reducer -> New State. So if the action is properly dispatched, then our problem must lie with our reducer. Open up the file ./src/reducers/manageTodo.js.

This function does nothing. Let's fix that. First we need to provide an initial state. Because, we want our state to look like:

state = {
  todos: [
    { text: 'buy groceries' },
    { text: 'watch netflix' },
  ]
}
Our initial state should be an empty list of todos, { todos: [] }.

Second, we need to concatenate a new todo each time we receive an action that looks like { type: 'ADD_TODO', payload: { text: 'watch baseball' } }. Ok, let's do it.

// ./src/reducers/manageTodo.js
 
export default function manageTodo(state = {
  todos: [],
}, action) {
  switch (action.type) {
    case 'ADD_TODO':
 
      console.log({ todos: state.todos.concat(action.payload.text) });
 
      return { todos: state.todos.concat(action.payload.text) };
 
    default:
      return state;
  }
}