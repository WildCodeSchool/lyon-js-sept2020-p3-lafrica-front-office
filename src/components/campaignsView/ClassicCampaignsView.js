/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useState } from 'react';
import './CampaignsView.scss';
import queryString from 'query-string';
import { useForm } from 'react-hook-form';
import { FaMicrophone } from 'react-icons/fa';
import { GoMegaphone } from 'react-icons/go';
import { BiEdit, BiSearchAlt2 } from 'react-icons/bi';
// import { useHistory, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';
import CampaignsChart from '../CampaignsChart/CampaignsChart';

import API from '../../services/API';
import { UserContext } from '../../context/UserContext';

const CampaignsView = () => {
  moment.locale('fr');

  const { register, handleSubmit } = useForm();

  const history = useHistory();

  const {
    userDetails,
    setUserDetails,
    setLoggedIn,
    campaignsList,
    setCampaignsList,
  } = useContext(UserContext);
  const [campaignId, setCampaignId] = useState();

  const [totalCampaigns, setTotalCampaigns] = useState();

  const searchParams = {
    limit: 10,
    offset: 0,
    name: undefined,
    ...queryString.parse(window.location.search),
  };

  const { limit, offset, name, sortby } = searchParams;

  useEffect(() => {
    const clientQueryParams = queryString.stringify(searchParams);

    if (userDetails) {
      API.get(`/users/${userDetails.id}/campaigns?${clientQueryParams},`)
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
  }, [userDetails, limit, offset, name, sortby]);

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

  const createCampaignInDatabase = async () => {
    await API.post(`/users/${userDetails.id}/campaigns`).then((res) => {
      setCampaignId(res.data.campaign_id);
    });
  };

  useEffect(() => {
    if (campaignId) {
      history.push(`/campaigns/create/${campaignId}`);
    }
  }, [campaignId]);

  return (
    <div className="compaigns-view-container">
      <article className="campaings-editor-view-container">
        <div className="campaigns-editor-view">
          <div className="title">
            <FaMicrophone className="microphone-icon" />
            <h2>NOS SOLUTIONS DE VOCALISATION</h2>
          </div>
          <div className="btn-container">
            <div
              className="megaphone"
              onClick={createCampaignInDatabase}
              type="button"
              onKeyPress={() => {}}
              role="button"
              tabIndex="0"
            >
              <GoMegaphone className="btn-icon" />

              {/* <Link to={`/campaigns/${campaignId}`}>
              </Link>
              <Link
                to={`/campaigns/${campaignId}`}
                onClick={createCampaignInDatabase}
              > */}
              <h3>Créer une campagne</h3>
              {/* </Link> */}
            </div>
            <div className="edit">
              <BiEdit className="btn-icon" />
              <h3>Editer / ré-utiliser une campagne </h3>
            </div>
          </div>
        </div>
      </article>
      <article>
        <div className="campaigns-list">
          <div className="campaigns-list-table">
            {/* <div className="campaigns-list-table-options"></div> */}
            <table>
              <thead>
                <tr>
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th />
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
                  <th className="stylized-th">Nom</th>
                  <th className="stylized-th">Date d'envoi </th>
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
          <div className="campaigns-chart">
            <CampaignsChart />
          </div>
        </div>
      </article>
    </div>
  );
};

export default CampaignsView;
