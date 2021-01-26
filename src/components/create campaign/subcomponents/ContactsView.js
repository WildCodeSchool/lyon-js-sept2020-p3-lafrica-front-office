import { useState, useContext, useEffect } from 'react';
import API from '../../../services/API';
import Contact from './Contact';
import { UserContext } from '../../../context/UserContext';
import './ContactsView.scss';

const ContactsView = (props) => {
  const initialNewContact = {
    lastname: '',
    firstname: '',
    phoneNumber: '',
  };

  const { campaignId } = props;

  const { userDetails } = useContext(UserContext);

  const { contactsList, setContactsList } = props;
  const [newContact, setNewContact] = useState(initialNewContact);

  const getCollection = async () => {
    await API.get(`/users/${userDetails.id}/campaigns/${campaignId}/contacts`)
      .then((res) => {
        setContactsList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCollection();
  }, [newContact]);

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
    await API.delete(
      `/users/${userDetails.id}/campaigns/${campaignId}/contacts/${contactId}`
    );
    getCollection();
  };

  const addANewContact = async (event) => {
    event.preventDefault();
    setContactsList([]);

    await API.post(
      `/users/${userDetails.id}/campaigns/${campaignId}/contacts/`,
      [
        {
          lastname: newContact.lastname,
          firstname: newContact.firstname,
          phone_number: newContact.phoneNumber,
        },
      ]
    )
      // .then(() => {
      //   getCollection();
      // })
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
      <h4 className="small-title">
        Ajouter un contact à votre liste de diffusion
      </h4>
      <form
        onSubmit={(event) => addANewContact(event)}
        className="add-contact-form"
      >
        <table>
          <tbody>
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
                  placeholder="Prénom"
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
          </tbody>
        </table>
      </form>
      <h4 className="small-title">Votre liste de diffusion</h4>
      {contactsList.length === 0 ? (
        <p>
          Votre liste de diffusion est vide. Ajoutez des contacts ou importez en
          depuis un fichier.
        </p>
      ) : (
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
                  campaignId={campaignId}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContactsView;
