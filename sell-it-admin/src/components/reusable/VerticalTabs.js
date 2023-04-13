import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1, maxHeight: "60vh", overflowY: "auto" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs(props) {
  const { tabs = [] } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        display: "flex",
        height: 224,
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: "25%",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", width: "50%" }}
        >
          {tabs.map((tab, tabId) => (
            <Tab label={tab?.label} key={tabId} {...a11yProps(tabId)} />
          ))}
        </Tabs>
      </Box>
      <Box
        sx={{
          width: "80%",
        }}
      >
        {tabs.map((tab, tabId) => (
          <TabPanel value={value} key={tabId} index={tabId}>
            {tab?.component}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
}

VerticalTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object),
};
