import React, { useState, useEffect, useCallback } from 'react'
import { api } from '../constants'

import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
  CSmartTable,
  CCardBody,
  CButton,
  CFormCheck,
  CFormLabel,
} from '@coreui/react-pro'
import axios from "axios"
import Accordion from '../../base/accordion/Accordion'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PackageModel from '../Modal/PackageModel'
import moment from "moment"
import "./style.css"
const id = localStorage.getItem('token2')
let user = JSON.parse(localStorage.getItem('user'))
let is_admin = Number(user?.user_id[0]?.is_admin)
let sj_user = Number(user?.user_id[0]?.sj_user)

export function PackageList() {
  const [allPackages, setAllPackages] = useState()
  const [packageModel, setPackageModal] = useState(false)
  const [selectedPackageId, setSelectPackageId] = useState("")
  const [filters, setFilters] = useState({
    startDate:new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    endDate:new Date(),
    statusFilter:"Unknown"
  })

  let url = `${api}/getPackageList`

const fetchData  = useCallback(() => {
  const formData = new FormData()
  formData.append('status_filter', filters?.statusFilter)
  formData.append("user_id",id)
  if(filters.startDate){
    formData.append('from_date', filters?.startDate ? moment(filters?.startDate).format("YYYY-MM-DD") : null)
  }
  if(filters.endDate){
    formData.append('to_date', filters?.endDate ? moment(filters?.endDate).format("YYYY-MM-DD") : null)
  }
    try {
      axios
      .post(url, formData)
      .then((res) => {
        if (res.data.status) {
          setAllPackages(res.data.data)
        } else {
          setAllPackages([])
        }
      })
      .catch((err) => {
        setAllPackages([])

        console.log(err)
      })
    } catch (error) {
      setAllPackages([])

      console.log(error)
    }
},[filters?.endDate, filters?.startDate, filters?.statusFilter, url])

  useEffect(()=> {
    fetchData()
  },[fetchData, filters])

  useEffect(() => {
  }, [allPackages])

  const onChange = (dates) => {
    const [start, end] = dates;
    setFilters({
      ...filters,
      startDate:start,
      endDate:end
    })
  };

  return (
    <>
    <CRow>
      <CCol>
      <Accordion
          title="Package Filter"
          active={1}
          body={
            <CCardBody>
              <CRow>
                <CCol md={6}>
                  <CFormCheck inline type="radio" name="statusFilter" id="inlineCheckbox1" value="product added" label="Product" onChange={(e) =>setFilters({...filters, statusFilter:e.target.value})} checked={filters.statusFilter === "product added"}/>
                  <CFormCheck inline type="radio" name="statusFilter" id="inlineCheckbox2" value="client added" label="Client" checked={filters.statusFilter === "client added"} onChange={(e) =>setFilters({...filters, statusFilter:e.target.value})}/>
                  <CFormCheck inline type="radio" name="statusFilter" id="inlineCheckbox3" value="Unknown" label="Unknown" checked={filters.statusFilter === "Unknown"} onChange={(e) =>setFilters({...filters, statusFilter:e.target.value})}/>
                  <CFormCheck inline type="radio" name="statusFilter" id="inlineCheckbox3" value="" label="All" checked={filters.statusFilter === ""} onChange={(e) =>setFilters({...filters, statusFilter:e.target.value})}/>
                </CCol>
                <CCol md={6}>
                <CFormLabel htmlFor="date-range">Date Range</CFormLabel>
                <DatePicker
                  selected={filters.startDate}
                  onChange={onChange}
                  startDate={filters.startDate}
                  endDate={filters.endDate}
                  selectsRange
                  id="date-range"
                  isClearable
                  />
                </CCol>
              </CRow>
            </CCardBody>
          }
        />

      </CCol>
    </CRow>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Package List</strong>
            </CCardHeader>
            <CCardBody>
              <CSmartTable
                items={allPackages}
                columns={[
                   {
                        key: 'show_details',
                        label: '',
                        _style: { width: '2%' },
                        filter: false,
                        sorter: false,
                      },
                      {
                        key: 'image_url',
                        label: '',
                        _style: { width: '4%' },
                        filter: false,
                        sorter: false,
                      },
                  "id",
                  'tracking_no',
                  'status',
                  "client_name",
                  'remarks',
                  'received_by',
                  'received_at',
                ]}
                // columns={}
                itemsPerPage={20}
                columnFilter
                columnSorter
                pagination
                tableProps={{
                  hover: true,
                  responsive: true,
                }}
                scopedColumns={{
                    show_details: (items) => {
                        return +is_admin === 1 || +sj_user === 1 ?  (
                          <td className="py-2">
                            <CButton
                              color="dark"
                              shape="square"
                              size="sm"
                              onClick={() => {
                                setSelectPackageId(items?.id)
                                setPackageModal(true)
                              }}
                            >
                              Verify
                            </CButton>
                          </td>
                        ): <td></td>
                      } ,
                      image_url: (items) => {
                        return  (
                          <td className="py-2" onClick={() => {
                            setSelectPackageId(items?.id)
                            setPackageModal(true)
                          }}>
                            <img src={items?.image_url} alt="No Found" width="100px" height="100px"/>
                          </td>
                        )
                      }
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {packageModel && <PackageModel
        packageModal={packageModel}
        setPackageModal={setPackageModal}
        packageId={selectedPackageId}
      />}

    </>
  )
}