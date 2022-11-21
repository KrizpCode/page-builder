import SiteForm from "@components/editor/SiteForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../utils/trpc";

const Editor = () => {
  const { data: sessionData, status } = useSession();
  const { data: siteData, isLoading } = trpc.site.getSite.useQuery();
  const router = useRouter();

  if (status === "loading" || isLoading) {
    return <>Loading...</>;
  }

  if (!sessionData) {
    router.push("/");
  }

  if (!siteData) {
    return <SiteForm />;
  }

  return (
    <div className="h-screen w-screen">
      <p>Editor</p>
      <p>Site Name: {siteData.name}</p>
      {siteData.pages.map((page) => (
        <p key={page.id}>Page Name: {page.name}</p>
      ))}
    </div>
  );
};

export default Editor;
