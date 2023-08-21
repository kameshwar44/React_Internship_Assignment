import React, { useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function CheckBox() {
  const [checked, setChecked] =useState([
    true,
    false,
    false,
    false, 
    true,
    false,
    false,
    false,
  ]);

  const handleParentChange = (parentIndex) => (event) => {
    const newChecked = [...checked];
    const parentOffset = parentIndex * 4; 

    for (let i = parentOffset; i < parentOffset + 4; i++) {
      newChecked[i] = event.target.checked;
    }

    setChecked(newChecked);
  };

  const handleChildChange = (parentIndex, childIndex) => (event) => {
    const newChecked = [...checked];
    const parentOffset = parentIndex * 4;

    newChecked[parentOffset + childIndex + 1] = event.target.checked;

    // Update parent checkbox state
    if (
      newChecked
        .slice(parentOffset + 1, parentOffset + 4 + 1)
        .every((item) => item)
    ) {
      newChecked[parentOffset] = true;
    } else if (
      !newChecked
        .slice(parentOffset + 1, parentOffset + 4 + 1)
        .some((item) => item)
    ) {
      newChecked[parentOffset] = false;
    } else {
      newChecked[parentOffset] = false;
    }

    setChecked(newChecked);
  };

  const data = [
    {
      parent: "customer_service",
      sub_departments: ["support", "customer_success", "Support Team"],
    },
    {
      parent: "design",
      sub_departments: ["graphic_design", "product_design", "web_design"],
    },
  ];

  const parentSections = data.map((item, parentIndex) => (
    <div key={parentIndex}>
      <FormControlLabel
        label={item.parent}
        control={
          <Checkbox
            checked={checked[parentIndex * 4]}
            indeterminate={
              checked
                .slice(parentIndex * 4 + 1, parentIndex * 4 + 4 + 1)
                .some((item) => item) &&
              !checked
                .slice(parentIndex * 4 + 1, parentIndex * 4 + 4 + 1)
                .every((item) => item)
            }
            onChange={handleParentChange(parentIndex)}
          />
        }
      />
      <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
        {item.sub_departments.map((childLabel, childIndex) => (
          <FormControlLabel
            key={childIndex}
            label={childLabel}
            control={
              <Checkbox
                checked={checked[parentIndex * 4 + childIndex + 1]}
                onChange={handleChildChange(parentIndex, childIndex)}
              />
            }
          />
        ))}
      </Box>
    </div>
  ));

  return <div>{parentSections}</div>;
}

export default CheckBox;
