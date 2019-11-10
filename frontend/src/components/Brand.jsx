import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Brand = ({ brand }) => (
  <Link to={`/brands/${brand.id}`}>
    <p>{brand.name}</p>
  </Link>
);

export default Brand;
