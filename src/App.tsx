import { Layout } from '@/components'
import { Catalog } from '@/pages'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import {persistor, store} from "@/redux/store.ts";
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <Layout>
                  <Catalog/>
              </Layout>
          </PersistGate>
      </Provider>
  </React.StrictMode>
)
