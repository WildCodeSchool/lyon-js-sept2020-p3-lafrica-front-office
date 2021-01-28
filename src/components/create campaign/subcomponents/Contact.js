import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../../../services/API';
import { UserContext } from '../../../context/UserContext';

const Contact = (props) => {
  const history = useHistory();

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
  const { userDetails, setLoggedIn, setUserDetails } = useContext(UserContext);

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
        if (err.response.status === 401) {
          setLoggedIn(false);
          setUserDetails({});
          history.push('/signin');
        }
      });
  };

  return (
    <tr key={id}>
      <td>
        <input
          type="text"
          value={contactLastname.toUpperCase()}
          onChange={handleChangeLastname}
        />
      </td>
      <td>
        <input
          type="text"
          value={
            contactFirstname.charAt(0).toUpperCase() + contactFirstname.slice(1)
          }
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
          Supprimer
        </button>
      </td>
    </tr>
  );
};

export default Contact;
