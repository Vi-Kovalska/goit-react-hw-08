import React, { useState } from 'react'
import s from './Contact.module.css'
import { useDispatch, useSelector } from 'react-redux'

// import ContactForm from "../ContactForm/ContactForm";
import toast from 'react-hot-toast';
import { selectContacts } from '../../redux/contacts/selectors';
import { selectConfirmModalIsOpen } from '../../redux/auth/selectors';
import {changeVisibleConfirmModal} from '../../redux/auth/slice'
import { editContact } from '../../redux/contacts/operations';
import { setIdContacts } from '../../redux/contacts/slice';
import ContactForm from '../ContactForm/ContactForm';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const Contact = ({ data: { id, name, number }}) => {
  const [edited, setEdited] = useState(false); 
  
    const items = useSelector(selectContacts);
  const dispatch = useDispatch();
const confirmModalIsOpen = useSelector(selectConfirmModalIsOpen)
  const handleSubmit = (values, actions) => {
     const uniqueName = items.every(
          (cont) => cont.name.toLowerCase() !== values.name.toLowerCase()
        );
        const uniqueTel = items.every(
          (cont) => String(cont.number) !== String(values.number)
        );

     if (!uniqueTel) return toast.error("This number is already added to contacts");
     if (!uniqueName) return toast.error("This name is already added to contacts");

    dispatch(editContact({ id, ...values }));
    setEdited(false);
    toast.success('Contact edited!')
     actions.resetForm();
 }
  return (
    <>
    <address className={s.addressWrapper}>
      {edited ? <ContactForm btnName={'Edit'} handleSubmit={handleSubmit} initialValues={{name, number}}><button className={s.btnCancel} onClick={()=>setEdited(false)}>x</button></ContactForm> :  <div className={s.contactWrapper}>
        <div className={s.contAndIconWrapper}>
          <svg aria-hidden="true" width={22} height={22} fill={'black'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 16c2.947 0 5.333-2.387 5.333-5.333s-2.387-5.333-5.333-5.333c-2.947 0-5.333 2.387-5.333 5.333s2.387 5.333 5.333 5.333zM16 18.667c-3.56 0-10.667 1.787-10.667 5.333v1.333c0 0.733 0.6 1.333 1.333 1.333h18.667c0.733 0 1.333-0.6 1.333-1.333v-1.333c0-3.547-7.107-5.333-10.667-5.333z"></path></svg>
           <p className={s.text}>{name}</p></div>
        <div className={s.contAndIconWrapper}>
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width={16} height={16} fill={'black'} viewBox="0 0 32 32"><path d="m28.865 21.822-4.525-.517a3.543 3.543 0 0 0-2.921 1.015l-3.278 3.278A26.8 26.8 0 0 1 6.402 13.859l3.296-3.296a3.545 3.545 0 0 0 1.015-2.921l-.517-4.489A3.566 3.566 0 0 0 6.651 0H3.569C1.556 0-.118 1.675.006 3.687.95 18.9 13.117 31.049 28.312 31.993c2.013.125 3.687-1.55 3.687-3.563v-3.082c.018-1.799-1.336-3.313-3.135-3.527z"/></svg>
            <p className={s.text}>{number}</p></div>
          </div>}
         
      <div className={s.btnsWrapper}>
        <button onClick={() => { setEdited(true)}} disabled={edited}>Edit</button>
        <button onClick={() => {dispatch(setIdContacts(id)); dispatch(changeVisibleConfirmModal(true))}}>Delete</button>
      </div>    
    </address>
      {confirmModalIsOpen && <ConfirmationModal />}
      </>
  )
}

export default Contact