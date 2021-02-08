/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useState } from 'react';
import queryString from 'query-string';
import { useForm } from 'react-hook-form';
import './Users.scss';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Landscape from '../../images/turn_your_phone.gif';
import API from '../../services/API';
import { UserContext } from '../../context/UserContext';

const Users = () => {
  const history = useHistory();
  const { addToast } = useToasts();

  const { register, handleSubmit } = useForm();
  const { setLoggedIn, setUserDetails } = useContext(UserContext);

  const [totalusers, setTotalUsers] = useState();
  const [users, setUsers] = useState();

  const searchParams = {
    limit: 10,
    offset: 0,
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    ...queryString.parse(window.location.search),
  };

  const { limit, offset, sortby, firstname, lastname, email } = searchParams;

  const currentPage = offset / limit + 1;
  const lastPage = Math.ceil(totalusers / limit);

  const updateSearchUrl = (params) => {
    const clientQueryParams = queryString.stringify(params);
    history.push(`/users?${clientQueryParams}`);
  };

  const setCurrentPage = (pageNum) => {
    updateSearchUrl({
      ...searchParams,
      offset: parseInt(limit, 10) * (pageNum - 1),
    });
  };

  const handleUserConfirmation = (userId, userEmail) => {
    API.put(`/users/${userId}`, { email: userEmail }).then(() => {
      const clientQueryParams = queryString.stringify(searchParams);
      history.push(`/users?${clientQueryParams}`);
      addToast('Inscription confirmée !', {
        appearance: 'success',
        autoDismiss: true,
      });
    });
  };

  useEffect(() => {
    const clientQueryParams = queryString.stringify(searchParams);
    API.get(`/users?${clientQueryParams}`)
      .then((res) => {
        setUsers(res.data.users);
        setTotalUsers(res.data.total);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setLoggedIn(false);
          setUserDetails({});
          history.push('/signin');
        }
      });
  }, [limit, offset, sortby, firstname, lastname, email]);

  const showUsersList = () => {
    return (
      users &&
      users.map((user) => {
        return (
          <tr key={user.id}>
            <td className="stylized-td">{user.firstname}</td>
            <td className="stylized-td">{user.lastname}</td>
            <td className="stylized-td">{user.email || 'Ma campagne'}</td>
            <td className="stylized-td">
              {user.user_confirmed === 0 ? (
                <div className="cell-campaign-status">
                  <span className="status in-progress-status" />
                  <p>En attente </p>
                </div>
              ) : (
                <div className="cell-campaign-status">
                  <span className="status finished-status" />
                  <p>Confirmé</p>
                </div>
              )}
            </td>
            <td className="stylized-td">
              {user.user_confirmed === 0 ? (
                <div className="cell-campaign-status">
                  <span
                    onClick={() => handleUserConfirmation(user.id, user.email)}
                    role="button"
                    onKeyDown={() => {}}
                    tabIndex="0"
                    style={{ cursor: 'pointer' }}
                  >
                    Confirmer l'inscription
                  </span>
                </div>
              ) : (
                <div className="cell-campaign-status" />
              )}
            </td>
          </tr>
        );
      })
    );
  };

  return (
    <div className="compaigns-view-container">
      <article className="campaings-editor-view-container">
        <div className="campaigns-editor-view">
          <div className="title">
            <h2>Liste des Utilisateurs</h2>
          </div>
        </div>
      </article>
      <article>
        <div className="landscape">
          <img className="landscape-img" src={Landscape} alt="landscape" />
          <p>Veuillez tourner votre appareil au format paysage</p>
        </div>
        <div className="campaigns-list">
          <table>
            <thead>
              <tr>
                <th className="search-th">
                  <form className="table-user-search">
                    <label htmlFor="firstname">
                      <input
                        name="firstname"
                        id="firstname"
                        type="text"
                        defaultValue={searchParams.firstname}
                        placeholder="Rechercher par prénom"
                        ref={register}
                      />
                    </label>
                  </form>
                </th>
                <th className="search-th">
                  <form className="table-user-search">
                    <label htmlFor="lastname">
                      <input
                        name="lastname"
                        id="lastname"
                        type="text"
                        defaultValue={searchParams.lastname}
                        placeholder="Rechercher par nom de famille"
                        ref={register}
                      />
                    </label>

                    {/* <button type="submit">ok</button> */}
                  </form>
                </th>
                <th className="search-th">
                  <form className="table-user-search">
                    <label htmlFor="email">
                      <input
                        name="email"
                        id="email"
                        type="text"
                        defaultValue={searchParams.email}
                        placeholder="Rechercher par email"
                        ref={register}
                      />
                    </label>

                    {/* <button type="submit">ok</button> */}
                  </form>
                </th>
                <th className="search-th">
                  <form className="table-date-sort">
                    <label htmlFor="sortby">
                      <select
                        name="sortby"
                        id="sortby"
                        ref={register}
                        defaultValue={searchParams.sortby}
                      >
                        <option value="user_confirmed.asc">
                          Trier par statut
                        </option>
                        <option value="user_confirmed.desc">Validé</option>
                        <option value="user_confirmed.asc">En attente</option>
                      </select>
                    </label>
                  </form>{' '}
                </th>
                <th className="search-th">
                  <div
                    role="button"
                    tabIndex={0}
                    className="table-search"
                    onClick={handleSubmit(updateSearchUrl)}
                    onKeyPress={() => {}}
                  >
                    Appliquer
                  </div>
                </th>
              </tr>
              <tr>
                <th className="users-stylized-th">Prénom</th>
                <th className="users-stylized-th">Nom </th>
                <th className="users-stylized-th">Email</th>
                <th className="users-stylized-th">Statut</th>
                <th className="users-stylized-th">Action</th>
              </tr>
            </thead>
            <tbody>{showUsersList()}</tbody>
          </table>
          {lastPage !== 1 && users && !!users.length && (
            <div className="pagination">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(1)}
              >
                Première page
              </button>
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Page précédente
              </button>
              {currentPage}/{lastPage}
              <button
                type="button"
                disabled={currentPage === lastPage}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Page suivante
              </button>
              <button
                type="button"
                disabled={currentPage === lastPage}
                onClick={() => setCurrentPage(lastPage)}
              >
                Dernière page
              </button>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default Users;
