import { useState } from "react";
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import { BookLogo } from "./Function/BookLogo";
import { useAuth } from "./Function/AuthContext";
import LogOut from "./Form/logout";


    export default function App() {
      const [isMenuOpen, setIsMenuOpen] = React.useState(false);
      const { isAuthenticated, logout } = useAuth();
    
      const menuItems = [isAuthenticated ? (
        <div className="flex flex-col gap-1">
          <Link href="/">Home</Link>
          <Link href="/user">Profile</Link>
          <Link href="/books">Book Store</Link>
          <LogOut />
        </div>
      ) : (
        <div className="flex flex-col gap=1">
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign Up</Link>
        </div>
      )];
    
      return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className=" bg-cyan-800 text-white">
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand>
              <BookLogo/>
              <p className="font-bold text-inherit">LIBRARY</p>
            </NavbarBrand>
          </NavbarContent>
    
          {isAuthenticated ? (
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <LogOut/>
            </NavbarItem>
            <NavbarItem isActive>
              <Link href="/books" aria-current="page" className=" text-white underline">
                Book store
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/user" className=" text-white underline" >
                Profile
              </Link>
            </NavbarItem>
          </NavbarContent>
          ):(
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <Link href="/login" className=" text-white underline">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/signup" variant="flat" className=" text-white">
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
          )}
          
          <NavbarMenu>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                  }
                  className="w-full"
                  href="#"
                  size="lg"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
      );
    }