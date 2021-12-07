import React from 'react';
import styles from './phonebook.module.css';

const AddPhoneList = ({ data, onDeleteContact }) => {
  return (
    <ul className={styles.PhoneList}>
      {data.map(({ id, name, number }) => (
        <li key={id}>
          <span className={styles.PhoneList_item}>{name}:</span>
          <span className={styles.PhoneList_item}>{number}</span>
          <button
            className={styles.PhoneList_button}
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default AddPhoneList;
