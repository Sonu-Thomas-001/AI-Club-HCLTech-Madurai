import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { BrainCircuit, Code, Users } from '../components/Icons';

const InputField: React.FC<{ label: string; type: string; placeholder: string; name: string }> = ({ label, type, placeholder, name }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-hcl-blue transition"
      placeholder={placeholder}
      required
    />
  </div>
);

const SelectField: React.FC<{label: string; name: string; children: React.ReactNode}> = ({label, name, children}) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{label}</label>
        <select
            name={name}
            id={name}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-primary-text dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-hcl-blue transition"
            required
        >
            {children}
        </select>
    </div>
);


const RadioGroupField: React.FC<{label: string; name: string; options: string[]}> = ({label, name, options}) => (
    <div>
        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{label}</label>
        <div className="flex flex-wrap gap-4">
            {options.map(option => (
                <div key={option} className="flex items-center">
                    <input type="radio" id={`${name}-${option}`} name={name} value={option} className="h-4 w-4 text-hcl-blue focus:ring-hcl-blue border-gray-300" />
                    <label htmlFor={`${name}-${option}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">{option}</label>
                </div>
            ))}
        </div>
    </div>
);


export const JoinUsPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your application!");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <PageHeader title="Join Our Community" subtitle="Become a part of our vibrant club and start your journey in AI innovation." />
      
      {/* Benefits Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-center mb-12">Why Join the AI Club?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card 
              icon={<Code className="w-8 h-8 text-hcl-blue" />}
              title="Hands-On Experience" 
              description="Gain practical experience by working on real-world AI projects, from ideation to deployment."
            />
            <Card 
              icon={<BrainCircuit className="w-8 h-8 text-hcl-blue" />}
              title="Knowledge Sharing" 
              description="Participate in workshops, tech talks, and study groups to stay ahead of the curve in the rapidly evolving field of AI."
            />
            <Card 
              icon={<Users className="w-8 h-8 text-hcl-blue" />}
              title="Networking Opportunities" 
              description="Connect with like-minded peers, mentors, and industry experts within HCLTech and beyond."
            />
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-center mb-8">Membership Application</h2>
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 rounded-3xl shadow-lg space-y-6">
              <InputField label="Full Name" type="text" name="name" placeholder="Enter your full name" />
              <InputField label="HCLTech Email" type="email" name="email" placeholder="your.name@hcltech.com" />
              <InputField label="Department / Role" type="text" name="department" placeholder="e.g., Software Engineer, Digital" />
               <SelectField label="Area of Interest" name="interestArea">
                  <option>Generative AI</option>
                  <option>Machine Learning</option>
                  <option>Computer Vision</option>
                  <option>Cloud AI</option>
                  <option>AI Ethics & Research</option>
               </SelectField>
                <SelectField label="Skill Level" name="skillLevel">
                  <option>Beginner (Just curious!)</option>
                  <option>Intermediate (Have some experience)</option>
                  <option>Advanced (Ready to lead!)</option>
               </SelectField>
               <RadioGroupField label="Preferred Role" name="role" options={['Member', 'Contributor', 'Mentor', 'Speaker']} />
              <div>
                <label htmlFor="interests" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Why do you want to join? (Optional)</label>
                <textarea
                  id="interests"
                  name="interests"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-hcl-blue transition"
                  placeholder="Tell us about your interest in AI..."
                ></textarea>
              </div>
              <div className="text-center pt-4">
                <Button type="submit" className="w-full md:w-auto">Submit Application</Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
