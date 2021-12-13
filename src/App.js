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

  addContacts = ({ name, number, id }) => {
    let contact = {
      id: shortid.generate(),
      name,
      number,
    };

    const isUniqueName = this.state.contacts.find(
      con => con.name === contact.name,
    );
    
    if (isUniqueName) {
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
