import React from 'react';

import logo from '@common/assets/logo.svg';
import { config } from '@common/config';

export function HistoryPage(): JSX.Element {
  return (
    <div className="wrapper">
      <h2>History page</h2>
      <h3>SASS</h3>
      <img src={logo} width={48} height={48} />
      <center>{config.someKey}</center>
    </div>
  );
}
