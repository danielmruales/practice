import React, { Component } from "react";
import "./FilePicker.css";

class FilePicker extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value || prevProps.required !== this.props.required) {
      this.props.registerTextField({
        id: this.props.name,
        isValid: this.isValid()
      })
    }
  }

  isValid = () => {
    if (this.props.required) {
      if (!this.props.value) return false
    }
    return true
  }

  label = () => {
    if (this.props.required) {
      return `*${this.props.label}`
    }
    return this.props.label
  }

  render() {
    return (
      <div>
        <div className="label">
          { this.label() }
        </div>
        <input
          className="filePicker"
          type="file"
          ref={this.props.ref}
          name={this.props.name}
          accept={this.props.accept}
          onChange={this.props.handleChange}
          required={this.props.required}
        />
      </div>
    )
  }
}

export default FilePicker;
