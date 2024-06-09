import React from 'react';

export function Loader() {
    return (
        <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    className="flex flex-col cursor-pointer gap-5 border-2 rounded-lg mt-4 h-[20vh] p-5 animate-pulse shadow-lg"
                    style={{
                        background: 'linear-gradient(135deg, rgba(74,144,226,1) 0%, rgba(142,45,226,1) 50%, rgba(240,79,184,1) 100%)',
                        borderColor: 'rgba(142,45,226,0.5)',
                    }}
                >
                    <div className="flex justify-between">
                        <div className="rounded-full h-[4vh] w-[50vh] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
                        <div className="rounded-full h-[4vh] w-[20vh] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
                    </div>
                    <div className="rounded-full h-[4vh] w-[60vh] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
                </div>
            ))}
        </div>
    );
}
