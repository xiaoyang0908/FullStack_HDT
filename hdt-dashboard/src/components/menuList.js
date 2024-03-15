import OverviewIcon from '@mui/icons-material/PieChartOutlineTwoTone'
import CalenderIcon from '@mui/icons-material/CalendarMonthTwoTone'
import PatientIcon from '@mui/icons-material/PeopleAltTwoTone'
import SettingIcon from '@mui/icons-material/SettingsAccessibilityTwoTone'

export const mainListItems =[
    // A common pattern in React is for a component to return multiple elements.
    // Fragments let you group a list of children without adding extra nodes to the DOM.
    {
        title: 'Overiview', 
        key: '/therapistPage', 
        icon: <OverviewIcon/>, 
      },
      {
        title: 'Calender',
        key: '/calender',
        icon: <CalenderIcon/>,
      },
      {
        title: 'Patients',
        key: '/patients',
        icon: <PatientIcon/>,
      },
      {
        title: 'Setting',
        key: '/setting',
        icon: <SettingIcon/>,
      },
    ];

// export const secondaryListItems = (
  
// )