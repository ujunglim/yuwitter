import { AppBar, Box, makeStyles, Tab, Tabs, Typography, useTheme } from '@material-ui/core';
import { Shared } from 'components_view/CommonStyle';
import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));


function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="white" style={{boxShadow:"none"}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <StyledTab label="All" {...a11yProps(0)} />
          <StyledTab label="Mentions" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
    
      <TabPanel value={value} index={0} dir={theme.direction}>
        1
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        2
      </TabPanel>
    </div>
  );
}
//=================== Main Component ===================;=================
export default function Notification() {

  return (
    <NotiContainer>
      <Shared.Header>Notification</Shared.Header>
      <FullWidthTabs />
    </NotiContainer>
  );
}

//========= Styled Components ===============
const NotiContainer = styled(Shared.Container)``;

const StyledTab = styled(Tab)`
  transition: all 300ms ease-in-out;

  &:hover {
    background: #E8F5FE;
  }
`;