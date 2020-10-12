import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import propsInterface from './index.interface';
import routes from '../../Router/routes';
import './index.style.scss';

const Layout: React.FC<propsInterface> = (props: propsInterface) => {
  return (
    <div className='container'>
      <Navbar
        location={props.location}
        availableRoutes={routes}
      />
      <div className='layout_page_container'>
        {props.children}
      </div>
      <Footer/> 
    </div>
  )
}

export default Layout;