import React from "react";
import "./index.style.scss";
import { routeData } from "../Layout/index.interface";
import { RouteComponentProps, withRouter } from "react-router-dom";

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
        <div style={{ margin: "auto" }}>
          {props.route.footerActions.map((item, index) => {
            return (
              <button
                key={`${index}-${props.route.title}`}
                onClick={() => props.history.push(item.action)}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return footer;
};

export default withRouter(Footer);
