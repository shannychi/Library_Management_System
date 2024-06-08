import React, { useState } from "react";
import {  Checkbox } from "@nextui-org/react";

export default function DropdownRole() {
    const [adminChecked, setAdminChecked] = useState(false);
    const [patronChecked, setPatronChecked] = useState(false);
  
    const handleAdminChange = () => {
      setAdminChecked(!adminChecked);
    };
  
    const handlePatronChange = () => {
      setPatronChecked(!patronChecked);
    };
  return (
   
          <div className="m-3">
            <span className="text-sm">Select Role</span>
              <div className="flex gap-2">
              <Checkbox value="Admin" checked={adminChecked} onChange={handleAdminChange} >ADMIN</Checkbox>
            <Checkbox value="Member" checked={patronChecked} onchange={handlePatronChange}>PATRON</Checkbox>
              </div>
          </div>
       
  );
}

