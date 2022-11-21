import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <>Loading...</>;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      {session ? (
        <button
          className="rounded-full bg-violet-700 px-4 py-2 text-white"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="rounded-full bg-violet-700 px-4 py-2 text-white"
          onClick={() => signIn("discord")}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default Home;
