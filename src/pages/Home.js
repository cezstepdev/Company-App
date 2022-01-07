import React from "react";
import axios from "axios";
import {Settings} from "../components/settings/Settings";

const Home = () => {

    const config = {
      headers: {
          Authorization: localStorage.getItem('token')
      }
    };

    axios.get('https://company-manager-api.herokuapp.com/api/v1/user/' + localStorage.getItem('username'), config)
        .then(
            res =>
            {
                localStorage.setItem('user', JSON.stringify(res.data));
            });

    return (
        <div>
            <Settings/>
        </div>
    );
};

export default Home;