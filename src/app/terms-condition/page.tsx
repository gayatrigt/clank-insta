/* eslint-disable react/no-unescaped-entities */
// app/terms-conditions/page.js
import React from 'react';

export const metadata = {
    title: 'Terms and Conditions | Clank Insta',
    description: 'Terms and Conditions for Clank Insta application',
};

export default function TermsAndConditions() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Terms and Conditions for Clank Insta</h1>
            <p className="text-sm text-gray-600 mb-8">Last Updated: February 28, 2025</p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                <p>
                    By accessing or using Clank Insta (the &quot;Service&quot;), you agree to be bound by these Terms and Conditions ("Terms&quot;).
                    If you disagree with any part of the terms, you may not access the Service.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property Rights</h2>
                <p>
                    The Service and its original content, features, and functionality are and will remain the exclusive property of
                    Clank Insta and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks
                    and trade dress may not be used in connection with any product or service without prior written consent.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>

                <div className="mb-4">
                    <h3 className="text-xl font-medium mb-2">3.1 Account Creation</h3>
                    <p>
                        To use certain features of the Service, you must register for an account. You agree to provide accurate,
                        current, and complete information during the registration process and to update such information to keep it
                        accurate, current, and complete.
                    </p>
                </div>

                <div className="mb-4">
                    <h3 className="text-xl font-medium mb-2">3.2 Account Responsibilities</h3>
                    <p>
                        You are responsible for safeguarding the password that you use to access the Service and for any activities
                        or actions under your password. You agree not to disclose your password to any third party. You must notify us
                        immediately upon becoming aware of any breach of security or unauthorized use of your account.
                    </p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. User Content</h2>

                <div className="mb-4">
                    <h3 className="text-xl font-medium mb-2">4.1 Content Ownership</h3>
                    <p>
                        By posting, uploading, or sharing content on or through the Service, you grant us a worldwide, non-exclusive,
                        royalty-free license to use, copy, modify, create derivative works based upon, distribute, publicly display, and
                        publicly perform your content in connection with operating and providing the Service.
                    </p>
                </div>

                <div className="mb-4">
                    <h3 className="text-xl font-medium mb-2">4.2 Content Responsibility</h3>
                    <p>
                        You are solely responsible for your content and the consequences of posting or publishing it. We have no obligation
                        to monitor user content but reserve the right to remove content that violates these Terms or that we find objectionable.
                    </p>
                </div>

                <div className="mb-4">
                    <h3 className="text-xl font-medium mb-2">4.3 Prohibited Content</h3>
                    <p className="mb-4">
                        You may not post content that:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or invasive of another's privacy</li>
                        <li>Infringes any intellectual property or other right of any entity or person</li>
                        <li>Violates any law or regulation</li>
                        <li>Contains software viruses or any other code designed to interfere with the functionality of the Service</li>
                        <li>Constitutes unauthorized or unsolicited advertising, junk or bulk email ("spamming")</li>
                        <li>Impersonates any person or entity</li>
                    </ul>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use</h2>

                <p className="mb-4">You agree not to use the Service to:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Violate any law or regulation</li>
                    <li>Harass, abuse, or harm another person</li>
                    <li>Impersonate or misrepresent your affiliation with any person or entity</li>
                    <li>Send unsolicited or unauthorized advertising or commercial communications</li>
                    <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
                    <li>Collect or store personal data about other users without their consent</li>
                    <li>Attempt to access accounts or data that does not belong to you</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Third-Party Links</h2>
                <p>
                    The Service may contain links to third-party websites or services that are not owned or controlled by Clank Insta.
                    We have no control over, and assume no responsibility for the content, privacy policies, or practices of any
                    third-party websites or services. We do not warrant the offerings of any of these entities/individuals or their websites.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
                <p>
                    We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability,
                    under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms. If you wish
                    to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
                <p>
                    In no event shall Clank Insta, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable
                    for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits,
                    data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use
                    the Service.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Disclaimer</h2>
                <p>
                    Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service
                    is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties
                    of merchantability, fitness for a particular purpose, non-infringement or course of performance.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
                <p>
                    These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its
                    conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver
                    of those rights.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
                <p>
                    We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least
                    30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole
                    discretion. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the
                    revised terms.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">12. Facebook Platform</h2>
                <p className="mb-4">
                    If you access our Service through Facebook:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>You agree to comply with all Facebook terms and policies, including Facebook&apos;s Platform Policies.</li>
                    <li>You agree not to use Facebook&apos;s platform to violate, misappropriate, or infringe any third party&apos;s rights.</li>
                    <li>You may not use Facebook-specific information obtained from us to provide a service that Facebook deems competitive with Facebook products or services.</li>
                    <li>You understand that we may share your information with Facebook for analytics purposes and to improve your experience on the Service.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
                <p className="mb-4">
                    If you have any questions about these Terms, please contact us at:
                </p>
                <p className="mb-2">Email: <a href="mailto:terms@clankinsta.com" className="text-blue-600 hover:underline">terms@clankinsta.com</a></p>
                <p>Postal Address: [Your Company Address]</p>
            </section>
        </div>
    );
}