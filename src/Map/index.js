import React, { Component, Fragment } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import PropTypes from "prop-types";

import { getStyleMap } from "./constants";
import { formatNumberDecimal } from "./utils";
import "./styles.css";

class Map extends Component {
  state = { zoom: 2 };

  handleZoomChange = (zoom) => this.setState({ zoom });

  handleZoomIn = () => this.handleZoomChange(this.state.zoom + 0.5);

  handleZoomOut = () => this.handleZoomChange(this.state.zoom - 0.5);

  handleResetZoom = () => this.setState({ zoom: 2 });

  render() {
    const { width, height, center, scale, currency, map } = this.props.data;
    return (
      <Fragment>
        <div className="buttonContainer">
          <button className="button" onClick={this.handleZoomIn}>
            +
          </button>
          <button className="button" onClick={this.handleZoomOut}>
            -
          </button>
        </div>
        <button className="button" onClick={this.handleResetZoom}>
          Reset
        </button>
        <hr />
        <ComposableMap
          projectionConfig={{ scale }}
          width={width}
          height={height}
        >
          <ZoomableGroup zoom={this.state.zoom} center={center}>
            <Geographies geography={map}>
              {(geographies, projection) =>
                geographies.map((geography) => {
                  const geographyValue = `${currency} ${formatNumberDecimal(
                    geography.properties.NAME_0
                  )}`;
                  const stylesMap = getStyleMap(geography.properties.COLOR);
                  return (
                    <Geography
                      key={geographyValue}
                      data-tip={`${geography.properties.NAME} ${geographyValue}`}
                      geography={geography}
                      projection={projection}
                      precision={0.5}
                      style={{
                        default: stylesMap.default,
                        hover: stylesMap.hover,
                        pressed: stylesMap.pressed,
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        <ReactTooltip />
      </Fragment>
    );
  }
}

Map.defaultProps = {
  width: 600,
  height: 500,
  center: 0,
  scale: 350,
  zoom: 0,
  currency: "",
};

Map.propTypes = {
  data: PropTypes.object,
};

export default Map;
