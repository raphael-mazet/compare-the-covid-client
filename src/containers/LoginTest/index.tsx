import React from "react";
import './index.style.scss';


const LoginTest = (): JSX.Element  => {

return(
<form>
  
  <div className="segment">
    <h1>Sign up</h1>
  </div>
  
  <label>
    <input type="text" placeholder="Email Address"/>
  </label>
  <label>
    <input type="password" placeholder="Password"/>
  </label>
  <button className="red" type="button"><i className="icon ion-md-lock"></i> Log in</button>
  
  <div className="segment">
    <button className="unit" type="button"><i className="icon ion-md-arrow-back"></i></button>
    <button className="unit" type="button"><i className="icon ion-md-bookmark"></i></button>
    <button className="unit" type="button"><i className="icon ion-md-settings"></i></button>
  </div>
  
  <div className="input-group">
    <label>
      <input type="text" placeholder="Email Address"/>
    </label>
    <button className="unit" type="button"><i className="icon ion-md-search"></i></button>
  </div>
  
</form>
)}

export default LoginTest;
