import React from "react";
import Suggest from "../../layouts/user/Suggest";
import { Helmet } from "react-helmet";
import NewFeed from "../../components/user/post/newfeed/NewFeed";

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
