import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ApolloProvider } from '@apollo/client';
import client from './apollo/apolloClient';
import { Chart } from './components';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
      <Chart />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(console.log);
