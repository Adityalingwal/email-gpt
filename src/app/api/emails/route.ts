import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { NEXT_AUTH } from '@/app/config/auth';
import { formatEmail } from './emailFormater';

function getPlainTextBody(payload) {
  let body = '';

  if (payload.parts) {
    payload.parts.forEach((part) => {
      if (part.mimeType === 'text/plain' && part.body && part.body.data) {
        body += Buffer.from(part.body.data, 'base64').toString('utf-8');
      } else if (part.parts) {
        body += getPlainTextBody(part);
      }
    });
  } else if (payload.body && payload.body.data) {
    body = Buffer.from(payload.body.data, 'base64').toString('utf-8');
  }

  return body;
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(NEXT_AUTH);

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { accessToken } = session.user;

  const oAuth2Client = new google.auth.OAuth2();
  oAuth2Client.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10, // Adjust the number of emails to fetch here
      q: 'category:primary', // Filter to only show emails from the Primary category
    });

    const messages = response.data.messages || [];

    // Fetch threads based on the threadId
    const emailThreads = await Promise.all(
      messages.map(async (message) => {
        const threadResponse = await gmail.users.threads.get({
          userId: 'me',
          id: message.threadId,
        });

        const threadMessages = threadResponse.data.messages || [];

        // Extract relevant details from each message in the thread
        const formattedMessages = threadMessages.map((msg) => {
          const headers = msg.payload.headers;
          const subjectHeader = headers.find((header) => header.name === 'Subject');
          const fromHeader = headers.find((header) => header.name === 'From');
          const subject = subjectHeader ? subjectHeader.value : 'No Subject';
          let from = 'Unknown Sender';

          if (fromHeader) {
            const match = fromHeader.value.match(/<(.+?)>/);
            if (match) {
              from = match[1];
            }
          }

          const body = getPlainTextBody(msg.payload);
          const formattedText = formatEmail(body);

          return { id: msg.id, subject, from, body: { text: formattedText, html: '' } };
        });

        return {
          threadId: message.threadId,
          messages: formattedMessages,
        };
      })
    );

    return NextResponse.json({ emailThreads }, { status: 200 });
  } catch (error) {
    console.error('Error fetching threaded conversations', error);
    return NextResponse.json({ error: 'Failed to fetch threaded conversations' }, { status: 500 });
  }
}
