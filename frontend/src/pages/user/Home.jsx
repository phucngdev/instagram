import React from "react";
import Suggest from "../../layouts/user/Suggest";
import { Helmet } from "react-helmet";
import NewFeed from "../../components/user/home/NewFeed";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Instagram</title>
      </Helmet>
      <NewFeed />
      <Suggest />
    </>
  );
};

export default Home;
