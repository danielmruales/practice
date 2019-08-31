import React, { Component } from "react";
import axios from "axios";
// import Navbar from '../Navbar/Navbar.js'
import TextField from './inputs/TextField.js';
import "./ReactTab.css";

class ReactTab extends Component {
  constructor() {
    super();
    this.state = {
      coachId: 354,
      newLeadInfo: {
        givenName: "",
        familyName: "",
        email: "",
        phone: "",
        campaignId: 0
      },
      uploadFile: null,
      isSubmitted: false,
      fileReader: null
    };
  }

  componentDidMount() {
    // TODO: remove this once form is initialized from widget in Clickfunnels
    // Comment out the below funtion if you want to test form without having a file picker
    this.initializeForm(354, 0, {
      title: "resume-upload",
      label: "Resume Upload",
      required: true
    });
  }

  // TODO: initialize form from Clickfunnels widget
  initializeForm = (coachId, campaignId, uploadFile) => {
    const newState = this.state;
    newState.coachId = coachId;
    newState.newLeadInfo.campaignId = campaignId;
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
      }).then(response => {
        console.log("upload", response);
        console.log("access url", this.state.uploadFile.accessUrl);
      });
    }
    axios
      .post(
        `https://stage.api.soar.com/v1/CRM/Lead/${this.state.coachId}`,
        this.state.newLeadInfo
      )
      .then(res => {
        console.log("success:", res);
      })
      .catch(e => {
        // TODO: handle error
        console.log(e);
      });
  };

  getFileUrl = async () => {
    await axios
      .get(
        `https://stage.api.soar.com/v1/Asset/upload/${this.state.uploadFile.title}.${this.state.uploadFile.type}`
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
        // TODO: handle error
        console.log(e);
      });
  };

  handleChange = e => {
    const newState = this.state;
    newState.newLeadInfo[e.target.name] = e.target.value;
    this.setState(newState);
  };

  onSelectFile = e => {
    const newState = this.state;
    const data = e.target.files[0];
    newState.uploadFile.value = data.name;
    newState.uploadFile.data = data;
    const blob = data.name.split(".");
    newState.uploadFile.type = blob[blob.length - 1];
  };

  handleSubmit = e => {
    e.preventDefault();
    // TODO: form validation to make sure we have all the data we need
    this.postLeadInfo();
    const newState = this.state;
    newState.isSubmitted = true;
    this.setState(newState);
  };

  render() {
    console.log(this.state);

    if (!this.state.isSubmitted) {
      return (
        <div>
          <div className="formDiv">
            <form className="mainForm" onSubmit={this.handleSubmit}>
              <TextField
                type="text"
                label="First Name"
                name="givenName"
                value={this.state.newLeadInfo.givenName}
                handleChange={this.handleChange}
                required={ true }
              />
              <TextField
                type="text"
                label="Last Name"
                name="familyName"
                value={this.state.newLeadInfo.familyName}
                handleChange={this.handleChange}
                required={ true }
              />
              <TextField
                type="email"
                label="Email"
                name="email"
                value={this.state.newLeadInfo.email}
                handleChange={this.handleChange}
                required={ true }
              />
              <TextField
                type="tel"
                label="Phone Number"
                name="phone"
                value={this.state.newLeadInfo.phone}
                handleChange={this.handleChange}
                required={ false }
              />
              <input
                type="file"
                ref="resumeUpload"
                name="resumeUpload"
                accept=".pdf, .doc, .docx"
                onChange={this.onSelectFile}
                required={this.state.uploadFile ? this.state.uploadFile.required : false}
                style={{
                  display: this.state.uploadFile ? '' : 'none'
                }}
              />
              <button>Submit!</button>
            </form>
          </div>
        </div>
      );
    }
    return <div>Thank You</div>;
  }
}

export default ReactTab;
