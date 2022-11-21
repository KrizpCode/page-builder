import { useSession } from "next-auth/react";
import React from "react";
import { trpc } from "../utils/trpc";

const Editor = () => {
  const { data: sessionData, status } = useSession();
  const { data: siteData, isLoading } = trpc.site.getByUserId.useQuery(
    sessionData?.user?.id || ""
  );
  console.log("🚀 ~ file: editor.tsx ~ line 9 ~ Editor ~ siteData", siteData);

  if (status === "loading" || isLoading) {
    return <>Loading...</>;
  }

  return (
    <div>
      <p>Editor</p>
      {!siteData && <p>You have no site created yet</p>}
    </div>
  );
};

export default Editor;
