import { useState, useContext, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/plain.css';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
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

  const history = useHistory();

  const { userDetails } = useContext(UserContext);

  const { contactsList, setContactsList, toggleContactsUpload } = props;
  const [newContact, setNewContact] = useState(initialNewContact);
  const [totalContacts, setTotalContacts] = useState();
  const searchParams = {
    limit: 10,
    offset: 0,
    ...queryString.parse(window.location.search),
  };

  const { limit, offset } = searchParams;

  const currentPage = offset / limit + 1;
  const lastPage = Math.ceil(totalContacts / limit);

  const updateSearchUrl = (params) => {
    const clientQueryParams = queryString.stringify(params);
    history.push(`/campaigns/edit/${campaignId}?${clientQueryParams}`);
  };

  const setCurrentPage = (pageNum) => {
    updateSearchUrl({
      ...searchParams,
      offset: parseInt(limit, 10) * (pageNum - 1),
    });
  };

  const getCollection = async () => {
    await API.get(
      `/users/${userDetails.id}/campaigns/${campaignId}/contacts?limit=${limit}&offset=${offset}`
    )
      .then((res) => {
        setContactsList(res.data.contacts);
        setTotalContacts(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCollection();
  }, [newContact, limit, offset, toggleContactsUpload]);

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
                <PhoneInput
                  regions={['europe', 'africa']}
                  value={newContact.phoneNumber}
                  onChange={(value) => handleChangeNewContactPhoneNumber(value)}
                  inputStyle={{
                    fontSize: '14px',
                    width: '100%',
                    border: 'white',
                  }}
                  specialLabel=""
                  placeholder="Numéro de téléphone"
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
      {lastPage !== 1 && !!contactsList.length && (
        <div className="pagination">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(1)}
          >
            First page
          </button>
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous page
          </button>
          {currentPage}/{lastPage}
          <button
            type="button"
            disabled={currentPage === lastPage}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next page
          </button>
          <button
            type="button"
            disabled={currentPage === lastPage}
            onClick={() => setCurrentPage(lastPage)}
          >
            Last page
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactsView;
