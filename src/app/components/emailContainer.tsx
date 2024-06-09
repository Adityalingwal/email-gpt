import { EmailCard } from "./emailCard";
import { CATEGORIZED_EMAILS, EMAIL } from "../type";
import { Loader } from "./Loader";

export function EmailContainer({
    categorizedEmails,
    filteredEmails,
    loading
}: {
    categorizedEmails: CATEGORIZED_EMAILS | undefined,
    filteredEmails: EMAIL[],
    loading: boolean
}) {
    return (
        <div className="container mx-auto p-4">
            <div className="text-2xl font-semibold bg-white p-4 border-slate-100 border-y-2 rounded-t-lg shadow-md">
                Emails
            </div>
            <div className="px-10 py-2 border-2 border-slate-100 bg-white rounded-b-lg overflow-y-scroll h-[70vh] w-full shadow-lg">
                {loading ? <Loader /> : (
                    <ul>
                        {categorizedEmails ? categorizedEmails.map((email, id) => (
                            <EmailCard key={id} from={email.from} subject={email.subject} classification={email.classification} body={email.body} />
                        )) : filteredEmails.map((email, id) => (
                            <EmailCard key={id} from={email.from} subject={email.subject} classification={""} body={email.body} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
