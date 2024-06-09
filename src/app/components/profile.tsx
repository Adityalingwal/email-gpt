"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Profile({ session }: { session: any }) {
    const router = useRouter();
    return (
        <div className="border-2 border-slate-400 h-[25vh] p-2 flex rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 shadow-lg">
            <div className="w-[10vh] flex justify-center items-center">
                <img
                    className="object-cover w-[8vh] h-[8vh] rounded-full border-2 border-white shadow-lg"
                    src={session.user?.image || ""}
                />
            </div>
            <div className="flex justify-between items-center mt-2 w-[90vh]">
                <div className="flex flex-col gap-1 text-white">
                    <div className="font-spaceMono text-2xl font-semibold">
                        Welcome, {session.user?.name}
                    </div>
                    <div className="font-spaceMono">{session.user?.email}</div>
                </div>
                <div>
                    <button
                        className="bg-gradient-to-r from-pink-500 to-red-500 text-white h-[5vh] w-[20vh] rounded-full hover:scale-105 transition ease-in-out shadow-lg"
                        onClick={() => signOut().then(() => router.push("/"))}
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}
