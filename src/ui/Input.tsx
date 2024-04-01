import React from 'react';
import {InputProps} from '../assets/types';
import styles from './Input.module.css';

const Input = (props: InputProps) => {
  const {id, label, ...rest} = props;
  return(
    <p className={styles.control}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required {...rest}/>
    </p>
  )
}

export default Input;