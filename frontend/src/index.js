import React from 'react';
import { hydrate } from 'react-dom';
import AppProvider from './AppProvider';

hydrate(<AppProvider />, document.getElementById('app'));
