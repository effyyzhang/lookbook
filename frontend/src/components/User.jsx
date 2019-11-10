import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const User = () => (
  <h1>User</h1>
);


const mapStateToProps = ({ brands }) => ({
  brands,
});
export default connect(mapStateToProps)(User);
