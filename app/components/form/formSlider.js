import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import QTipPopup from '../common/qtipPopup';

var FormSlider = React.createClass({
  getInitialState() {
    return {
      value: this.props.options.defaultValue,
      sliderText:this.props.options.defaultValue.toFixed(1)

    };
  },


  handleChangeValue(newValue) {
    this.setState({
      value: newValue,
      sliderText:newValue.toFixed(1)
    });
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
                  value={this.state.value}
                  onChange={this.handleChangeValue}/>

            </div>
            <div className=" column">

              {options.maxName}
            </div>

            <div className=" two wide column">
              <div className="ui blue basic label">{this.state.sliderText}</div>


            </div>
          </div>
        </div>


    );
  }
});

export default FormSlider;