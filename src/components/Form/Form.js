import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import styles from '../Form/Form.module.css';

export class Form extends Component {
  prodIdName = uuidv4();
  prodIdNumber = uuidv4();

  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const contacts = {
      name,
      number,
    };
    this.setState({ contacts });
    this.props.onAddContact(contacts);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    const { handleSubmit, prodIdName, handleChange, prodIdNumber } = this;
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor={prodIdName}>
          Name
        </label>
        <input
          className={styles.input}
          id={prodIdName}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          onChange={handleChange}
        />
        <br />
        <label className={styles.label} htmlFor={prodIdNumber}>
          Number
        </label>
        <input
          className={styles.input}
          id={prodIdNumber}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          onChange={handleChange}
        />
        <button className={styles.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  onAddContact: PropTypes.func.isRequired,
  number: PropTypes.number,
  name: PropTypes.string,
};
