import React, { useEffect, useState } from "react";
import { Widget } from "near-social-vm";
import { useParams } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { useHashRouterLegacy } from "../hooks/useHashRouterLegacy";

export default function ViewPage(props) {
  useHashRouterLegacy();

  const { widgetSrc } = useParams();
  const query = useQuery();
  const [widgetProps, setWidgetProps] = useState({});

  const src =
    widgetSrc || window?.InjectedConfig?.defaultWidget || props.widgets.default;
  const showMenu = !window?.InjectedConfig?.hideMenu;
  const setWidgetSrc = props.setWidgetSrc;
  const viewSourceWidget = props.widgets.viewSource;

  useEffect(() => {
    setWidgetProps(Object.fromEntries([...query.entries()]));
  }, [query]);

  useEffect(() => {
    setTimeout(() => {
      setWidgetSrc(
        src === viewSourceWidget && query.get("src")
          ? {
              edit: query.get("src"),
              view: null,
            }
          : {
              edit: src,
              view: src,
            }
      );
    }, 1);
  }, [src, query, setWidgetSrc, viewSourceWidget]);

  return !showMenu ? (
    <div>
      <div className="row">
        <div
          className="position-relative"
          // style={{
          //   "--body-top-padding": "24px",
          //   paddingTop: "var(--body-top-padding)",
          // }}
        >
          <Widget
            key={src}
            src={src}
            props={{ ...widgetProps, isGateway: true }}
          />
        </div>
      </div>
    </div>
  ) : (
    <Widget key={src} src={src} props={{ ...widgetProps, isGateway: true }} />
  );
}
