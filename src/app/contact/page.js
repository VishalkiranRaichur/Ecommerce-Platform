'use client'

import { useState } from 'react'
import WhatsAppButton from '@/components/WhatsAppButton'
import InstagramButton from '@/components/InstagramButton'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, subject, message } = formData
    const mailtoLink = `mailto:info@sujathaboutique.com?subject=${encodeURIComponent(subject || 'Contact from Sujatha Boutique')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`
    window.location.href = mailtoLink
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600">
            We'd love to hear from you. Reach out through any of these channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
              Get in Touch
            </h2>
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  WhatsApp
                </h3>
                <p className="text-gray-600 mb-4">
                  Quick and easy! Send us a message on WhatsApp for instant support and ordering.
                </p>
                <WhatsAppButton 
                  phoneNumber="+917795855292" 
                  message="Hello! I'm interested in your products." 
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Instagram
                </h3>
                <p className="text-gray-600 mb-4">
                  Follow us for the latest collections and send us a DM for inquiries.
                </p>
                <InstagramButton username="sujatha.m798" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Email
                </h3>
                <p className="text-gray-600">
                  For detailed inquiries or custom orders, email us at{' '}
                  <a 
                    href="mailto:info@sujathaboutique.com" 
                    className="text-primary-600 hover:text-primary-700 underline"
                  >
                    info@sujathaboutique.com
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Business Hours
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>Monday - Saturday: 10:00 AM - 7:00 PM</p>
                <p>Sunday: 12:00 PM - 5:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
