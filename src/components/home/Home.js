import React from 'react';
import { Link } from 'react-router-dom';
import { MdAssignmentInd, MdAssignment } from 'react-icons/md';
import './home.css';

const Home = () => {
  return (
    <div className='bodyContainer'>
      <img src='./Logo_LAM_T2V.png' alt='LAM' />

      <nav>
        <ul>
          <li>
            <Link to='/signIn'>
              <MdAssignmentInd size={150} color='black' />
              <br />
              S'identifier
            </Link>
          </li>
          <li>
            <Link to='/signUp'>
              <MdAssignment size={150} color='black' />
              <br />
              S'enregistrer
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
