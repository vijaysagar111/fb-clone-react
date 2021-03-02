import React,{useEffect, useState} from 'react'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'
import FlagIcon from '@material-ui/icons/Flag'
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined'
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import { Avatar, IconButton } from '@material-ui/core'
import {Link} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import ForumIcon from '@material-ui/icons/Forum'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'

import './Nav.css'
import axios from 'axios';


function Header({logOut}) {
    const [user, setUser] = useState();
    function getData(){
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/current_user`)
      .then(function (response) {
        if (response.data.error) {
          setUser({ user: response.data })
        } else {
          setUser(response.data.firstname)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    useEffect(()=>{
        getData();

    },[])
    
    return (
        <div className = "header">
             <div className = "header_left">
                <img src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512" alt="facebook_logo"/>
             </div>

             <div className = "header_input">
                 <SearchIcon />
                <input type="text" placeholder="Search Facebook" type = "text"/>
             </div>

             <div className="header__center">
                <div className="header__option header__option--active">
                    <Link to="/timeline"><HomeIcon fontsize='large' /></Link>
                </div>
                <div className="header__option">
                    <FlagIcon fontsize='large' />
                </div>
                <div className="header__option">
                    <SubscriptionsOutlinedIcon fontsize='large' />
                </div>
                <div className="header__option">
                    <StorefrontOutlinedIcon fontsize='large' />
                </div>
                <div className="header__option">
                    <SupervisedUserCircleIcon fontsize='large' />
                </div>
            </div>

            <div className="header__right">
                <div className="header__info">
                    <Link to="/profile"><Avatar  /></Link>
                    <h4>{user}</h4>
                </div>

                <IconButton>
                    <AddIcon />
                </IconButton>

                <IconButton>
                    <ForumIcon />
                </IconButton>

                <IconButton>
                    <NotificationsActiveIcon />
                </IconButton>

                <IconButton>
                    <a onClick={logOut}>Logout</a>
                </IconButton>
            </div>
        </div>
    )
}

export default Header
