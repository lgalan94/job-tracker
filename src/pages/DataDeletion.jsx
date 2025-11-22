import React from "react";

export default function DataDeletionInstructions() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <h1>Data Deletion Instructions</h1>

      <p>
        If you have logged in to our application using Facebook Login, you have
        the right to request deletion of your account and all associated
        personal data stored on our servers.
      </p>

      <h2>How to Request Data Deletion</h2>

      <h3>Option 1 – Request via Email</h3>
      <p>
        You can submit a data deletion request by sending us an email at:
      </p>
      <p>
        <strong>litojrgalan@gmail.com</strong>
      </p>
      <p>Please include:</p>
      <ul>
        <li>Your full name</li>
        <li>Your Facebook-associated email</li>
        <li>A clear statement requesting account and data deletion</li>
      </ul>
      <p>
        Once received, we will process your request within <strong>7 business
        days</strong>.
      </p>

      <h3>Option 2 – Request Through Facebook</h3>
      <ol>
        <li>Open Facebook</li>
        <li>Go to <strong>Settings &amp; Privacy</strong></li>
        <li>Select <strong>Settings</strong></li>
        <li>Go to <strong>Apps and Websites</strong></li>
        <li>Find our application and click <strong>Remove</strong></li>
        <li>Confirm removal</li>
      </ol>

      <h2>What Data Is Deleted</h2>
      <p>Upon confirmation, we delete:</p>
      <ul>
        <li>Account information (name, email, Facebook ID)</li>
        <li>Stored login records</li>
        <li>Any app usage data linked to your profile</li>
      </ul>

      <p>
        After deletion, your account will no longer exist and cannot be restored.
      </p>

      <h2>Data Retention</h2>
      <p>
        We retain user data only while the account remains active. Once a
        deletion request is processed, all data is permanently removed from our
        system.
      </p>
    </div>
  );
}
