import React from 'react';
import { Link } from 'react-router-dom';
import { MdAssignmentInd, MdAssignment } from 'react-icons/md';
import './home.css';

const Home = () => {
  return (
    <body>
      <div className='bodyContainer'>
        <nav>
          <ul>
            <li>
              <Link to='/singIn'>
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
    </body>
  );
};

export default Home;
