import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form } from './components/Form/Form';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(localContacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onAddContact = obj => {
    const contacts = {
      id: uuidv4(),
      name: obj.name,
      number: obj.number,
    };
    /* console.log(contacts.name);
    console.log(obj.name); */
    if (
      this.state.contacts.find(
        contact => contacts.name.toLowerCase() === contact.name.toLowerCase(),
      )
    ) {
      alert(`${contacts.name} is already in contacts`);
    } else
      this.setState(prevState => {
        return {
          contacts: [contacts, ...prevState.contacts],
        };
      });
  };

  onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  onChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  /* removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  }; */

  render() {
    const { onAddContact, onChangeFilter, onDeleteContact } = this;
    const normalizedFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
    return (
      <section>
        <h2>Phonebook</h2>
        <Form onAddContact={onAddContact} />
        <h2>Contacts</h2>
        <Filter contacts={this.state.filter} onChange={onChangeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={onDeleteContact}
        />
      </section>
    );
  }
}

export default App;
