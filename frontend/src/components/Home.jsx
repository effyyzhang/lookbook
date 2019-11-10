import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Brands from './Brands';


const Home = ({ brands }) => (
  <div>
    <h1>Home</h1>
    <Brands />
  </div>
);

const mapStateToProps = ({ brands }) => ({
  brands,
});
export default connect(mapStateToProps)(Home);
