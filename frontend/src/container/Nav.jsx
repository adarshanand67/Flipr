import { Button, Navbar } from "flowbite-react";
import React from "react";

const NavigationBar = () => (
  <Navbar fluid rounded style={{ backgroundColor: "#CCE4FF" }}>
    <Navbar.Brand href="/">
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        className="mr-3 h-6 sm:h-9"
        alt="StockX Logo"
      />
      <div className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        StockX
      </div>
    </Navbar.Brand>
    <div className="flex md:order-2 gap-5">
      <Button.Group>
        <Button gradientMonochrome="info" href="/signup">
          Sign Up
        </Button>
        <Button gradientMonochrome="info" href="/signin">
          Sign In
        </Button>
      </Button.Group>
    </div>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Navbar.Link href="/">Home</Navbar.Link>
      <Navbar.Link href="/company">Company</Navbar.Link>
      <Navbar.Link href="/stockExchange">Stock Exchange</Navbar.Link>
      <Navbar.Link href="/TechnicalAnalysis">Technical Analysis</Navbar.Link>
      <Navbar.Link href="/About">About</Navbar.Link>
    </Navbar.Collapse>
  </Navbar>
);

export default NavigationBar;
