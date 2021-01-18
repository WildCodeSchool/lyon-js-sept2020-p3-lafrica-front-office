import { useState, useContext, useEffect } from 'react';
import API from '../../../services/API';
import Contact from './Contact';
import { UserContext } from '../../../context/UserContext';
import './ContactsView.scss';

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
    <div className="contacts-view-container">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom de famille</th>
            <th>Prénom</th>
            <th>Numéro de télephone</th>
          </tr>
        </thead>
        <tbody>
          {contactsList.map((contact) => {
            return (
              <Contact
                key={contact.id}
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
      <h4 className="add-contact">Ajouter un contact</h4>
      <form onSubmit={(event) => addANewContact(event)}>
        <table>
          <tr>
            <td>
              <input
                type="text"
                placeholder="Nom de famille"
                value={newContact.lastname}
                required
                onChange={(event) =>
                  handleChangeNewContactLastname(event.target.value)
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="prénom"
                value={newContact.firstname}
                required
                onChange={(event) =>
                  handleChangeNewContactFirstname(event.target.value)
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Numéro de télephone"
                value={newContact.phoneNumber}
                required
                onChange={(event) =>
                  handleChangeNewContactPhoneNumber(event.target.value)
                }
              />
            </td>
            <td>
              <button type="submit" className="create-and-modify-contact-btn">
                Ajouter le contact
              </button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default ContactsView;
