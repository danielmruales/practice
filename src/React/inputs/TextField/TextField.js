import React, { Component } from "react";
import "./TextField.css";
import {
  emailIsValid,
  phoneNumberIsValid,
} from '../validation/validation';

class TextField extends Component {

  constructor() {
    super();
    this.state = {
      hasFocused: false,
    };
  }

  componentDidMount() {
    this.props.registerTextField({
      id: this.props.name,
      isValid: this.isValid()
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.props.registerTextField({
        id: this.props.name,
        isValid: this.isValid()
      })
    }
  }

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

  textFieldClass = () => {
    const isValid = this.isValid()
    const hasFocused = this.state.hasFocused
    if (hasFocused) {
      if (isValid) return 'text-field'
      return 'text-field invalid'
    }
    if (!this.props.value) {
      return 'text-field'
    }
    if (isValid) return 'text-field'
    return 'text-field invalid'
  }

  label = () => {
    if (this.props.required) {
      return `*${this.props.label}`
    }
    return this.props.label
  }

  render() {
    return (
      <div className="text-input-bounds">
        <div className="label">
          { this.label() }
        </div>
        <input
          className={ this.textFieldClass() }
          placeholder={`Enter ${this.props.label.toLowerCase()}`}
          type={this.props.type}
          name={this.props.name}
          ref={this.props.name}
          value={this.props.value}
          onChange={this.props.handleChange}
          required={this.props.required}
          onFocus={ () => this.setState({ hasFocused: true }) }
        />
      </div>
    )
  }
}

export default TextField;
