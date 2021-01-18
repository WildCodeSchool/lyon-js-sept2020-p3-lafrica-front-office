import { useState, useContext, useEffect } from 'react';
import API from '../../services/API';
import Contact from './subComponents/Contact';
import { UserContext } from '../../context/UserContext';

const ContactsView = () => {
  const initialContactsList = [];

  const initialNewContact = {
    lastname: '',
    firstname: '',
    phoneNumber: '',
  };

  const { userDetails } = useContext(UserContext);

  const [contactsList, setContactsList] = useState(initialContactsList);
  const [newContact, setNewContact] = useState(initialNewContact);

  const getCollection = () => {
    API.get(`/users/${userDetails.id}/contacts/`)
      .then((res) => {
        setContactsList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCollection();
  }, []);
  const handleChangeNewContactLastname = (newLastname) => {
    setNewContact({ ...newContact, lastname: newLastname });
  };

  const handleChangeNewContactFirstname = (newFirstname) => {
    setNewContact({ ...newContact, firstname: newFirstname });
  };

  const handleChangeNewContactPhoneNumber = (newPhoneNumber) => {
    setNewContact({ ...newContact, phoneNumber: newPhoneNumber });
  };

  const deleteContact = async (contactId) => {
    await API.delete(`/users/${userDetails.id}/contacts/${contactId}`);
    getCollection();
  };

  const addANewContact = async (event) => {
    event.preventDefault();

    await API.post(`/users/${userDetails.id}/contacts/`, [
      {
        lastname: newContact.lastname,
        firstname: newContact.firstname,
        phone_number: newContact.phoneNumber,
      },
    ])
      .then((res) => {
        setContactsList([...contactsList, res.data[0]]);
      })
      .catch((err) => {
        console.log(err);
      });
    setNewContact({
      lastname: '',
      firstname: '',
      phoneNumber: '',
    });
  };

  return (
    <div>
      <h2>Gérer vos contacts</h2>
      <h3>Ajoutez, modifiez ou suprimez un contact</h3>
      <table>
        <thead>
          <tr>
            <th>Identifiant</th>
            <th>Nom de famille</th>
            <th>Prénom</th>
            <th>Numéro de télephone</th>
          </tr>
        </thead>
        <tbody>
          {contactsList.map((contact) => {
            return (
              <Contact
                id={contact.id}
                lastname={contact.lastname}
                firstname={contact.firstname}
                phoneNumber={contact.phone_number}
                deleteContact={deleteContact}
                contactsList={contactsList}
                setContactsList={setContactsList}
              />
            );
          })}
        </tbody>
      </table>
      <form onSubmit={(event) => addANewContact(event)}>
        <input
          type="text"
          placeholder="Nom de famille"
          value={newContact.lastname}
          required
          onChange={(event) =>
            handleChangeNewContactLastname(event.target.value)
          }
        />
        <input
          type="text"
          placeholder="prénom"
          value={newContact.firstname}
          required
          onChange={(event) =>
            handleChangeNewContactFirstname(event.target.value)
          }
        />
        <input
          type="text"
          placeholder="Numéro de télephone"
          value={newContact.phoneNumber}
          required
          onChange={(event) =>
            handleChangeNewContactPhoneNumber(event.target.value)
          }
        />
        <button type="submit" className="btn btn-default">
          Ajouter le contact
        </button>
      </form>
      <button type="button" onClick={getCollection}>
        Afficher la liste de contacts
      </button>
    </div>
  );
};

export default ContactsView;
