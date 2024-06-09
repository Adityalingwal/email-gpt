import { useState } from "react";
import { motion } from "framer-motion";

export function EmailCard({
    from,
    subject,
    classification,
    body
}: {
    from: string;
    subject: string;
    classification: string;
    body: {
        text: string,
        html: string
    }
}) {
    const [visible, setVisible] = useState<boolean>(false);
    const closeModal = () => setVisible(false);
    const openModal = () => setVisible(true);

    return (
        <div>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, ease: "linear" }}
                    className="absolute right-0 w-[110vh] origin-right backdrop-blur inset-y-0 z-10 flex items-center justify-center"
                >
                    <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 h-[90vh] p-5 flex flex-col gap-4 rounded-lg shadow-2xl">
                        <div className="flex justify-between">
                            <div className="text-xl text-white font-semibold">
                                {from}
                            </div>
                            <div className={`text-xl text-white font-semibold`}>
                                {classification}
                            </div>
                        </div>
                        <div className="text-lg text-white font-medium">
                            Subject: {subject}
                        </div>
                        <div className="text-lg text-white  h-[60vh] w-[100vh] overflow-scroll scrollbar-hide rounded-lg p-2">
                            <div className="p-5" dangerouslySetInnerHTML={{ __html: body.html }}></div>
                            <pre className="flex flex-wrap">{body.text}</pre>
                        </div>
                        <button
                            className="text-white font-semibold bg-gradient-to-r from-gray-700 to-gray-800 w-[10vh] rounded-lg hover:bg-gray-600 transition ease-in-out"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeModal();
                            }}
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            )}
            <motion.div
                className="flex flex-col cursor-pointer gap-2 border-2 rounded-lg bg-gradient-to-r from-purple-100 via-blue-100 to-indigo-100 border-gray-200 mt-4 h-[15vh] p-2 hover:scale-105 transition ease-in-out shadow-md"
                onClick={openModal}
                whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: "easeIn", duration: 0.3 }}
            >
                <div className="flex justify-between">
                    <div className="font-spaceMono font-semibold">
                        {from}
                    </div>
                    <div className="font-semibold text-green-800">
                        {classification}
                    </div>
                </div>
                <div className="flex items-center">
                    {subject}
                </div>
            </motion.div>
        </div>
    );
}
