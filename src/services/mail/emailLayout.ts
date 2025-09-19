import { branding } from '@config/globals';

// eslint-disable-next-line max-len
export const header = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>You're on the waitlist — Thanks!</title>
  <style>
    /* Basic resets for better cross-client rendering */
    body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table { border-spacing: 0; }
    img { border: 0; display: block; }
    a { color: inherit; text-decoration: none; }
    /* Responsive */
    @media only screen and (max-width:480px) {
      .container { width: 100% !important; padding: 20px !important; }
      .stack { display:block !important; width:100% !important; }
      .hero-title { font-size: 22px !important; line-height: 28px !important; }
      .btn { width: 100% !important; }
    }
  </style>
</head>
<body style="background-color: #F5F4FF; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; color: #111;">
    
    `;

export const footer = `<div class="footer">
            <div>
            <img class="logo" src="cid:uniqueImageCID" alt="Embedded Image">
            </div>
          <p class="copyright">&copy; 2024 ${branding.BRAND_NAME}. All rights reserved.</p>
          <p class="copyright"><strong>${branding.BRAND_NAME}</strong></p>
        </span>
            
        </div>
    </div>
`;
