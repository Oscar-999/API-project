import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (<div className='nav-wrap'>
    <ul className='nav-bar'>
      <li className='home'>
        <NavLink exact to="/">
       
          MultiverseBnb
          </NavLink>
      </li>
      {isLoaded && (
        <li className='profile-button'>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
    </div>
  );
}

export default Navigation;
