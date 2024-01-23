'use client';

import { Contact } from '@/types/contact';
import Link from 'next/link';
import { useState } from 'react';

export default function PersonalLinks({ contacts }: { contacts: Contact[] }) {
  const contactStates = Object.fromEntries(
    contacts.map((contact) => [[contact.attributes.Title], false])
  );

  const [clicked, setClicked] = useState({
    ...contactStates,
  });

  return (
    <div className='flex flex-col items-end'>
      {contacts.map((c: Contact, i: number) => {
        const contact = c.attributes;

        // URL Contacts (regular links)
        if (contact.Type === 'URL') {
          return (
            <Link
              key={i}
              href={contact.Address as string}
              target='_blank'
              className='footer-link col-start-2 md:col-start-3 2xl:col-start-3'
            >
              {contact.Title}
            </Link>
          );
        }

        // Phone & Email Contacts (links revealing on click)
        if (contact.Type === 'Phone' || 'Email') {
          return clicked[contact.Title as string] ? (
            <Link
              key={i}
              href={
                contact.Type === 'Phone'
                  ? `tel:${contact.Address}`
                  : `mailto:${contact.Address}`
              }
              className='footer-link col-start-2 md:col-start-3 2xl:col-start-3'
            >
              {contact.Address}
            </Link>
          ) : (
            <span
              key={i}
              onClick={() => {
                setClicked((prevState: typeof contactStates) => ({
                  ...prevState,
                  [contact.Title as string]:
                    !prevState[contact.Title as string],
                }));
              }}
              className='footer-link col-start-2 md:col-start-3 2xl:col-start-3'
            >
              {contact.Title}
            </span>
          );
        }
      })}
    </div>
  );
}
