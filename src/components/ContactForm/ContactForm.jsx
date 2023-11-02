import React, { useState } from 'react';
import css from './ContactForm.module.css';

const ContactForm = ({ handleAddContact }) => {
  const [name, setName] = useState(' ');
  const [number, setNumber] = useState(' ');

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };
  const reset = () => {
    setName(' ');
    setNumber(' ');
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleAddContact({ name, number });
    reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label>
        <p className={css.labelText}>Name</p>
        <input
          className={css.imputForm}
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          placeholder="username: "
          pattern="^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          required
        />
      </label>
      <label>
        <p className={css.labelText}>Number</p>
        <input
          className={css.imputForm}
          type="tel"
          name="number"
          value={number}
          onChange={handleInputChange}
          placeholder="Enter number tel: "
          pattern="\\+?\\d{1,4}?[ .\\-\\s]?\\(?\\d{1,3}?\\)?[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,9}"
          required
        />
      </label>

      <button className={css.buttonForm} type="submit">
        Add contact
      </button>
    </form>
  );
};
export default ContactForm;
