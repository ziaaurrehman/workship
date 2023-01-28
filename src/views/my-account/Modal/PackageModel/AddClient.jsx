import React from "react"
import {
    CCol,
    CFormLabel,
    CFormInput,
    CRow,
    CLoadingButton,
  } from '@coreui/react-pro'
  import Select from 'react-select'
import {Link} from "react-router-dom"
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons';

const AddClient = ({clientData,
    client,
    setClient,
    loading,
    addClient,
    productData,
    product,
    setProduct,
    productQty,
    setProductQty,
    productLoading,
    addProduct}) => {
    return (
        <>
          <CRow className='mt-2'>
            <CCol xs="6">
              <CFormLabel htmlFor="exampleFormControlInput1">Client*</CFormLabel>
                  <Select options={clientData} value={client} onChange={(value)=>setClient(value)} placeholder="Select Client" isClearable/>
            </CCol>
            <CCol xs="6" className='mt-4' >

              <CLoadingButton
                  className='mt-2'
                  color="primary"
                  type="submit"
                  loading={loading}
                  onClick={() => addClient()}
                  disabled={loading || !client}>
                        Save Client
              </CLoadingButton>

            </CCol>
          </CRow>
          <CRow className='mt-2'>
            <CCol xs="6">
              <CFormLabel htmlFor="exampleFormControlInput1">Product*</CFormLabel>
                  <Select options={productData} value={product} onChange={(value)=>setProduct(value)} placeholder="Select Product" isClearable/>
            </CCol>
            <CCol xs="1" className='mt-4' title="Add New Product">
            <Link to="/MyAccount/AddProduct" target={"_blank"} >
              <CLoadingButton
                  className='mt-2'
                  color="default"
                 >
                  <CIcon icon={cilPlus}/>
              </CLoadingButton>

              </Link>
            </CCol>
            <CCol xs="2">
              <CFormLabel htmlFor="exampleFormControlQty">Qty*</CFormLabel>
              <CFormInput type="number" id="exampleFormControlQty" placeholder="Add QTY" value={productQty} name="productQty" onChange={e=>setProductQty(e.target.value)} min="1" required/>
            </CCol>
            <CCol xs="3" className='mt-4'>
              <CLoadingButton
                  className='mt-2'
                  color="primary"
                  type="submit"
                  loading={productLoading}
                  onClick={() => addProduct()}
                  disabled={productLoading || !client || !product || !productQty}>
                        Save Product
              </CLoadingButton>
            </CCol>
          </CRow>
        </>
    )
}
export default AddClient