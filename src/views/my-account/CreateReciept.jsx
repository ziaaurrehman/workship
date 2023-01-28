import React, { Component } from 'react'
import * as $ from 'jquery'
import { var_carrier, var_receipt_type } from './constants'

import 'react-image-lightbox/style.css' // This only needs to be imported once in your app
import {
  CCardBody,
  CCol,
  CRow,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CFormSelect,
} from '@coreui/react-pro'

import Accordion from '../base/accordion/Accordion'
import Toast from '../../components/Toast'

let alertStyles = {
  backgroundColor: '#c5da4b',
  boxShadow: '5px 5px 10px #8ebd40',
  padding: '1em',
  zIndex: 100,
  position: 'absolute',
  top: 50,
  right: 50,
  width: '300px',
  textAlign: 'center',
}

class Reciept extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formValues: [{ title: '', quantity: '' }],
      visible: true,
      description: '',
      recipt_type: '',
      carrier: '',
      carrier_name: '',
      tracking_number: '',
      remarks: '',
      showAlert: false,
      alertData: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(i, e) {
    let formValues = this.state.formValues
    formValues[i][e.target.name] = e.target.value
    this.setState({ formValues })
  }

  addFormFields() {
    this.setState({
      formValues: [...this.state.formValues, { title: '', quantity: '' }],
    })
  }

  removeFormFields(i) {
    let formValues = this.state.formValues
    formValues.splice(i, 1)
    this.setState({ formValues })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()

    let detailsData = JSON.stringify(this.state.formValues)
    const addData = {
      description: this.state.description,
      recipt_type: this.state.recipt_type !== ('' || 'Select Type') && this.state.recipt_type,
      carrier: this.state.carrier,
      carrier_name: this.state.carrier_name ? this.state.carrier_name : this.state.carrier,
      tracking_number: this.state.tracking_number,
      remarks: this.state.remarks,
    }

    const formData = new FormData()
    formData.append('description', this.state.description)
    this.state.recipt_type !== ('' || 'Select Type') &&
      formData.append('recipt_type', this.state.recipt_type)
    formData.append('carrier', this.state.carrier)
    formData.append(
      'carrier_name',
      this.state.carrier_name ? this.state.carrier_name : this.state.carrier,
    )
    formData.append('tracking_number', this.state.tracking_number)
    formData.append('remarks', this.state.remarks)
    formData.append('userId', localStorage.getItem('token2'))
    formData.append('detailsData', detailsData)

    if (
      this.state.description === '' ||
      this.state.carrier === '' ||
      this.state.tracking_number === '' ||
      this.state.remarks === ''
    ) {
      console.log('yess')
      console.log(
        ' this.state.description: ',
        this.state.description,
        ' this.state.carrier: ',
        this.state.carrier,
        'this.state.carrier_name : ',
        this.state.carrier_name,
        'this.state.tracking_number: ',
        this.state.tracking_number,
        'this.state.remarks: ',
        this.state.remarks,
      )
      console.log('addData', addData)
      this.setState({ showAlert: true, alertData: 'Please fill all values' })
      return
    }

    console.log('addData', addData)
    console.log(detailsData)

    var insertUrl = 'http://apps.k2bay.com/laptopzone/worldship/c_wordship/createUserReceipt'

    new Promise(function (resolve, reject) {
      $.ajax({
        url: insertUrl,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
      }).then(
        function (addData) {
          resolve(addData)
        },
        function (err) {
          reject(err)
        },
      )
    })
      .then((result) => {
        if (result) {
          this.setState({ showAlert: false })

          this.setState({ showAlert: true, alertData: JSON.parse(result).message })
          this.setState({
            formValues: [{ title: '', quantity: '' }],
            visible: true,
            description: '',
            recipt_type: '',
            carrier: '',
            carrier_name: '',
            tracking_number: '',
            remarks: '',
          })
        } else {
          console.log('byee')
        }
      })
      .catch((err) => {
        this.setState({ showAlert: true, alertData: err.statusText })
        console.log('err', err)
      })

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  close = () => {
    this.setState({ visible: false })
  }

  handleInput = (e) => {
    const name = e.target.name
    this.setState({ [name]: e.target.value })
  }

  render() {
    return (
      <>
        {console.log('showAlert', this.state.showAlert)}
        {this.state.showAlert && (
          <Toast
            text={this.state.alertData}
            onClose={() => {
              this.setState({ showAlert: false })
            }}
          />
        )}

        {/* <p style={alertStyles}>helloooo</p> */}

        <CForm onSubmit={this.handleSubmit} enctype="multipart/form-data">
          <Accordion
            title="Receipt Details"
            active={1}
            body={
              <CCardBody>
                <CRow>
                  <CCol md={4}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Description*</CFormLabel>
                    <CFormInput
                      type="text"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleInput}
                      id="exampleFormControlInput1"
                      placeholder="Description"
                      required
                    />
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Receipt Type</CFormLabel>
                    <div style={{ display: 'block' }}>
                      <CFormSelect
                        name="recipt_type"
                        size="sm"
                        className="mb-3"
                        aria-label="Small select example"
                        value={this.state.recipt_type}
                        onChange={this.handleInput}
                      >
                        <option>Select Type</option>
                        {var_receipt_type.map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </CFormSelect>
                    </div>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Carrier*</CFormLabel>
                    <CFormSelect
                      name="carrier"
                      size="sm"
                      className="mb-3"
                      aria-label="Small select example"
                      value={this.state.carrier}
                      onChange={this.handleInput}
                    >
                      <option>Select Carrier</option>
                      {var_carrier.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow>
                  {this.state.carrier === 'other' && (
                    <CCol md={4}>
                      <CFormLabel htmlFor="exampleFormControlInput1">Carrier Name*</CFormLabel>
                      <CFormInput
                        type="text"
                        name="carrier_name"
                        value={this.state.carrier_name}
                        onChange={this.handleInput}
                        id="exampleFormControlInput1"
                        placeholder="Carrier Name"
                        required
                      />
                    </CCol>
                  )}
                  <CCol md={4}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Tracking Number*</CFormLabel>
                    <CFormInput
                      type="text"
                      name="tracking_number"
                      value={this.state.tracking_number}
                      onChange={this.handleInput}
                      id="exampleFormControlInput1"
                      placeholder="Tracking Number"
                    />
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Remarks*</CFormLabel>
                    <CFormInput
                      type="text"
                      name="remarks"
                      value={this.state.remarks}
                      onChange={this.handleInput}
                      id="exampleFormControlInput1"
                      placeholder="Remarks"
                    />
                  </CCol>
                </CRow>
              </CCardBody>
            }
          />

          <Accordion
            title="Product Info"
            body={
              <>
                {this.state.formValues.map((element, index) => (
                  <CRow key={index} style={{ marginTop: '35px' }}>
                    <CCol md={4}>
                      <CFormLabel htmlFor="exampleFormControlInput1">Title*</CFormLabel>
                      <CFormInput
                        type="text"
                        name="title"
                        value={element.title || ''}
                        onChange={(e) => this.handleChange(index, e)}
                        id="exampleFormControlInput1"
                        placeholder="Title"
                        required
                      />
                    </CCol>
                    <CCol md={2}>
                      <CFormLabel htmlFor="exampleFormControlInput1">Quantity*</CFormLabel>
                      <CFormInput
                        type="number"
                        name="quantity"
                        value={element.quantity || ''}
                        onChange={(e) => this.handleChange(index, e)}
                        id="exampleFormControlInput1"
                        placeholder="Quantity"
                        required
                      />
                    </CCol>
                    <CCol md={2}>
                      {index ? (
                        <CButton
                          style={{ marginTop: '35px' }}
                          color="danger"
                          className="button remove"
                          onClick={() => this.removeFormFields(index)}
                        >
                          Remove
                        </CButton>
                      ) : null}
                    </CCol>
                  </CRow>
                ))}
                <CRow>
                  <CCol md={2}>
                    <CButton
                      style={{ marginTop: '35px' }}
                      color="primary"
                      className="button add"
                      onClick={() => this.addFormFields()}
                    >
                      + Add Product
                    </CButton>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={2}>
                    <CButton
                      style={{ marginTop: '35px' }}
                      color="primary"
                      className="button submit"
                      type="submit"
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </CButton>
                  </CCol>
                </CRow>
              </>
            }
          />

          {this.state.showAlert && <p style={alertStyles}>{this.state.alertData}</p>}
        </CForm>
      </>
    )
  }
}

export default Reciept
