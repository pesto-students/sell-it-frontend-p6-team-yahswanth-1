import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { ViewKanbanRounded } from "@mui/icons-material";

export default function CheckboxListSecondary({ list }) {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {list.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.name}`;
        return (
          <ListItem
            key={value}
            // secondaryAction={
            //   <Checkbox
            //     edge="end"
            //     onChange={handleToggle(value.name)}
            //     checked={checked.indexOf(value.name) !== -1}
            //     inputProps={{ "aria-labelledby": labelId }}
            //   />
            // }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={ViewKanbanRounded.url}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={value.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
