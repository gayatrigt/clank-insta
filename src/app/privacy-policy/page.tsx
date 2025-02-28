// app/privacy-policy/page.js
import React from 'react';

export const metadata = {
    title: 'Privacy Policy | Clank Insta',
    description: 'Privacy Policy for Clank Insta application',
};

export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy for Clank Insta</h1>
            <p className="text-sm text-gray-600 mb-8">Last Updated: February 28, 2025</p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="mb-4">
                    Welcome to Clank Insta. We respect your privacy and are committed to protecting your personal data.
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

                <div className="mb-4">
                    <h3 className="text-xl font-medium mb-2">2.1 Information You Provide</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Account Information</strong>: When you register, we collect your name, email address, username, and password.</li>
                        <li><strong>Profile Information</strong>: Any information you add to your profile such as profile picture, bio, and other details you choose to share.</li>
                        <li><strong>Content</strong>: Photos, videos, comments, messages, and other content you post or share through our service.</li>
                        <li><strong>Communications</strong>: Information you provide when you contact us for support or communicate with other users.</li>
                    </ul>
                </div>

                <div className="mb-4">
                    <h3 className="text-xl font-medium mb-2">2.2 Information Automatically Collected</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Device Information</strong>: We collect information about the device you use to access our service, including hardware model, operating system, unique device identifiers, and mobile network information.</li>
                        <li><strong>Log Data</strong>: Our servers automatically record information including your IP address, browser type, referring/exit pages, operating system, date/time stamps, and clickstream data.</li>
                        <li><strong>Usage Information</strong>: We collect information about how you use our service, including the content you view, features you use, and the actions you take.</li>
                        <li><strong>Location Information</strong>: With your consent, we may collect and process information about your precise or approximate location.</li>
                    </ul>
                </div>

                <div className="mb-4">
                    <h3 className="text-xl font-medium mb-2">2.3 Information from Third Parties</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Social Media</strong>: If you choose to link our service with a third-party account (like Facebook), we may receive information from that service, such as your profile information and friends list.</li>
                        <li><strong>Analytics Providers</strong>: We work with analytics providers to help us understand how users engage with our service.</li>
                    </ul>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process and complete transactions</li>
                    <li>Send you technical notices, updates, security alerts, and support messages</li>
                    <li>Respond to your comments, questions, and requests</li>
                    <li>Communicate with you about products, services, offers, and events</li>
                    <li>Monitor and analyze trends, usage, and activities in connection with our service</li>
                    <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                    <li>Personalize and improve the service and provide content or features that match user profiles or interests</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. How We Share Your Information</h2>
                <p className="mb-4">We may share your information in the following situations:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>With Your Consent</strong>: We may share information when you direct us to do so.</li>
                    <li><strong>With Service Providers</strong>: We share information with vendors and service providers who need access to such information to carry out work on our behalf.</li>
                    <li><strong>For Legal Purposes</strong>: We may disclose information in response to a legal request if we believe disclosure is required by law.</li>
                    <li><strong>Business Transfers</strong>: If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
                    <li><strong>Aggregated or De-identified Information</strong>: We may share information that has been aggregated or de-identified, so that it can no longer reasonably be used to identify you.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
                <p>We store the information we collect for as long as it is necessary for the purpose(s) for which we originally collected it. We may retain certain information for legitimate business purposes or as required by law.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Your Rights and Choices</h2>
                <p className="mb-4">Depending on your location, you may have certain rights regarding your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Access</strong>: You can request access to your personal information.</li>
                    <li><strong>Correction</strong>: You can request that we correct inaccurate or incomplete information.</li>
                    <li><strong>Deletion</strong>: You can request that we delete your personal information.</li>
                    <li><strong>Restriction</strong>: You can request that we restrict the processing of your information.</li>
                    <li><strong>Data Portability</strong>: You can request a copy of the information you provided to us in a machine-readable format.</li>
                    <li><strong>Objection</strong>: You can object to our processing of your information.</li>
                    <li><strong>Consent Withdrawal</strong>: If we process your information based on your consent, you can withdraw your consent at any time.</li>
                </ul>
                <p className="mt-4">To exercise these rights, please contact us using the information provided in the &quot;Contact Us&quot; section.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. International Data Transfers</h2>
                <p>We may transfer, store, and process your information in countries other than your own. Our servers may be located outside your jurisdiction. By accessing or using our service, you consent to the transfer of information to countries that may have different data protection rules than your country.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Data Security</h2>
                <p>We implement appropriate technical and organizational measures to protect your personal information against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Children&apos;s Privacy</h2>
                <p>Our service is not directed to children under the age of 13 (or higher if required by applicable law). We do not knowingly collect personal information from children. If we learn that we have collected personal information from a child, we will take steps to delete that information as quickly as possible.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. Third-Party Links and Services</h2>
                <p>Our service may contain links to third-party websites, services, or applications that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party services. We encourage you to review the privacy policies of these third-party services.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">11. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. We will provide additional notice (such as an email notification) if the changes are material.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">12. Facebook Data</h2>
                <p className="mb-4">If you access our application through Facebook:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>We comply with Facebook&apos;s Platform Policies.</li>
                    <li>We don&apos;t transfer any data you receive from us to any ad network, data broker, or other advertising or monetization-related service.</li>
                    <li>We may share your information with Facebook for analytics purposes.</li>
                    <li>We may use Facebook Login or other Facebook features, and Facebook&apos;s Privacy Policy applies to information collected in association with these features.</li>
                    <li>We only request the permissions and data we need to provide our service.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
                <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at:</p>
                <p className="mb-2">Email: <a href="mailto:privacy@clankinsta.com" className="text-blue-600 hover:underline">privacy@clankinsta.com</a></p>
                <p>Postal Address: [Your Company Address]</p>
            </section>
        </div>
    );
}