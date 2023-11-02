import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

const contactsData = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contactsInString = localStorage.getItem('contacts');
    const contactsIsParsed = JSON.parse(contactsInString) ?? contactsData;
    return contactsIsParsed;
  });
  const [filter, setFilter] = useState(' ');

  useEffect(() => {
    const contactsInString = JSON.stringify(contacts);
    localStorage.setItem('contacts', contactsInString);
  }, [contacts]);

  //add
  const handleAddContact = contactList => {
    if (contacts.some(contact => contact.name === contactList.name)) {
      alert(`'${contactList.name}' is already in contact`);
      return;
    }

    const newContact = {
      ...contactList,
      id: nanoid(),
    };
    setContacts([...contacts, newContact]);
  };

  //delete
  const onDeleteHandler = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  //filter
  const onFilter = event => {
    setFilter(event.target.value);
    // this.setState({
    //   filter: event.target.value,
    // });
  };
  const onFilterContacts = () => {
    // const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.trim().toLowerCase())
    );
  };

  // const { filter } = this.state;
  const filteredContacts = onFilterContacts();

  return (
    <section>
      <h1 className="titlePhone">Phonebook</h1>
      <ContactForm handleAddContact={handleAddContact} />

      <h2 className="titleContact">Contacts</h2>
      {contacts.length > 1 && <Filter onFilter={onFilter} filter={filter} />}

      {contacts.length !== 0 && (
        <ContactList
          filtredContacts={filteredContacts}
          onDelete={onDeleteHandler}
        />
      )}
    </section>
  );
};
