import React from "react";
import "./index.style.scss";
import { routeData } from "../Layout/index.interface";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Button from '../../Button';

interface propsType {
  route: routeData;
  history: {
    push(url: string): void;
  };
}

const Footer: React.FunctionComponent<propsType & RouteComponentProps> = (
  props
) => {
  let footer = <> </>;
  if (props.route.footerActions.length) {
    footer = (
      <div className="footer_container">
        <div style={{ margin: "auto", display: 'flex', flexDirection: 'row' }}>
          {props.route.footerActions.map((item, index) => {
            return (
              <div
                className='actions'
                key={`${index}-${props.route.title}`}>
                <Button 
                  content={item.title}
                  onClick={() => props.history.push(item.action)}
                  buttonType='back'
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return footer;
};

export default withRouter(Footer);
