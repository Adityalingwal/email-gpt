"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [userKey, setUserKey] = useState<string | "">("");
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('GEMINI_KEY', userKey);
    }
    alert('Your Gemini API key has been saved successfully');
  };

  return (
    <div className="relative h-screen w-screen bg-black flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="flex flex-col items-center justify-center bg-black bg-opacity-90 w-[70vh] rounded p-5 shadow-xl">
          <div className="font-spaceMono text-6xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text mb-8">
            EmailGPT
          </div>
          {session ? (
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="font-semibold text-white text-2xl">
                Welcome, {session?.user?.name}
              </div>
              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Enter Your Gemini API Key"
                  onChange={(e) => setUserKey(e.target.value)}
                  className="w-[50vh] h-[5vh] border-gray-700 border-2 rounded text-center bg-gray-800 text-white"
                />
                <button
                  className="w-[8vh] h-[5vh] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
              <div className="mt-6 flex justify-center items-center gap-4">
                <button
                  className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white h-[5vh] w-[20vh] rounded hover:scale-105 transition ease-in-out"
                  onClick={() => router.push("/home")}
                >
                  Go to home
                </button>
                <button
                  className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white h-[5vh] w-[20vh] rounded hover:scale-105 transition ease-in-out"
                  onClick={() => signOut()}
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="font-semibold text-white text-2xl">
                Welcome, please login with your Google account
              </div>
              <button
                className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white mt-4 h-[5vh] w-[20vh] rounded hover:scale-105 transition ease-in-out"
                onClick={() => signIn("google")}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
