import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import QTipPopup from '../common/qtipPopup';

var FormSlider = React.createClass({

  handleChangeValue(newValue) {
    this.props.onChange(newValue);
  },


  render() {
    var { options,...other} = this.props;
    return (
        <div className="wrapper">
          <div className="ui grid">

            <div className="two wide column">
              {options.sliderName}
              <QTipPopup content={options.qtip.content} title={options.qtip.title}/>
            </div>
            <div className="column">
              {options.minName}
            </div>
            <div className=" five wide column">
              <Slider
                  min={options.minValue}
                  max={options.maxValue}
                  step={options.step}
                  value={options.defaultValue}
                  onChange={this.handleChangeValue}/>

            </div>
            <div className=" column">

              {options.maxName}
            </div>

            <div className=" two wide column">
              <div className="ui blue basic label">{options.defaultValue.toFixed(2)}</div>


            </div>
          </div>
        </div>


    );
  }
});

export default FormSlider;
