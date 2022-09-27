import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Filter/Filter.module.css';

const Filter = ({ contacts, onChange }) => (
  <div>
    <label className={styles.label}>
      Find contacts by name
      <input
        className={styles.input}
        type="text"
        value={contacts}
        onChange={onChange}
      />
    </label>
  </div>
);

Filter.propTypes = {
  contacts: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
