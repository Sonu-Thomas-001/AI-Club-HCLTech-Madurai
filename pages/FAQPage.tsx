import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Accordion } from '../components/Accordion';

const faqs = [
  { q: "Who can join the AI Club?", a: "Any employee of HCLTech Madurai with a passion for Artificial Intelligence is welcome to join, regardless of their current role or department." },
  { q: "Do I need prior experience in AI?", a: "No, prior experience is not required. We have resources and learning paths for all skill levels, from beginners to experts." },
  { q: "What is the time commitment?", a: "The time commitment is flexible. You can contribute as much or as little as you want, depending on your interest and availability. Members typically participate in workshops, work on projects, or attend talks." },
  { q: "How are projects selected?", a: "Projects are proposed by members and selected based on their potential impact, feasibility, and alignment with the club's goals. All members are encouraged to pitch their ideas." },
  { q: "Are there any membership fees?", a: "No, membership in the AI Club is completely free for all HCLTech employees." },
  { q: "How can I become a mentor or speaker?", a: "We are always looking for experts to share their knowledge. Please reach out to us through the contact page with your area of expertise, and we'll get in touch."}
];

export const FAQPage: React.FC = () => {
  return (
    <>
      <PageHeader title="Frequently Asked Questions" subtitle="Find answers to common questions about the AI Club." />
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto glass-card p-4 sm:p-8 rounded-2xl shadow-lg">
            {faqs.map((faq, index) => (
              <Accordion key={index} title={faq.q}>
                <p>{faq.a}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
