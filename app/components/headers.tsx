'use client'
import React from "react";
import { AcmeLogo, SearchIcon, XIcon } from "./icons";
import Logo from "./logo"
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    "Tools",
    "Algorithms",
    "ChatBots",
    "Contact",
    "Log Out",
  ];
  return (
    <Navbar shouldHideOnScroll disableAnimation isBordered maxWidth="full">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3 flex" justify="center">
        <NavbarBrand>
          <Link href="/">
            <XIcon className="mr-1" />
            <p className="font-bold text-xl">X-Tools</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarBrand>
          <Link href="/">
            <XIcon className="mr-1" />
            <p className="font-bold text-xl"> X-Tools</p>
          </Link>
        </NavbarBrand>
       </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4 items-center" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#" className="text-xl text-gray mx-2 hover:scale-105 hover:underline">
            Tools
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link href="/algorithms" color="foreground" className="text-xl text-gray mr-2 hover:scale-105 hover:underline">
            Algorithms
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/chatBots" className="text-xl  text-gray mr-2 hover:scale-105 hover:underline">
            ChatBots
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/concat" className="text-xl  text-gray mr-2 hover:scale-105 hover:underline">
            Concat
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="warning" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
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
export default Header;