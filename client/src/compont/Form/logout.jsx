import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn} from "@nextui-org/react";
import {useAuth} from "../Function/AuthContext"

export default function LogOut() {
  
    const logout = useAuth()
    const handleLogout = async () => {
        try {
          const response = await fetch('https://library-management-system-2ku8.onrender.com/user/logout', {
            method: 'POST',
            credentials: 'include', 
          });
    
          if (response.status === 200) {
            logout();
            window.location.href = '/login';
          } else {
            console.error('Failed to log out');
          }
        } catch (error) {
          console.error('An error occurred during logout', error);
        }
      };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          className=" text-red-500"
        >
          Log out
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
        <DropdownItem
          key="text"
          startContent=""
        >
          Are you sure you want to log out?
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger "
          color="danger"
          startContent=""
          onClick={handleLogout}
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
