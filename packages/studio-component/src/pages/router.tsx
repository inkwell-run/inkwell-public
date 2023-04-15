import React from "react";
import { Route, Router, Switch } from "wouter";
import { AlertScreen } from "../components/alert-screen";
import { useHashLocation } from "../lib/hash-router";
import { Assets } from "./assets/assets";
import { Post } from "./posts/post";
import { Posts } from "./posts/posts";
import { Schemas } from "./schemas/schemas";
import Navigation from "../components/navigation";
import { Toaster } from "@doom.sh/ui";

export const PageRouter = () => {
  return (
    <>
      <div className="flex flex-col h-full">
        <Navigation />
        <Router hook={useHashLocation}>
          <Switch>
            <Route path="/schemas">
              <Schemas />
            </Route>
            <Route path="/posts">
              <Posts />
            </Route>
            <Route path="/posts/:postId">
              <Post />
            </Route>
            <Route path="/assets">
              <Assets />
            </Route>
            <Route>
              <AlertScreen type="error">Page not found</AlertScreen>
            </Route>
          </Switch>
        </Router>
      </div>
      <Toaster position="top-center" />
    </>
  );
};
