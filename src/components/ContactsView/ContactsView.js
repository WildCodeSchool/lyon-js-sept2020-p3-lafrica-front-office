import { useState } from 'react';

const ContactsView = () => {
  const initialContactsList = [
    {
      id: 1,
      lastname: 'Genthon',
      firstname: 'Pierre',
      phone_number: '0412131415',
    },
    {
      id: 2,
      lastname: 'Olmos',
      firstname: 'Laeticia',
      phone_number: '0412131415',
    },
    {
      id: 3,
      lastname: 'Balkany',
      firstname: 'Patrick',
      phone_number: '0412131415',
    },
  ];

  const initialNewContact = {
    lastname: '',
    firstname: '',
    phone_number: '',
  };

  const [contactsList, setContactsList] = useState(initialContactsList);
  const [newContact, setNewContact] = useState(initialNewContact);

  const deletecontact = (contactID) => {
    setContactsList(contactsList.filter((contact) => contactID !== contact.id));
  };

  const handleChangeLastname = (contactID, newLastname) => {
    setContactsList(
      contactsList.map((contact) =>
        contactID === contact.id
          ? { ...contact, lastname: newLastname }
          : contact
      )
    );
  };

  const handleChangeFirstname = (contactID, newFirstname) => {
    setContactsList(
      contactsList.map((contact) =>
        contactID === contact.id
          ? { ...contact, firstname: newFirstname }
          : contact
      )
    );
  };

  const handleChangePhoneNumber = (contactID, newPhoneNumber) => {
    setContactsList(
      contactsList.map((contact) =>
        contactID === contact.id
          ? { ...contact, phone_number: newPhoneNumber }
          : contact
      )
    );
  };

  const handleChangeNewContactLastname = (newLastname) => {
    setNewContact({ ...newContact, lastname: newLastname });
  };

  const handleChangeNewContactFirstname = (newFirstname) => {
    setNewContact({ ...newContact, firstname: newFirstname });
  };

  const handleChangeNewContactPhoneNumber = (newPhoneNumber) => {
    setNewContact({ ...newContact, phone_number: newPhoneNumber });
  };

  const addANewContact = (event) => {
    event.preventDefault();
    setContactsList([
      ...contactsList,
      {
        id: contactsList.length + 1,
        lastname: newContact.lastname,
        firstname: newContact.firstname,
        phone_number: newContact.phone_number,
      },
    ]);
    setNewContact({
      lastname: '',
      firstname: '',
      phone_number: '',
    });
  };

  return (
    <div>
      <h2>Gérer vos contacts</h2>
      <h3>Ajoutez, modifiez ou suprimer un contact</h3>
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
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>
                  <input
                    type="text"
                    value={contact.lastname}
                    onChange={(event) =>
                      handleChangeLastname(contact.id, event.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={contact.firstname}
                    onChange={(event) =>
                      handleChangeFirstname(contact.id, event.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={contact.phone_number}
                    onChange={(event) =>
                      handleChangePhoneNumber(contact.id, event.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => deletecontact(contact.id)}
                  >
                    Suprimer le contact
                  </button>
                </td>
              </tr>
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
          value={newContact.phone_number}
          required
          onChange={(event) =>
            handleChangeNewContactPhoneNumber(event.target.value)
          }
        />
        <button type="submit" className="btn btn-default">
          Ajouter le contact
        </button>
      </form>
      <button type="button">Sauvegardez la liste de contacts</button>
    </div>
  );
};

export default ContactsView;
