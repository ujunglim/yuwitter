import { AppBar, Box, makeStyles, Tab, Tabs, Typography, useTheme } from '@material-ui/core';
import { Shared } from 'components_view/CommonStyle';
import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MoreHoriz } from '@material-ui/icons';

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
        <Box p={3} style={{padding: "0"}}>  
          {/* write component={'span'} to prevent [Wanring]<div> cannot appear as a descendant of <p>*/}
          <Typography component={'span'}>{children}</Typography>
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
      {/* color = "inherit" to prevent [Error]Invalid prop `color` of value */}
      <AppBar position="static" color="inherit" style={{boxShadow:"none"}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <StyledTab label="All" style={{fontFamily:"inherit", fontWeight:"bold"}} {...a11yProps(0)} />
          <StyledTab label="Mentions" style={{fontFamily:"inherit", fontWeight:"bold"}} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
    
      <TabPanel value={value} index={0} dir={theme.direction}>
        <NotiBox>
          <NotiDiv_top>
            <WhoMask>
              <img src="https://pbs.twimg.com/profile_images/1387421728251408385/gVcCautU_400x400.jpg"/>
            </WhoMask>

            <HoverDIV>
              <MoreHoriz />
            </HoverDIV>
          </NotiDiv_top>

          <NotiDiv_bottom>
            <p style={{marginBottom:"0.8rem", fontSize:"15px"}}>
              <b>BTS_official</b> Retweeted a photo from Rolling Stone
            </p>
            <p style={{fontSize:"15px", color:"rgb(91, 112, 131)"}}>In his digital cover story, BTS' Jimin talks perfectionism, missing Army, his love of dancing, and more. #BTSxRollingStone https://rol.st/2RRTFvk https://pic.twitter.com/g9Dlb5MXfp</p>
          </NotiDiv_bottom>
        </NotiBox>
      </TabPanel>
      
      <TabPanel value={value} index={1} dir={theme.direction}>
        <MentionsDiv>
          <h3 style={{margin: "1rem"}}>Nothing to see here — yet</h3>
          <p style={{color:"grey", fontSize: "14px"}}>When someone mentions you, you’ll find it here.</p>
        </MentionsDiv>
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

const NotiBox = styled.div`
  background: white;
  cursor: pointer;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid #EBEEF0;

  &:hover {
    background: #EFF1F2;
  }
`;

const NotiDiv_top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
`;

const WhoMask = styled(Shared.ImageMask)`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
`;

const HoverDIV = styled(Shared.HoverDIV)`
  &:hover {
    color: #1DA1F2;
  }
`;

const NotiDiv_bottom = styled.div``;

const MentionsDiv = styled.div`
  text-align: center;
`;

