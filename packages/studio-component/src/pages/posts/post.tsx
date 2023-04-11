import { cn } from "@doom.sh/ui";
import * as InkwellApi from "@inkwell.run/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Allotment } from "allotment";
import { useAtomValue } from "jotai";
import React from "react";
import { useParams } from "react-router-dom";
import { MarkdocEditor } from "../../components/markdoc-editor";
import MarkdocPreview from "../../components/markdoc-preview";
import { RightBar } from "../../components/post/right-bar";
import { TopBar } from "../../components/post/top-bar";
import { GlobalStateAtom } from "../../lib/store";

export const Post = () => {
  const { postId } = useParams();
  const { baseProps } = useAtomValue(GlobalStateAtom);
  const [animateSidebar, setAnimateSidebar] = React.useState(false);
  const [collapseSidebar, _setCollapseSidebar] = React.useState(false);
  const allotmentRef = React.useRef(null);

  const setCollapseSidebar = (
    value: boolean | ((prev: boolean) => boolean)
  ) => {
    setAnimateSidebar(true);
    if (typeof value === "function") {
      _setCollapseSidebar((prev) => {
        const newValue = value(prev);
        return newValue;
      });
    } else {
      _setCollapseSidebar(value);
    }
    setTimeout(() => {
      setAnimateSidebar(false);
    }, 300);
  };

  const getPost = useQuery({
    queryKey: ["post", postId],
    queryFn: () => InkwellApi.PostsService.queryPostsFindUnique(postId ?? ""),
  });

  const updatePost = useMutation({
    mutationFn: InkwellApi.PostsService.mutationPostsUpdate,
    onSuccess: () => getPost.refetch(),
  });

  if (typeof postId === "undefined" || !postId) {
    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <div className="w-4 h-4 bg-red-400 rounded-full" />
        <p>Invalid post ID</p>
      </div>
    );
  }

  if (getPost.isLoading) {
    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <div className="w-4 h-4 bg-blue-400 rounded-full animate-ping" />
        <p>Loading post...</p>
      </div>
    );
  }

  if (getPost.isError) {
    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <div className="w-4 h-4 bg-red-400 rounded-full" />
        <p>Could not load post with this ID</p>
      </div>
    );
  }

  const schemaNames = baseProps.schemas.map((s) => s.name);
  const schemaChoices = getPost.data.schema
    ? [getPost.data.schema, ...schemaNames]
    : schemaNames;

  return (
    <div className="flex flex-col h-full">
      <TopBar
        slug={getPost.data.slug}
        setSlug={async (newSlug) => {
          updatePost.mutateAsync({
            id: getPost.data.id,
            slug: newSlug,
          });
        }}
        isSidebarCollapsed={collapseSidebar}
        setCollapseSidebar={setCollapseSidebar}
      />
      <Allotment
        ref={allotmentRef}
        defaultSizes={[40, 40, 20]}
        onVisibleChange={(idx, v) => {
          if (idx === 2) {
            setCollapseSidebar(!v);
          }
        }}
      >
        <Allotment.Pane>
          <MarkdocEditor
            initialValue={getPost.data.content ?? ""}
            setValue={(newValue) => {
              console.log({ newValue });
              updatePost.mutate({
                id: getPost.data.id,
                content: newValue,
              });
            }}
          />
        </Allotment.Pane>
        <Allotment.Pane
          className={cn({
            ["transition-all"]: animateSidebar,
          })}
        >
          <MarkdocPreview
            value={getPost.data.content ?? ""}
            userOverrides={baseProps.markdoc ?? { components: {}, config: {} }}
          />
        </Allotment.Pane>
        <Allotment.Pane
          visible={!collapseSidebar}
          snap
          className={cn({
            ["transition-all"]: animateSidebar,
          })}
        >
          <RightBar
            post={getPost.data}
            schemaObjects={baseProps.schemas}
            schemaChoices={schemaChoices}
            setSchema={async (value) => {
              updatePost.mutateAsync({
                id: getPost.data.id,
                schema: value,
              });
            }}
          />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};
