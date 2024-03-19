import React from 'react';

import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

export type LinkProps = MuiLinkProps;

const Link: React.FC<LinkProps> = (props) => {
  return <MuiLink {...props}>{props.children}</MuiLink>;
};

export default Link;
