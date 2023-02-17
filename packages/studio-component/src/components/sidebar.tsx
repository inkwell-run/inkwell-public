import * as ManuscriptApi from "@manuscript/api-client";
import { Alert, Navbar, NavLink, Stack } from "@manuscript/lib";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Stack justify="space-between" h="100%">
      <Navbar.Section>
        <Link to={`posts`}>
          <NavLink label="Posts" />
        </Link>
        <Link to={`schemas`}>
          <NavLink label="Schemas" />
        </Link>
      </Navbar.Section>
    </Stack>
  );
};

export default Sidebar;
