/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useState } from 'react';
import queryString from 'query-string';
import { useForm } from 'react-hook-form';
import './CampaignsView.scss';
import { FaMicrophone } from 'react-icons/fa';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';

import API from '../../services/API';

import { UserContext } from '../../context/UserContext';

const CampaignsView = () => {
  moment.locale('fr');

  const history = useHistory();

  const { register, handleSubmit } = useForm();

  const {
    userDetails,
    setUserDetails,
    setLoggedIn,
    campaignsList,
    setCampaignsList,
  } = useContext(UserContext);

  const [totalCampaigns, setTotalCampaigns] = useState();

  const searchParams = {
    limit: 10,
    offset: 0,
    name: undefined,
    firstname: undefined,
    lastname: undefined,
    ...queryString.parse(window.location.search),
  };

  const { limit, offset, name, sortby, firstname, lastname } = searchParams;

  const currentPage = offset / limit + 1;
  const lastPage = Math.ceil(totalCampaigns / limit);

  const updateSearchUrl = (params) => {
    const clientQueryParams = queryString.stringify(params);
    history.push(`/?${clientQueryParams}`);
  };

  const setCurrentPage = (pageNum) => {
    updateSearchUrl({
      ...searchParams,
      offset: parseInt(limit, 10) * (pageNum - 1),
    });
  };

  useEffect(() => {
    const clientQueryParams = queryString.stringify(searchParams);

    if (userDetails) {
      API.get(`/users/${userDetails.id}/campaigns?${clientQueryParams}`)
        .then((res) => {
          setCampaignsList(res.data.campaigns);
          setTotalCampaigns(res.data.total);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setLoggedIn(false);
            setUserDetails({});
            history.push('/signin');
          }
        });
    }
  }, [userDetails, limit, offset, name, sortby, firstname, lastname]);

  const showCampaignsList = () => {
    return campaignsList.map((campaign) => {
      return (
        <tr key={campaign.id}>
          <td className="no-border">
            <BiSearchAlt2
              className="search-icon"
              onClick={() => history.push(`/campaigns/${campaign.id}`)}
            />
          </td>
          <td className="stylized-td">{campaign.firstname}</td>
          <td className="stylized-td">{campaign.lastname}</td>
          <td className="stylized-td">{campaign.name || 'Ma campagne'}</td>
          <td className="stylized-td">
            {campaign.date && moment(campaign.date).format('DD/MM/YYYY HH:mm')}
          </td>
          <td className="stylized-td">
            {campaign.sending_status === 2 ? (
              <div className="cell-campaign-status">
                <span className="status finished-status" />
                <p>Envoyée</p>
              </div>
            ) : campaign.sending_status === 1 ? (
              <div className="cell-campaign-status">
                <span className="status in-progress-status" />
                <p>En attente</p>
              </div>
            ) : (
              <div className="cell-campaign-status">
                <span className="status in-creation-status" />
                <p>En création</p>
              </div>
            )}
          </td>
          <td className="same-width-than-search-icon no-border" />
        </tr>
      );
    });
  };

  return (
    <div className="compaigns-view-container">
      <article className="campaings-editor-view-container">
        <div className="campaigns-editor-view">
          <div className="title">
            <FaMicrophone className="microphone-icon" />
            <h2>Liste des Campagnes</h2>
          </div>
        </div>
      </article>
      <article>
        <div className="campaigns-list">
          <table>
            <thead>
              <tr>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th />
                <th>
                  <form className="table-campaign-search">
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

                    {/* <button type="submit">ok</button> */}
                  </form>
                </th>
                <th>
                  <form className="table-campaign-search">
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
                <th>
                  <form className="table-campaign-search">
                    <label htmlFor="name">
                      <input
                        name="name"
                        id="name"
                        type="text"
                        defaultValue={searchParams.name}
                        placeholder="Rechercher une campagne"
                        ref={register}
                      />
                    </label>

                    {/* <button type="submit">ok</button> */}
                  </form>
                </th>
                <th>
                  <form className="table-date-sort">
                    <label htmlFor="sortby">
                      <select
                        name="sortby"
                        id="sortby"
                        ref={register}
                        defaultValue={searchParams.sortby}
                      >
                        <option value="date.asc">Trier par date</option>
                        <option value="date.asc">Croissant</option>
                        <option value="date.desc">Décroissant</option>
                      </select>
                    </label>
                  </form>{' '}
                </th>
                <th>
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
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th />

                <th className="stylized-th">Prénom Client</th>
                <th className="stylized-th">Nom Client</th>
                <th className="stylized-th">Nom Campagne</th>
                <th className="stylized-th">Date d'envoi</th>
                <th className="stylized-th">Statut</th>
              </tr>
            </thead>
            <tbody>{showCampaignsList()}</tbody>
          </table>
          {lastPage !== 1 && !!campaignsList.length && (
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

export default CampaignsView;
