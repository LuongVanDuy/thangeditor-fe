import React from "react";

const CookiePolicy = () => {
  return (
    <div className="sm:pl-4 sm:pr-4 lg:pl-[64px] lg:pr-[64px] xl:pl-[108px] xl:pr-[108px] pb-[64px] py-12 flex flex-col privacy-page">
      <h1 className="text-3xl font-bold mb-8 text-center">COOKIE POLICY</h1>

      <p className="mb-6">
        Your privacy is important to Thangeditor (collectively, &quot;Thangeditor,&quot; &quot;we,&quot; or
        &quot;us&quot;). This Cookie Policy explains what cookies (a term we use to include other tracking technologies
        as well) are, and how they may be used on Thangeditor websites, products, and services (the &quot;Online
        Services&quot;).
      </p>

      <p className="mb-6">
        By accessing or using our Online Services, you acknowledge and agree that we may use information obtained from
        cookies and other tracking technologies in accordance with this Policy. If you do not agree, please stop using
        the Online Services immediately. This Policy does not apply to services offered by other companies or to
        third-party websites linked from our Online Services.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">Changes to This Policy</h2>
      <p className="mb-6">
        We may update this Policy at any time to reflect changes in our use of cookies or tracking technologies. Once
        posted, any changes become effective upon your continued use of the Online Services.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">What Are Cookies?</h2>
      <p className="mb-6">
        Cookies are small data files placed on your computer or browser by Thangeditor (first-party cookies) or by our
        partners (third-party cookies) when you use our Online Services. They are widely used to enable website
        functionality, improve efficiency, personalize experiences, and provide analytical information.
      </p>

      <p className="mb-6">
        Third-party cookies often support features such as advertising, interactive content, social media integration,
        and analytics. These may allow us and our partners to track your activity over time and across multiple websites
        and devices.
      </p>

      <p className="mb-6">
        We use &quot;cookies&quot; as a general term for a range of tracking tools. Note that cookies are not the only
        way to store information or track activity — for example, local storage on your device also holds essential data
        for our Online Services. Unlike cookies, local storage data does not expire until deleted by you or us.
      </p>

      <p className="mb-6">
        Some cookie data may qualify as personal information (e.g., IP addresses or identifiers), and we handle it
        according to our Privacy Notice.
      </p>

      <h3 className="text-lg font-medium mb-2">Cookie duration</h3>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>
          <strong>Persistent cookies</strong> remain on your device for a set period and help us recognize you on repeat
          visits.
        </li>
        <li>
          <strong>Session cookies</strong> are deleted when you close your browser or shortly afterward.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-10 mb-4">Why Thangeditor uses Cookies</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Ensure technical operation and security of our Online Services.</li>
        <li>Help users log in and navigate our platform.</li>
        <li>Analyze usage patterns, fix technical issues, and improve user experience.</li>
        <li>Customize content and advertising based on user interests.</li>
      </ul>
      <p className="mb-6">
        Some cookies are strictly necessary, while others support analytics, personalization, and targeted advertising.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">Types of Cookies we use</h2>

      <h3 className="text-lg font-medium mb-2">Essential Cookies</h3>
      <p className="mb-6">
        Required for our Online Services to function properly, such as enabling secure login or navigation. These cannot
        be disabled in our systems. Blocking them may cause parts of the site to stop working.
      </p>

      <h3 className="text-lg font-medium mb-2">Performance Cookies</h3>
      <p className="mb-6">
        Help us understand how our Online Services are used, which pages are most popular, and how effective our
        marketing is. These may collect IP addresses or generate unique identifiers.
      </p>

      <h3 className="text-lg font-medium mb-2">Functional Cookies</h3>
      <p className="mb-6">
        Allow enhanced features such as remembering preferences, language settings, or form inputs. Disabling them may
        reduce certain functionalities.
      </p>

      <h3 className="text-lg font-medium mb-2">Targeting Cookies</h3>
      <p className="mb-6">
        Used by us and our advertising partners to build a profile of your interests and display relevant ads across
        other websites. These may be linked to device IDs or email addresses.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-4">Managing your Cookie choices</h2>

      <h3 className="text-lg font-medium mb-2">Via your browser</h3>
      <p className="mb-6">
        You can enable, disable, or delete cookies through your browser settings. Check your browser’s instructions or
        visit{" "}
        <a
          href="https://www.allaboutcookies.org"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          All About Cookies
        </a>{" "}
        (independent resource) for guidance.
      </p>

      <h3 className="text-lg font-medium mb-2">Via Self regulatory programs</h3>
      <p className="mb-6">
        You can opt out of targeted advertising through programs like the Digital Advertising Alliance (U.S. – Ad
        Choices), Your Ad Choices (Canada), or Your Online Choices (EEA &amp; UK). The Network Advertising Initiative
        also offers opt-out tools for interest-based advertising.
      </p>

      <h3 className="text-lg font-medium mb-2">Direct Opt out from third parties</h3>
      <p className="mb-6">
        Some analytics and advertising providers offer direct opt-out options. For instance, Google Analytics allows
        users to opt out via a browser extension{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        .
      </p>

      <p className="mb-6">
        <strong>Please note:</strong> Disabling cookies may impact functionality, including login access, preference
        settings, and integrations with other services.
      </p>
    </div>
  );
};

export default CookiePolicy;
