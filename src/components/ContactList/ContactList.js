import React from 'react';
import PropTypes from 'prop-types';
import styles from '../ContactList/ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => (
  <div className={styles.section}>
    <ul className={styles.list}>
      {contacts.map(({ id, name, number }) => (
        <li className={styles.item} key={id}>
          <p className={styles.name}> {name}:</p>
          <p className={styles.number}>{number}</p>
          <button
            className={styles.button}
            type="button"
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.any.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};

export default ContactList;
