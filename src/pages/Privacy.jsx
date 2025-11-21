import React from "react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">
          <strong>Effective Date:</strong> November 21, 2025
        </p>
        <p className="text-gray-700 mb-4">
          Your privacy is important to us. This Privacy Policy explains how <strong>Job Application Tracker</strong> (“we,” “our,” “us”) collects, uses, and protects your information when you use our Service, including Google login.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">1. Information We Collect</h2>
        <p className="text-gray-700 mb-4">
          When you use Google login, we may collect:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Your name and profile picture</li>
          <li>Your email address</li>
        </ul>
        <p className="text-gray-700 mb-4">
          We also collect information about your use of the Service, including the jobs you track and app activity.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">2. How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">
          We use your information to:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Authenticate your account via Google</li>
          <li>Provide and improve the Service</li>
          <li>Communicate updates, reminders, and notifications</li>
        </ul>
        <p className="text-gray-700 mb-4">We do not sell your data to third parties.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">3. Data Storage and Security</h2>
        <p className="text-gray-700 mb-4">
          We store your data securely in our database and implement reasonable technical and administrative measures to protect it from unauthorized access or disclosure.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">4. Third-Party Services</h2>
        <p className="text-gray-700 mb-4">
          Google handles authentication securely. By signing in with Google, you allow Google to share basic account information with us. We are not responsible for Google’s privacy practices.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">5. Cookies and Tracking</h2>
        <p className="text-gray-700 mb-4">
          We may use cookies or similar technologies to improve user experience and analyze app usage.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">6. Your Choices</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>You can delete your account anytime.</li>
          <li>You can revoke Google access from your Google account settings.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">7. Children’s Privacy</h2>
        <p className="text-gray-700 mb-4">
          The Service is not intended for children under 13. We do not knowingly collect information from children.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">8. Changes to Privacy Policy</h2>
        <p className="text-gray-700 mb-4">
          We may update this Privacy Policy. Updates will be posted here with a revised effective date.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">9. Contact Us</h2>
        <p className="text-gray-700">
          For privacy questions or concerns, contact us at <strong>litojrgalan@gmail.com</strong>.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
