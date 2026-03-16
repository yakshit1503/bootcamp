import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAutoFill = () => {
    setFormData({
      name: 'Test User',
      email: 'chawla.yakshit@gmail.com',
      subject: 'Test message',
      message: 'This is a test message from auto-fill for integration testing.'
    });
    setStatusMessage('Auto-filled form. Click Send Message.');
    setStatusType('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
    const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const toEmail = import.meta.env.VITE_EMAILJS_TO_EMAIL;
    const sheetsWebhook = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;

    if (!serviceId || !adminTemplateId || !publicKey || !toEmail) {
      alert('EmailJS is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_ADMIN_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY, and VITE_EMAILJS_TO_EMAIL to your .env file.');
      console.error('Missing EmailJS config', { serviceId, adminTemplateId, publicKey, toEmail, autoReplyTemplateId, sheetsWebhook });
      return;
    }
    if (!autoReplyTemplateId) {
      console.warn('Auto-reply template ID missing: no auto-reply will be sent. Set VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID in .env.');
    }

    setIsSubmitting(true);
    setStatusMessage('');
    setStatusType('');
    try {
      // Send message to admin inbox (contains only form data)
      const csvData = `Name,Email,Subject,Message\n"${formData.name}","${formData.email}","${formData.subject}","${formData.message}"`;
      const adminTableMessage = `\n<table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse;">\n  <tr><th align="left">Field</th><th align="left">Value</th></tr>\n  <tr><td>Name</td><td>${formData.name}</td></tr>\n  <tr><td>Email</td><td>${formData.email}</td></tr>\n  <tr><td>Subject</td><td>${formData.subject}</td></tr>\n  <tr><td>Message</td><td>${formData.message}</td></tr>\n</table>`;
      const adminResponse = await emailjs.send(
        serviceId,
        adminTemplateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          admin_subject: `New contact form submission: ${formData.subject}`,
          admin_message_table: adminTableMessage,
          admin_csv_data: csvData,
          to_email: toEmail,
        },
        publicKey
      );
      console.log('Admin message sent:', adminResponse);

      // Add row to Google Sheets via webhook if configured
      if (sheetsWebhook) {
        await fetch(sheetsWebhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            submittedAt: new Date().toISOString()
          })
        });
      }

      // Send auto-reply to user if auto-reply template configured
      if (autoReplyTemplateId && adminTemplateId !== autoReplyTemplateId) {
        const autoReplyResponse = await emailjs.send(
          serviceId,
          autoReplyTemplateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            reply_subject: `Thanks for your message: ${formData.subject}`,
            reply_message: `Hi ${formData.name},\n\nThanks for reaching out. We received your message and will respond shortly.\n\nYour message: ${formData.message}`,
            to_email: formData.email,
          },
          publicKey
        );
        console.log('Auto reply sent:', autoReplyResponse);
      } else if (autoReplyTemplateId) {
        console.warn('Skipped auto-reply because admin and auto-reply template IDs are identical.');
      }

      setStatusMessage('Message sent successfully! Admin and auto-reply completed.');
      setStatusType('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      const errText =
        error && typeof error === 'object' && 'text' in error
          ? (error as any).text
          : 'Unknown error';
      setStatusMessage(
        `Failed to send message: ${errText}. Check your EmailJS template recipient and env keys.`
      );
      setStatusType('error');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex-1 py-24">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Send Us a Message
            </CardTitle>
            <p className="text-center text-gray-600">
              Have questions about our bootcamps? We'd love to hear from you!
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button type="button" className="w-full sm:w-auto" onClick={handleAutoFill}>
                  Auto fill test data
                </Button>
                <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
              {statusMessage && (
                <p
                  className={`mt-3 text-sm ${statusType === 'success' ? 'text-green-600' : 'text-red-600'}`}
                >
                  {statusMessage}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
        <div className="mt-12 text-center text-gray-500">
          <p>Or email us directly at <a href="mailto:cyberchord.canada@gmail.com" className="text-primary hover:underline font-medium">cyberchord.canada@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default Contact;

