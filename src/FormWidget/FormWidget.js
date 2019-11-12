import React, { Component } from "react";
import axios from "axios";
import TextField from './inputs/TextField/TextField.js';
import FilePicker from './inputs/FilePicker/FilePicker.js';
import "./FormWidget.css";

class FormWidget extends Component {
  constructor() {
    super();
    this.state = {
      coachId: 6512, // Dummy ID, this is Ryan Bliss' coachId
      newLeadInfo: {
        givenName: "",
        familyName: "",
        email: "",
        phone: "",
        campaignId: 0
      },

      //Potentially need to replace the above object with this one below?
    //   leadSource : {
    //     type : "campaign",
    //    label : "Test campaign",
    //    data : ""
    // },
      theme: 'light',
      uploadFile: null,
      isLoading: false,
      isSubmitted: false,
      fileReader: null,
      buttonText: 'Submit',
      fieldContainers: [],
      errorMessage: '',
    };
  }

  getUrlVars = () => {
    var vars = {};
    // eslint-disable-next-line no-unused-vars
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
  }
  getDecodedUrlParam = (param) => {
    const urlVar = this.getUrlVars()[param]
    return urlVar ? decodeURIComponent(urlVar) : null
  }
  componentDidMount() {
    const coachId = this.getDecodedUrlParam('coachid');
    const campaignId = this.getDecodedUrlParam('campaignid');
    const submitButtonText = this.getDecodedUrlParam('submittext');
    const linkTitle = this.getDecodedUrlParam('linktitle');
    const linkLabel = this.getDecodedUrlParam('linklabel');
    const linkRequired = this.getDecodedUrlParam('linkrequired');
    const theme = this.getDecodedUrlParam('theme');
    const linkObj = linkTitle
      ? {
        title: linkTitle,
        label: linkLabel,
        required: linkRequired === 'true',
      }
      : null;
    this.initializeForm(coachId, campaignId, submitButtonText, theme, linkObj);
  }

  initializeForm = (coachId, campaignId, buttonText, theme, uploadFile) => {
    const newState = this.state;
    if (coachId) {
      newState.coachId = coachId;
    }
    if (campaignId) {
      newState.newLeadInfo.campaignId = campaignId;
    }
    if (buttonText) {
      newState.buttonText = buttonText;
    }
    if (theme) {
      newState.theme = theme;
    }
    if (uploadFile !== null) {
      uploadFile.data = "";
      newState.uploadFile = uploadFile;
    }
    this.setState(newState);
  };

  postLeadInfo = async newLeadInfo => {
    if (this.state.uploadFile && this.state.uploadFile.data) {
      await this.getFileUrl();
      await axios({
        method: "put",
        url: this.state.uploadFile.putUrl,
        data: this.state.uploadFile.data,
        headers: { "content-type": "binary/octet-stream" }
      })
      .catch(e => {
        console.log(e)
        this.setState({errorMessage: 'Error uploading file. Please try again.', isLoading: false})
      });
    }
    axios
      .post(
        `https://api.soar.com/v1/CRM/Lead/${this.state.coachId}`,
        this.state.newLeadInfo
      )
      .then(res => {
        this.setState({ isSubmitted: true });
      })
      .catch(e => {
        console.log(e);
        this.setState({errorMessage: 'Error submitting form. Please try again.', isLoading: false})
      });
  };

  getFileUrl = async () => {
    await axios
      .get(
        `https://api.soar.com/v1/Asset/upload/${this.state.uploadFile.title}.${this.state.uploadFile.type}`
      )
      .then(res => {
        console.log("success:", res);
        const newState = this.state;
        newState.uploadFile.putUrl = res.data.putUrl;
        newState.uploadFile.accessUrl = res.data.accessUrl;
        newState.newLeadInfo.uploadUrls = [
          {
            label: newState.uploadFile.label,
            url: newState.uploadFile.accessUrl,
          },
        ]
        this.setState(newState);
      })
      .catch(e => {
        console.log(e);
        this.setState({errorMessage: 'Error getting a file URL. Upload will not be possible. Please try again.', isLoading: false})
      });
  };

  formIsValid = () => {
    return this.state.fieldContainers
      .every(val => val.isValid === true)
  }

  registerTextField = fieldContainer => {
    const newFieldContainers = this.state.fieldContainers
    const releventIndex = newFieldContainers.findIndex(val => val.id === fieldContainer.id)
    if (releventIndex >= 0) {
      newFieldContainers.splice(releventIndex, 1, fieldContainer)
    } else {
      newFieldContainers.push(fieldContainer)
    }
    this.setState({ fieldContainers: newFieldContainers })
  }

  handleChange = e => {
    const newState = this.state
    newState.newLeadInfo[e.target.name] = e.target.value
    this.setState(newState)
  };

  onSelectFile = e => {
    const uploadFile = this.state.uploadFile
    const data = e.target.files[0]
    if (data) {
      uploadFile.value = data.name
      uploadFile.data = data
      const blob = data.name.split(".")
      uploadFile.type = blob[blob.length - 1]
      this.setState({ uploadFile })
    } else {
      uploadFile.value = null
      uploadFile.data = null
      uploadFile.type = null
    }
    this.setState({ uploadFile })
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.formIsValid() && !this.state.isLoading) {
      this.setState({isLoading: true});
      if (this.state.newLeadInfo.campaignId > 0) {
        this.postLeadInfo();
      } else {
        this.setState({ isSubmitted: true });
      }
    }

  };

  render() {
    console.log(this.state);
    if (!this.state.isSubmitted) {
      return (
        <div>
          <div className="formDiv">
            <form className={`mainForm ${this.state.theme}`} onSubmit={this.handleSubmit}>
              <TextField
                type="text"
                label="First Name"
                name="givenName"
                value={this.state.newLeadInfo.givenName}
                handleChange={this.handleChange}
                registerTextField={this.registerTextField}
                required={ true }
              />
              <TextField
                type="text"
                label="Last Name"
                name="familyName"
                value={this.state.newLeadInfo.familyName}
                handleChange={this.handleChange}
                registerTextField={this.registerTextField}
                required={ true }
              />
              <TextField
                type="email"
                label="Email"
                name="email"
                value={this.state.newLeadInfo.email}
                handleChange={this.handleChange}
                registerTextField={this.registerTextField}
                required={ true }
              />
              <TextField
                type="tel"
                label="Phone Number"
                name="phone"
                value={this.state.newLeadInfo.phone}
                handleChange={this.handleChange}
                registerTextField={this.registerTextField}
                required={ false }
              />
              <div
                style={{
                  display: this.state.uploadFile ? '' : 'none'
                }}
              >
                <FilePicker
                  label={this.state.uploadFile ? this.state.uploadFile.label : ''}
                  value={this.state.uploadFile ? this.state.uploadFile.value : ''}
                  name="resumeUpload"
                  accept=".pdf, .doc, .docx"
                  handleChange={this.onSelectFile}
                  required={this.state.uploadFile ? this.state.uploadFile.required : false}
                  registerTextField={this.registerTextField}
                />
              </div>
              <div>
                <div
                  className="error-message"
                  style={{
                    display: this.state.errorMessage ? '' : 'none'
                  }}
                >
                  {this.state.errorMessage}
                </div>
                <button
                  className={this.formIsValid() ? 'button' : 'button disabled'}
                  style={{
                    display: !this.state.isLoading ? '' : 'none'
                  }}
                >{this.state.buttonText}</button>
              </div>
            </form>
          </div>
        </div>
      );
    }
    return <div className="thank-you">Thanks! A coach will contact you shortly with more information.</div>
  }
}

export default FormWidget;
