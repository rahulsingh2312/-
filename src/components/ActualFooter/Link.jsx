import React from 'react';

const Link = ({ name, url }) => (
  <a href={url} className="poppins-bold text-white  underline">
    {name}
  </a>
);

export default Link;