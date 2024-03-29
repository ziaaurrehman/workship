import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAddressBook,
  cilLocationPin,
  cilUser,
  cilCart,
  cilSpeedometer,
  cilGrid,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'

let user = JSON.parse(localStorage.getItem('user'))
let id = JSON.parse(localStorage.getItem('token2'))

let is_admin = Number(user?.user_id[0]?.is_admin)
let sj_user = Number(user?.user_id[0]?.sj_user)
console.log("sj_user: "+sj_user+", Admin: "+is_admin);
var _nav

if (id === 1008) {
  console.log('iffffffffff')
  _nav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },

    {
      component: CNavTitle,
      name: 'My Account',
    },

    {
      component: CNavItem,
      name: 'Purchase Order',
      to: '/MyAccount/RequestProduct',
      icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Add Product',
      to: '/MyAccount/AddProduct',
      icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Create Order',
      to: '/MyAccount/CreateOrder',
      icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Order',
      to: '/MyAccount/Order',
      icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'CreateShipment',
      to: '/MyAccount/CreateShipment',
      icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Box',
      to: '/MyAccount/Box',
      icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'CreateBox',
      to: '/MyAccount/CreateBox',
      icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Shipment',
      to: '/MyAccount/Shipment',
      icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'LocalPickup',
      to: '/MyAccount/LocalPickup',
      icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    },

    {
      component: CNavItem,
      name: 'All Local Pickup',
      to: '/MyAccount/AllLocalPickup',
      icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Package List',
      to: '/MyAccount/Package-List',
      icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
    },
  ]
} else {
  console.log('eleeeeeeeeeeeeeee', id)
  _nav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },

    {
      component: CNavTitle,
      name: 'My Account',
    },

    // {
    //   component: CNavItem,
    //   name: 'Purchase Order',
    //   to: '/MyAccount/RequestProduct',
    //   icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    // },
    {
      component: CNavItem,
      name: 'Products',
      to: '/MyAccount/AddProduct',
      icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    },
    // {
    //   component: CNavItem,
    //   name: 'Create Order',
    //   to: '/MyAccount/CreateOrder',
    //   icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    // },
    // {
    //   component: CNavItem,
    //   name: 'Order',
    //   to: '/MyAccount/Order',
    //   icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    // },
    // {
    //   component: CNavItem,
    //   name: 'CreateShipment',
    //   to: '/MyAccount/CreateShipment',
    //   icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    // },
    // {
    //   component: CNavItem,
    //   name: 'Shipment',
    //   to: '/MyAccount/Shipment',
    //   icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    // },
    // {
    //   component: CNavItem,
    //   name: 'LocalPickup',
    //   to: '/MyAccount/LocalPickup',
    //   icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    // },

    // {
    //   component: CNavItem,
    //   name: 'All Local Pickup',
    //   to: '/MyAccount/AllLocalPickup',
    //   icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
    // },
    {
      component: CNavItem,
      name: 'Package List',
      to: '/MyAccount/Package-List',
      icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
    },
  ]
}

if (is_admin) {
  _nav = [
    {
      component: CNavItem,
      name: 'Order',
      to: '/MyAccount/Order',
      icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Shipment',
      to: '/MyAccount/Shipment',
      icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Box',
      to: '/MyAccount/Box',
      icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Users',
      to: '/MyAccount/Users',
      icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'All Local Pickup',
      to: '/MyAccount/AllLocalPickup',
      icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Package List',
      to: '/MyAccount/Package-List',
      icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
    },
  ]
}

export default _nav

// import React from 'react'
// import CIcon from '@coreui/icons-react'
// import {
//   cilBell,
//   cilCalculator,
//   cilCalendar,
//   cilChartPie,
//   cilCursor,
//   cilDrop,
//   cilAddressBook,
//   cilEnvelopeOpen,
//   cilGrid,
//   cilLayers,
//   cilMap,
//   cilNotes,
//   cilPencil,
//   cilPuzzle,
//   cilSpeedometer,
//   cilSpreadsheet,
//   cilStar,
//   cilLocationPin,
//   cilUser,
//   cilCart,

// } from '@coreui/icons'
// import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'

