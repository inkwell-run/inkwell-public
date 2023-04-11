import { Button, Input, TypographySubtle, cn } from "@doom.sh/ui";
import { Field, Form } from "houseform";
import { ArrowLeft, SidebarClose, SidebarOpen } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { z } from "zod";

interface ITopBarProps {
  slug: string;
  setSlug: (slug: string) => Promise<void>;
  isSidebarCollapsed: boolean;
  setCollapseSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TopBar = (props: ITopBarProps) => {
  const { slug, setSlug, isSidebarCollapsed, setCollapseSidebar } = props;
  return (
    <div className="border-b p-2 flex items-center justify-between gap-4">
      {/* back button */}
      <Link to={"/posts"} className="w-fit">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>All posts</span>
        </Button>
      </Link>
      {/* slug editor */}
      <Form
        onSubmit={(values) => {
          setSlug(values.slug);
        }}
      >
        {({ submit }) => (
          <Field<string>
            name="slug"
            initialValue={slug}
            // todo(sarim): check for duplicate slug
            onChangeValidate={z
              .string()
              .min(
                1,
                "Invalid slug. A valid slug should be atleast 1 character long."
              )
              .refine((val) => {
                try {
                  const parseUrl = new URL(val, "http://localhost");
                  return !val.includes(" ") && !!parseUrl.pathname;
                } catch (e) {
                  return false;
                }
              }, "Invalid slug. A valid slug looks like this (without spaces): /my-page")}
          >
            {({ value, setValue, onBlur, errors }) => (
              <div className="flex flex-col gap-4 flex-1">
                <Input
                  id="slug"
                  type="text"
                  value={value}
                  placeholder="Post slug"
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={() => {
                    onBlur();
                    submit();
                  }}
                />
                {errors.map((error) => (
                  <TypographySubtle key={error}>{error}</TypographySubtle>
                ))}
              </div>
            )}
          </Field>
        )}
      </Form>
      {/* expand collapse */}
      <Button
        variant="outline"
        onClick={() => setCollapseSidebar((prev) => !prev)}
      >
        <SidebarClose
          className={cn("w-4 h-4 transition-transform transform", {
            "-rotate-180": !isSidebarCollapsed,
          })}
        />
      </Button>
    </div>
  );
};
