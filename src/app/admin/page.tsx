'use client';

import { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    netlifyIdentity?: any;
    CMS?: any;
  }
}

export default function AdminPage() {
  useEffect(() => {
    // Decap CMSの初期化
    if (typeof window !== 'undefined') {
      // Netlify Identity Widgetの初期化
      if (window.netlifyIdentity) {
        window.netlifyIdentity.on('init', (user: any) => {
          if (!user) {
            window.netlifyIdentity?.on('login', () => {
              document.location.href = '/admin/';
              window.netlifyIdentity?.close();
            });
          }
        });
      }
    }
  }, []);

  return (
    <>
      <div id="nc-root" className="min-h-screen"></div>
      <Script
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
        strategy="afterInteractive"
      />
    </>
  );
}
