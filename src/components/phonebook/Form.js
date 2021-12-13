import React, { Component } from 'react';
import shortid from 'shortid';
import styles from './phonebook.module.css';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };
  nameInputId = shortid.generate();
  numberInputId = shortid.generate();
  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={styles.Container} onSubmit={this.handleSubmit}>
        <h2>Phonebook</h2>
        <label htmlFor={this.nameInputId} className={styles.InputForm}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.handleChange}
            id={this.nameInputId}
          ></input>
        </label>
        <label htmlFor={this.numberInputId} className={styles.InputForm}>
          {' '}
          Number
          <input
            type="number"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
            id={this.numberInputId}
          ></input>
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

export default Form;
