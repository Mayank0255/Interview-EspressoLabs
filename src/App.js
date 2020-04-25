import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'

import './App.css';

import InvoiceViewer from "./components/InvoiceViewer/InvoiceViewer.component";

const App = () => {


  return (
      <Provider store={store}>
          <div className="App">
              <InvoiceViewer/>
          </div>
      </Provider>
  );
};

export default App;
