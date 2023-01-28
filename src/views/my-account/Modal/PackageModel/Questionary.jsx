import React, {useEffect, useState} from "react"
import { api } from '../../constants'
import {
    CCol,
    CFormLabel,
    CFormTextarea,
    CRow,
    CLoadingButton,
    CToast,
    CToastBody,
    CToaster
  } from '@coreui/react-pro'
import Select from 'react-select'
import axios from "axios"

const exampleToast = (message) => (
    <CToast autohide={true}>
      <CToastBody>{message}</CToastBody>
    </CToast>
  )


const id = localStorage.getItem('token2')

const Questionary = ({packageId}) => {
    const [questionType, setQuestionType] = useState(null)
    const [questionTypes, setQuestionTypes] = useState([])
    const [subject, setSubject] = useState("")
    const [note, setNote] = useState("")
    const [queryLoading, setQueryLoading] = useState(false)
    const [toast, addToast] = useState(0)
    const toaster = React.useRef()

    const getQueryTypes = () => {
      try {
        axios
        .post(`${api}/getQueryType`)
        .then((res) => {
        if (res.data.status) {
          setQuestionTypes(res.data.queries?.map(item=> {
            return {value:item?.id, label:item?.name}
          }))
        } else {
          setQuestionTypes([])
        }
      })
      .catch((err) => {
        setQuestionTypes([])
        console.log(err)
      })
    } catch (error) {
      setQuestionTypes([])
      console.log(error)
    }
  }
useEffect(()=> {
  getQueryTypes()
},[])

const sendQuery = () => {
    try {
        setQueryLoading(true)
        let formData = new FormData()
        formData.append("qry_type", questionType?.value)
        formData.append("qry_by", id)
        formData.append("package_id", packageId)
        formData.append("note", note)
        formData.append("qry_desc", subject)
        axios
        .post(`${api}/submitQuery`, formData)
        .then((res) => {
        if (res.data.status) {
          addToast(exampleToast(res.data?.message || "Your Query Submited Successfully"))
        } else {
          addToast(exampleToast(res.data?.message || "Your Query Not Submited Successfully"))
        }
        setQueryLoading(false)
      })
      .catch((err) => {
        setQueryLoading(false)
        addToast(exampleToast(err?.message || "Your Query Not Submited Successfully"))
      })
      } catch (error) {
        setQueryLoading(false)
        addToast(exampleToast(error?.message || "Your Query Not Submited Successfully"))
      console.log(error)
      }
}

    return (<>
              <CToaster ref={toaster} push={toast} placement="top-end" />

     <CRow className='mt-2'>
            <CCol xs="12">
              <CFormLabel htmlFor="exampleFormControlInput1">Question Type*</CFormLabel>
                  <Select options={questionTypes} value={questionType} onChange={(value)=>setQuestionType(value)} placeholder="Select Question" isClearable/>
            </CCol>
    </CRow>
    <CRow className='mt-2'>
            <CCol xs="12">
            <CFormLabel htmlFor="addsubkect">Subject*</CFormLabel>
                <CFormTextarea
                        id="addsubkect"
                        label="Subject"
                        rows={3}
                        text="Must be 5-100 words long."
                        value={subject}
                        onChange={(e)=>setSubject(e.target.value)}
                        >
                </CFormTextarea>
            </CCol>
    </CRow>
    <CRow className='mt-2'>
        <CCol xs="12">
        <CFormLabel htmlFor="addMessage">Note</CFormLabel>
            <CFormTextarea
                id="addMessage"
                label="Note"
                rows={3}
                text="Must be 5-200 words long."
                value={note}
                onChange={(e)=>setNote(e.target.value)}
                >
            </CFormTextarea>
        </CCol>
    </CRow>
    <CRow>
    <CLoadingButton
        className='mt-2'
        color="primary"
        type="submit"
        loading={queryLoading}
        onClick={() => sendQuery()}
        disabled={queryLoading || !questionType || !subject}>
            Send Query
    </CLoadingButton>
    </CRow>
    </>)
}
export default Questionary