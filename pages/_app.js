
import '../styles/css/contact.css';
import '../styles/css/detail.css';
import '../styles/css/index.css';
import '../styles/css/profile.css';
import '../styles/layout/grid.css';
import '../styles/responsive/profile.css';
import '../styles/responsive/responsive.css';


import React from 'react'
import Layout from './layout/layout';
import { Provider } from 'react-redux';
import { wrapper } from '../redux/store';



function MyApp({ Component, ...rest }) {

  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (<Provider store={store}>
    
     <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
     
    </Provider>)
}



export default wrapper.withRedux(MyApp);
