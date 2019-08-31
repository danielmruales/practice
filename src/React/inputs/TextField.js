import React, { Component } from "react";
import "./TextField.css";
import {
  emailIsValid,
  phoneNumberIsValid,
} from './validation/validation';

class TextField extends Component {

  isValid = () => {
    const meetsValidRequirements = this.props.value.length > 0
    switch (this.props.type) {
      case 'text':
        if (this.props.required) {
          return meetsValidRequirements
        }
        return true
      case 'email':
        if (this.props.required) {
          return emailIsValid(this.props.value) && meetsValidRequirements
        }
        if (this.props.value) {
          return emailIsValid(this.props.value)
        }
        return true
      case 'tel':
        if (this.props.required) {
          return phoneNumberIsValid(this.props.value) && meetsValidRequirements
        }
        if (this.props.value) {
          return phoneNumberIsValid(this.props.value)
        }
        return true
      default:
        throw new Error(`TextField:: isValid: type ${this.props.type} not handled`)
    }
  }

  render() {
    return (
      <div className="text-input-bounds">
        <div className="label">
          { this.props.label }
        </div>
        <input
          className={ this.isValid() ? 'text-field' : 'text-field invalid' }
          placeholder={`Enter ${this.props.label.toLowerCase()}`}
          type={this.props.type}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.handleChange}
          required={this.props.required}
        />
      </div>
    )
  }
}

export default TextField;
