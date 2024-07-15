'use client'
import React from "react";
import { XIcon, SearchIcon, GithubIcon, XComIcon, AboutIcon } from "./icons";
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarMenu, NavbarMenuItem, Button, Select, SelectItem, Selection } from "@nextui-org/react";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    "Tools",
    "Algorithms",
    "ChatBots",
    "Contact",
    "Log Out",
  ];
  const langOptions = [
    "English",
    "中文"
  ]
  const [langValues, setLangValues] = React.useState<Selection>(new Set([]));
  return (
    <Navbar disableAnimation isBordered maxWidth="full">
      <NavbarContent className="sm:w-max" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        <NavbarBrand className="hidden sm:flex gap-6">
          <Link href="/">
            <XIcon className="mr-1" />
            <p className="font-bold text-xl"> X-Tools</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3 flex" justify="center">
        <NavbarBrand>
          <Link href="/">
            <XIcon className="mr-1" />
            <p className="font-bold text-xl">X-Tools</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-10 w-full" justify="center">
        <Input
          classNames={{
            base: "max-w-full",
            mainWrapper: "h-full",
            input: "focus:outline-none border-transparent focus:border-transparent focus:ring-0",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          startContent={<SearchIcon />}
          type="search"
        />
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-10">
        <NavbarItem>
          <Select
            disallowEmptySelection
            defaultSelectedKeys={'English'}
            className="min-w-24"
            selectedKeys={langValues}
            selectionMode='single'
            onSelectionChange={setLangValues}
          >
            {langOptions.map((lang) => (
              <SelectItem key={lang}>
                {lang}
              </SelectItem>
            ))}
          </Select>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex min-w-20 gap-2">
          <GithubIcon className="min-w-6 hover:scale-125 transition-all ease duration-200" />
          <XComIcon className="min-w-5 hover:scale-125 transition-all ease duration-200" />
          <AboutIcon className="min-w-7 hover:scale-125 transition-all ease duration-200" />
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

      <NavbarMenu className="w-max-24">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color="foreground"
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