import React from 'react';

import logo from '@common/assets/logo.svg';
import { config } from '@common/config';

export function OptionsPage(): JSX.Element {
  return (
    <>
      <h2>Options page</h2>
      <h3>CSS</h3>
      <img src={logo} width={48} height={48} />
      <center>{config.someKey}</center>
    </>
  );
}