// const _nav = [
//   {
//     component: CNavItem,
//     name: 'Dashboard',
//     to: '/dashboard',
//     icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
//     badge: {
//       color: 'info-gradient',
//       text: 'NEW',
//     },
//   },
//   {
//     component: CNavTitle,
//     name: 'My Account',
//   },

//   {
//     component: CNavItem,
//     name: 'My MailBox',
//     to: '/MyAccount/MyMailBox',
//     icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
//   },

//   {
//     component: CNavItem,
//     name: 'Address Book',
//     to: '/MyAccount/AddressBook',
//     icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
//   },

//   {
//     component: CNavItem,
//     name: 'Use My Address',
//     to: '/MyAccount/UseMyAddress',
//     icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
//   },

//   {
//     component: CNavItem,
//     name: 'Request Product',
//     to: '/MyAccount/RequestProduct',
//     icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
//   },

//   {
//     component: CNavTitle,
//     name: 'Theme',
//   },
//   {
//     component: CNavItem,
//     name: 'Colors',
//     to: '/theme/colors',
//     icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
//   },
//   {
//     component: CNavItem,
//     name: 'Typography',
//     to: '/theme/typography',
//     icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
//   },
//   {
//     component: CNavTitle,
//     name: 'Components',
//   },
//   {
//     component: CNavGroup,
//     name: 'Base',
//     to: '/base',
//     icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'Accordion',
//         to: '/base/accordion',
//       },
//       {
//         component: CNavItem,
//         name: 'Breadcrumb',
//         to: '/base/breadcrumbs',
//       },
//       {
//         component: CNavItem,
//         name: 'Cards',
//         to: '/base/cards',
//       },
//       {
//         component: CNavItem,
//         name: 'Carousel',
//         to: '/base/carousels',
//       },
//       {
//         component: CNavItem,
//         name: 'Collapse',
//         to: '/base/collapses',
//       },
//       {
//         component: CNavItem,
//         name: 'List group',
//         to: '/base/list-groups',
//       },
//       {
//         component: CNavItem,
//         name: 'Navs & Tabs',
//         to: '/base/navs',
//       },
//       {
//         component: CNavItem,
//         name: 'Pagination',
//         to: '/base/paginations',
//       },
//       {
//         component: CNavItem,
//         name: 'Popovers',
//         to: '/base/popovers',
//       },
//       {
//         component: CNavItem,
//         name: 'Progress',
//         to: '/base/progress',
//       },
//       {
//         component: CNavItem,
//         name: 'Spinners',
//         to: '/base/spinners',
//       },
//       {
//         component: CNavItem,
//         name: 'Tables',
//         to: '/base/tables',
//       },
//       {
//         component: CNavItem,
//         name: 'Tooltips',
//         to: '/base/tooltips',
//       },
//     ],
//   },
//   {
//     component: CNavGroup,
//     name: 'Buttons',
//     to: '/buttons',
//     icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'Buttons',
//         to: '/buttons/buttons',
//       },
//       {
//         component: CNavItem,
//         name: 'Buttons groups',
//         to: '/buttons/button-groups',
//       },
//       {
//         component: CNavItem,
//         name: 'Dropdowns',
//         to: '/buttons/dropdowns',
//       },
//       {
//         component: CNavItem,
//         name: 'Loading Buttons',
//         to: '/buttons/loading-buttons',
//         badge: {
//           color: 'danger-gradient',
//           text: 'PRO',
//         },
//       },
//     ],
//   },
//   {
//     component: CNavGroup,
//     name: 'Forms',
//     icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'Form Control',
//         to: '/forms/form-control',
//       },
//       {
//         component: CNavItem,
//         name: 'Select',
//         to: '/forms/select',
//       },
//       {
//         component: CNavItem,
//         name: 'Multi Select',
//         to: '/forms/multi-select',
//         badge: {
//           color: 'danger-gradient',
//           text: 'PRO',
//         },
//       },
//       {
//         component: CNavItem,
//         name: 'Checks & Radios',
//         to: '/forms/checks-radios',
//       },
//       {
//         component: CNavItem,
//         name: 'Range',
//         to: '/forms/range',
//       },
//       {
//         component: CNavItem,
//         name: 'Input Group',
//         to: '/forms/input-group',
//       },
//       {
//         component: CNavItem,
//         name: 'Floating Labels',
//         to: '/forms/floating-labels',
//       },
//       {
//         component: CNavItem,
//         name: 'Layout',
//         to: '/forms/layout',
//       },
//       {
//         component: CNavItem,
//         name: 'Validation',
//         to: '/forms/validation',
//       },
//     ],
//   },
//   {
//     component: CNavGroup,
//     name: 'Icons',
//     icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'CoreUI Free',
//         to: '/icons/coreui-icons',
//         badge: {
//           color: 'success-gradient',
//           text: 'FREE',
//         },
//       },
//       {
//         component: CNavItem,
//         name: 'CoreUI Flags',
//         to: '/icons/flags',
//       },
//       {
//         component: CNavItem,
//         name: 'CoreUI Brands',
//         to: '/icons/brands',
//       },
//     ],
//   },
//   {
//     component: CNavGroup,
//     name: 'Notifications',
//     icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'Alerts',
//         to: '/notifications/alerts',
//       },
//       {
//         component: CNavItem,
//         name: 'Badges',
//         to: '/notifications/badges',
//       },
//       {
//         component: CNavItem,
//         name: 'Modal',
//         to: '/notifications/modals',
//       },
//       {
//         component: CNavItem,
//         name: 'Toasts',
//         to: '/notifications/toasts',
//       },
//     ],
//   },
//   {
//     component: CNavItem,
//     name: 'Widgets',
//     to: '/widgets',
//     icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
//     badge: {
//       color: 'info-gradient',
//       text: 'NEW',
//     },
//   },
//   {
//     component: CNavItem,
//     name: 'Smart Table',
//     icon: <CIcon icon={cilGrid} customClassName="nav-icon" />,
//     badge: {
//       color: 'danger-gradient',
//       text: 'PRO',
//     },
//     to: '/smart-table',
//   },
//   {
//     component: CNavTitle,
//     name: 'Plugins',
//   },
//   {
//     component: CNavItem,
//     name: 'Calendar',
//     icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
//     badge: {
//       color: 'danger-gradient',
//       text: 'PRO',
//     },
//     to: '/plugins/calendar',
//   },
//   {
//     component: CNavItem,
//     name: 'Charts',
//     icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
//     to: '/plugins/charts',
//   },
//   {
//     component: CNavItem,
//     name: 'Google Maps',
//     icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
//     badge: {
//       color: 'danger-gradient',
//       text: 'PRO',
//     },
//     to: '/plugins/google-maps',
//   },
//   {
//     component: CNavTitle,
//     name: 'Extras',
//   },
//   {
//     component: CNavGroup,
//     name: 'Pages',
//     icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavItem,
//         name: 'Login',
//         to: '/login',
//       },
//       {
//         component: CNavItem,
//         name: 'Register',
//         to: '/register',
//       },
//       {
//         component: CNavItem,
//         name: 'Error 404',
//         to: '/404',
//       },
//       {
//         component: CNavItem,
//         name: 'Error 500',
//         to: '/500',
//       },
//     ],
//   },
//   {
//     component: CNavGroup,
//     name: 'Apps',
//     icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
//     items: [
//       {
//         component: CNavGroup,
//         name: 'Invoicing',
//         icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
//         to: '/apps/invoicing',
//         items: [
//           {
//             component: CNavItem,
//             name: 'Invoice',
//             badge: {
//               color: 'danger-gradient',
//               text: 'PRO',
//             },
//             to: '/apps/invoicing/invoice',
//           },
//         ],
//       },
//       {
//         component: CNavGroup,
//         name: 'Email',
//         to: '/apps/email',
//         icon: <CIcon icon={cilEnvelopeOpen} customClassName="nav-icon" />,
//         items: [
//           {
//             component: CNavItem,
//             name: 'Inbox',
//             badge: {
//               color: 'danger-gradient',
//               text: 'PRO',
//             },
//             to: '/apps/email/inbox',
//           },
//           {
//             component: CNavItem,
//             name: 'Message',
//             badge: {
//               color: 'danger-gradient',
//               text: 'PRO',
//             },
//             to: '/apps/email/message',
//           },
//           {
//             component: CNavItem,
//             name: 'Compose',
//             badge: {
//               color: 'danger-gradient',
//               text: 'PRO',
//             },
//             to: '/apps/email/compose',
//           },
//         ],
//       },
//     ],
//   },
// ]

// export default _nav
