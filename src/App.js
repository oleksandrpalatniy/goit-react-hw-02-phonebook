import React from 'react';
import { Component } from 'react';
import Form from './components/phonebook/Form';
import AddPhoneList from './components/phonebook/PhoneList';
import shortid from 'shortid';
import Filter from './components/phonebook/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContacts = ({ name, number, id }) => {
    let contact = {
      id: shortid.generate(),
      name,
      number,
    };

    const findName = this.state.contacts.find(con => con.name === contact.name);

    if (findName) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContact = () => {
    const { filter, contacts } = this.state;
    const normFilter = filter.toLowerCase();
    return contacts.filter(con => con.name.toLowerCase().includes(normFilter));
  };

  render() {
    return (
      <>
        <Form onSubmit={this.addContacts} />
        {this.state.contacts.length ? (
          <Filter
            value={this.state.filter}
            onChangeFilter={this.changeFilter}
          />
        ) : (
          <></>
        )}

        <AddPhoneList
          data={this.getVisibleContact()}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
}

export default App;
