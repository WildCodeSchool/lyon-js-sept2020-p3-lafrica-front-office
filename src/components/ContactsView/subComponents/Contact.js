import { useState, useContext } from 'react';
import API from '../../../services/API';
import { UserContext } from '../../../context/UserContext';

const Contact = (props) => {
  const {
    id,
    lastname,
    firstname,
    phoneNumber,
    deleteContact,
    contactsList,
    setContactsList,
  } = props;
  const [contactLastname, setContactLastname] = useState(lastname);
  const [contactFirstname, setContactFirstname] = useState(firstname);
  const [contactPhoneNumber, setContactPhoneNumber] = useState(phoneNumber);
  const { userDetails } = useContext(UserContext);

  const handleChangeLastname = (e) => {
    setContactLastname(e.target.value);
  };

  const handleChangeFirstname = (e) => {
    setContactFirstname(e.target.value);
  };

  const handleChangePhoneNumber = (e) => {
    setContactPhoneNumber(e.target.value);
  };

  const modifyContact = async () => {
    await API.put(`/users/${userDetails.id}/contacts/`, [
      {
        lastname: contactLastname,
        firstname: contactFirstname,
        phone_number: contactPhoneNumber,
      },
    ])
      .then((res) => {
        setContactsList([...contactsList, res.data[0]]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr key={id}>
      <td>{id}</td>
      <td>
        <input
          type="text"
          value={contactLastname}
          // eslint-disable-next-line no-restricted-globals
          onChange={handleChangeLastname}
        />
      </td>
      <td>
        <input
          type="text"
          value={contactFirstname}
          onChange={handleChangeFirstname}
        />
      </td>
      <td>
        <input
          type="text"
          value={contactPhoneNumber}
          onChange={handleChangePhoneNumber}
        />
      </td>
      <td>
        <button type="button" onClick={() => modifyContact(id)}>
          Modifiez
        </button>
      </td>
      <td>
        <button type="button" onClick={() => deleteContact(id)}>
          Suprimer
        </button>
      </td>
    </tr>
  );
};

export default Contact;
