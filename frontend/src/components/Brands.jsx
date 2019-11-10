import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Brand from './Brand';


const Brands = ({ brands }) => (
  <div>
    {brands.map((brand) => (
      <Brand key={brand.id} brand={brand} />
    ))}
  </div>
);

const mapStateToProps = ({ brands }) => ({
  brands,
});
export default connect(mapStateToProps)(Brands);
