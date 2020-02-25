import React from 'react';
import PropTypes from 'prop-types';

const EventHeader = props => (
  <div>
    <h1 className="eventlist_title">{props.date}</h1>
  </div>
);

EventHeader.propType = {
  date: PropTypes.string.isRequired,
  textStyle: PropTypes.object,
  viewStyle: PropTypes.object,
};

export default EventHeader;