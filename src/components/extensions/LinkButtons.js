import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const LinkButtons = ({ buttonText, buttonStyle, link }) => (
  <Fragment>
    <Link>
      <Button variant="contained" color="primary" >
        {buttonText}
      </Button>
    </Link>
  </Fragment>
);

LinkButtons.propTypes = {
  buttonText: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  buttonStyle: PropTypes.object.isRequired,
  link: PropTypes.string,
};

LinkButtons.defaultProps = {
  link: '/',
  buttonText: 'Default Button Text',
};

export default LinkButtons;