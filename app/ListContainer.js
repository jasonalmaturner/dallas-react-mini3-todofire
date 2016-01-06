import React from 'react';
import AddItem from './AddItem';
import List from './List';
import firebase from 'firebase';

const ListContainer = React.createClass({
  getInitialState() {
    return {
      list: [],
    };
  },

  componentDidMount() {
    this.firebaseRef = new Firebase('https://reactweek-todofire.firebaseio.com/todos');
    this.firebaseRef.on('child_added', (snapshot) => {
      this.setState({
        list: this.state.list.concat([{key: snapshot.key(), val: snapshot.val()}]),
      });
    });

    this.firebaseRef.on('child_removed', (snapshot) => {
      var key = snapshot.key();
      var newList = this.state.list.filter((item) => {
        return item.key !== key;
      });
      this.setState({
        list: newList,
      });
    });
  },

  componentWillUnmount() {
    this.firebaseRef.off();
  },

  handleAddItem(newItem) {
    this.firebaseRef.push(newItem);
  },

  handleRemoveItem(index) {
    var item = this.state.list[index];
    this.firebaseRef.child(item.key).remove();
  },

  render() {
    return (
      <div className='col-sm-6 col-md-offset-3'>
        <div className='col-sm-12'>
          <h3 className='text-center'> Todo List </h3>
          <AddItem add={this.handleAddItem}/>
          <List items={this.state.list.map((item) => {return item.val;})} remove={this.handleRemoveItem}/>
        </div>
      </div>
    );
  },
});

export default ListContainer;
