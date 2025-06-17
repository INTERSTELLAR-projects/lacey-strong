import { Injectable } from '@nestjs/common';
import * as imaps from 'imap-simple';
@Injectable()
export class ImapService {
  config = {
    imap: {
      user: 'lacey@laceystrongcoaching.com',
      password: 'wppe xzhc iqol ynhk',
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
    },
  };
  async getInboxMessages(searchCriteria: any[]): Promise<string[]> {
    return await imaps.connect(this.config).then((connection) => {
      return connection.openBox('INBOX').then(() => {
        const fetchOptions = {
          bodies: ['HEADER.FIELDS (FROM)'], // only get FROM header
          markSeen: false,
        };

        return connection
          .search(searchCriteria, fetchOptions)
          .then((results) => {
            const senders = results
              .map((res) => {
                const header = res.parts.find(
                  (part) => part.which === 'HEADER.FIELDS (FROM)',
                );
                if (!header) return null;

                const fromStr = header.body.from[0];
                const match = fromStr.match(/<(.+?)>/);
                return match ? match[1] : fromStr;
              })
              .filter(Boolean);
            return senders;
          });
      });
    });
  }
}
