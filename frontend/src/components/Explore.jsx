import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Brands from './Brands';


const Explore = ({ brands }) => (
  <div>
    <h1>Explore</h1>
    <Brands />
  </div>
);

const mapStateToProps = ({ brands }) => ({
  brands,
});
export default connect(mapStateToProps)(Explore);
