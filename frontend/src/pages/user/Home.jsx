import React from "react";
import Suggest from "../../layouts/user/Suggest";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Instagram</title>
      </Helmet>
      <Suggest />
    </>
  );
};

export default Home;
