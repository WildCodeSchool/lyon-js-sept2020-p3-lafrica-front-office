import { useState, useContext } from 'react';
import API from '../../../services/API';
import { UserContext } from '../../../context/UserContext';

const ContactEditor = (props) => {
  const {
    id,
    lastname,
    firstname,
    phoneNumber,
    deleteContact,
    contactsList,
    setContactsList,
    campaignId,
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

  const modifyContact = async (contactId) => {
    await API.put(
      `/users/${userDetails.id}/campaigns/${campaignId}/contacts/${contactId}`,
      {
        lastname: contactLastname,
        firstname: contactFirstname,
        phone_number: contactPhoneNumber,
      }
    )
      .then(() => {
        setContactsList([...contactsList]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr key={id}>
      <td className="id">{id}</td>
      <td>
        <input
          type="text"
          value={contactLastname}
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
        <button
          className="create-and-modify-contact-btn"
          type="button"
          onClick={() => modifyContact(id)}
        >
          Modifiez
        </button>
      </td>
      <td>
        <button
          className="delete-contact-btn"
          type="button"
          onClick={() => deleteContact(id)}
        >
          Suprimer
        </button>
      </td>
    </tr>
  );
};

export default ContactEditor;
