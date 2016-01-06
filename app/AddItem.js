import React from 'react';

const AddItem = React.createClass({
  getInitialState() {
    return {
      newItem: '',
    };
  },

  handleChange(e) {
    this.setState({
      newItem: e.target.value,
    });
  },

  handleSubmit(e) {
    if (e.keyCode === 13) {
      this.props.add(this.state.newItem);
      this.setState({
        newItem: '',
      });
    }
  },

  render() {
    return (
      <div>
        <input type='text' className='form-control' value={this.state.newItem} placeholder='New Item' onKeyDown={this.handleSubmit} onChange={this.handleChange} />
      </div>
    );
  },
});

export default AddItem;
