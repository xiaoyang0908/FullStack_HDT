import OverviewIcon from '@mui/icons-material/PieChartOutlineTwoTone';
import CalenderIcon from '@mui/icons-material/CalendarMonthTwoTone';
import PatientIcon from '@mui/icons-material/PeopleAltTwoTone';
import SettingIcon from '@mui/icons-material/SettingsAccessibilityTwoTone';
import JourneyIcon from "@mui/icons-material/ScheduleSendTwoTone";
import ExerciseIcon from "@mui/icons-material/SportsGymnasticsTwoTone";
import MessageIcon from '@mui/icons-material/MessageTwoTone';

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

    export const TrdPartyMainMenu =[
      // A common pattern in React is for a component to return multiple elements.
      // Fragments let you group a list of children without adding extra nodes to the DOM.
      {
          title: 'Journey', 
          key: '/Journey', 
          icon: <JourneyIcon/>, 
        },
        {
          title: 'Exercise',
          key: '/exercise',
          icon: <ExerciseIcon/>,
        },
        {
          title: 'Calender',
          key: '/calender',
          icon: <CalenderIcon/>,
        },
        {
          title: 'Messages',
          key: '/messages',
          icon: <MessageIcon/>,
        },
        {
          title: 'Setting',
          key: '/setting',
          icon: <SettingIcon/>,
        },
      ];