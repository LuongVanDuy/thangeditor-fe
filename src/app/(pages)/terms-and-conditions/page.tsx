import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="sm:pl-4 sm:pr-4 lg:pl-[64px] lg:pr-[64px] xl:pl-[108px] xl:pr-[108px] pb-[64px] py-12 flex flex-col privacy-page">
      <h1 className="text-3xl font-bold mb-8 text-center">TERMS AND CONDITIONS</h1>

      <p className="mb-6">
        Welcome to Fixelsphoto! Fixelsphoto is an online platform specializing in virtual staging and professional image
        editing.
      </p>

      <p className="mb-6">
        These Terms and Conditions (&quot;Terms,&quot; &quot;Agreement&quot;) form a binding contract between
        Fixelsphoto, Inc. (&quot;Fixelsphoto,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) and you
        (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;). This Agreement sets out the general rules and
        conditions for using the Fixelsphoto.com website and any products or services we provide (collectively, the
        &quot;Website&quot; or &quot;Services&quot;).
      </p>

      <p className="mb-6">
        By accessing or using the Fixelsphoto Platform, you agree to these Terms in full. If you do not agree, you must
        not use the Platform.
      </p>

      {/* 1. Description of Services */}
      <h2 className="text-xl font-semibold mt-10 mb-4">1. Description of Services</h2>
      <p className="mb-6">
        Fixelsphoto offers a variety of virtual staging and image editing services designed to enhance property
        listings. Our clients include real estate agents, homeowners, interior designers, photographers, remodelers, and
        renters.
      </p>
      <p className="mb-6">Our services include:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Virtual Staging</li>
        <li>Commercial Virtual Staging</li>
        <li>Matterport Virtual Staging</li>
        <li>Virtual Renovation</li>
        <li>Occupied to Vacant</li>
        <li>Day to Dusk</li>
        <li>Object Removal</li>
        <li>Image Enhancement</li>
        <li>Real Estate Video Editing</li>
      </ul>

      {/* 2. Using the Platform */}
      <h2 className="text-xl font-semibold mt-10 mb-4">2. Using the Fixelsphoto Platform</h2>

      <h3 className="text-lg font-medium mb-2">Eligibility</h3>
      <p className="mb-6">
        You must be at least the legal age of majority in your location to use the Platform. Use by individuals under 16
        years of age is strictly prohibited.
      </p>

      <h3 className="text-lg font-medium mb-2">Account Registration</h3>
      <p className="mb-6">
        Some features require you to create an account and provide accurate, up-to-date information. All personal data
        is handled in accordance with our Privacy Policy.
      </p>

      <h3 className="text-lg font-medium mb-2">Acceptable Use</h3>
      <p className="mb-4">You agree not to:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Disrupt or overload the site.</li>
        <li>Use bots, scrapers, or automated tools to collect data.</li>
        <li>Upload malicious code or attempt unauthorized access.</li>
        <li>Violate any laws or third-party rights.</li>
        <li>Use the Platform for competing services or data harvesting.</li>
      </ul>

      <h3 className="text-lg font-medium mb-2">Termination</h3>
      <p className="mb-6">
        We may suspend or close your account at any time without prior notice if you violate our policies.
      </p>

      {/* 3. Your Content */}
      <h2 className="text-xl font-semibold mt-10 mb-4">3. Your Content</h2>
      <p className="mb-6">
        &quot;Your Content&quot; includes any photos, videos, comments, or materials you upload to the Platform. By
        posting content, you grant Fixelsphoto a worldwide, non-exclusive, royalty-free, perpetual license to use,
        adapt, display, and distribute it in any format.
      </p>
      <p className="mb-6">
        You retain ownership of your content, but you must have the rights or permissions to post it. You are
        responsible for avoiding copyright infringement and paying any royalties due to third parties.
      </p>
      <p className="mb-6">We may remove your content at our discretion.</p>

      {/* 4. Our Content */}
      <h2 className="text-xl font-semibold mt-10 mb-4">4. Our Content</h2>
      <p className="mb-6">
        All intellectual property on the Platform, excluding Your Content, belongs to Fixelsphoto or its licensors. We
        grant you a limited, non-exclusive license to use our materials solely in connection with your use of the
        Services.
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Modify or redistribute our materials.</li>
        <li>Use images, videos, or graphics separately from their accompanying text.</li>
        <li>Remove copyright notices.</li>
      </ul>

      {/* 5. Trademarks */}
      <h2 className="text-xl font-semibold mt-10 mb-4">5. Trademarks</h2>
      <p className="mb-6">
        The name Fixelsphoto and its logo are trademarks of Fixelsphoto, Inc. You may not use them without prior written
        permission. Other trademarks belong to their respective owners.
      </p>

      {/* 6. Third-Party Links */}
      <h2 className="text-xl font-semibold mt-10 mb-4">6. Third-Party Links</h2>
      <p className="mb-6">
        Our site may contain links to third-party websites for your convenience. We are not responsible for the content,
        terms, or privacy practices of those sites. Accessing them is at your own risk.
      </p>

      {/* 7. Disclaimers */}
      <h2 className="text-xl font-semibold mt-10 mb-4">7. Disclaimers &amp; Limitations of Liability</h2>
      <p className="mb-6">
        We provide the Platform and Services &quot;as is&quot; without warranties of any kind, express or implied. To
        the maximum extent permitted by law, Fixelsphoto is not liable for indirect, incidental, or consequential
        damages, or for any amount exceeding USD $100 or the total you paid to Fixelsphoto in the previous 12 months,
        whichever is greater.
      </p>

      {/* 8. Indemnification */}
      <h2 className="text-xl font-semibold mt-10 mb-4">8. Indemnification</h2>
      <p className="mb-6">
        You agree to defend and indemnify Fixelsphoto from and against any claims, damages or expenses arising from:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Your violation of these Terms.</li>
        <li>Any infringement by Your Content.</li>
        <li>Your misuse of the Platform.</li>
      </ul>

      {/* 9. Payments */}
      <h2 className="text-xl font-semibold mt-10 mb-4">9. Payments</h2>
      <p className="mb-6">
        You agree to pay all applicable fees according to the billing terms in effect at the time of purchase. We
        reserve the right to refuse or cancel orders and to limit purchases per account, payment method, or shipping
        address.
      </p>

      {/* 10. Changes to Terms */}
      <h2 className="text-xl font-semibold mt-10 mb-4">10. Changes to Terms</h2>
      <p className="mb-6">
        We may update these Terms at any time. Changes take effect immediately upon posting. Your continued use of the
        Platform indicates acceptance of the updated Terms.
      </p>

      {/* 11. Money-Back Guarantee */}
      <h2 className="text-xl font-semibold mt-10 mb-4">11. Money-Back Guarantee</h2>
      <p className="mb-6">
        If you are not satisfied after engaging with our design process and providing feedback, we may refund your
        purchase to your original payment method.
      </p>

      {/* 12. Violations */}
      <h2 className="text-xl font-semibold mt-10 mb-4">12. Violations</h2>
      <p className="mb-6">
        We may suspend or terminate accounts, remove content, or deny service to users who violate these Terms or
        applicable laws.
      </p>

      {/* 13. Miscellaneous */}
      <h2 className="text-xl font-semibold mt-10 mb-4">13. Miscellaneous</h2>
      <p className="mb-6">
        These Terms do not create any partnership or agency relationship. You may not assign your rights under these
        Terms, but we may assign ours.
      </p>

      <h3 className="text-lg font-medium mt-8 mb-2">Acceptance of Terms</h3>
      <p className="mb-6">
        By using Fixelsphoto&apos;s Website or Services, you confirm that you have read and agree to these Terms in
        full.
      </p>
    </div>
  );
};

export default TermsAndConditions;
