import React, { useState } from "react";
import { trpc } from "src/utils/trpc";

const SiteForm = () => {
  const [siteName, setSiteName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const utils = trpc.useContext();

  const siteCreate = trpc.site.create.useMutation({
    onSuccess: async (data) => {
      utils.site.getSite.setData(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    siteCreate.mutate(siteName);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute top-[50%] left-[50%] flex translate-x-[-50%] translate-y-[-50%] flex-col gap-5 rounded-md bg-slate-700 p-5"
    >
      <label className="text-white">
        Site Name:
        <input
          className="ml-2 rounded px-2 py-0.5 text-black"
          type="text"
          name="siteName"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
        />
      </label>

      {errorMessage && <p className="text-red-600">{errorMessage}</p>}

      <button
        className="rounded bg-emerald-300 hover:bg-emerald-600 hover:text-white"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};

export default SiteForm;
