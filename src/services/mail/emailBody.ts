/* eslint-disable max-len */
import { mailConfig } from '@config/globals';
import { footer, header } from './emailLayout';
import { IContactUsTempalate } from './types';

const getWaitlistTemplate = () => {
    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>You're on the waitlist — Thanks!</title>
    <style>
      /* Basic resets for better cross-client rendering */
      body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table {
        border-spacing: 0;
      }
      img {
        border: 0;
        display: block;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      /* Responsive */
      @media only screen and (max-width: 480px) {
        .container {
          width: 100% !important;
          padding: 20px !important;
        }
        .stack {
          display: block !important;
          width: 100% !important;
        }
        .hero-title {
          font-size: 22px !important;
          line-height: 28px !important;
        }
        .btn {
          width: 100% !important;
        }
      }
    </style>
  </head>
  <body
    style="
      background-color: #f5f4ff;
      font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Arial, sans-serif;
      color: #111;
    "
  >
    <!-- Preheader (hidden in email body, shown in preview) -->
    <div
      style="display: none; max-height: 0px; overflow: hidden; mso-hide: all"
    >
      You're on the waitlist for Leak Notifier — we'll notify you
      when it's your turn.
    </div>

    <!-- Outer wrapper -->
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="background-color: #f5f4ff; width: 100%"
    >
      <tr>
        <td align="center" style="padding: 28px 16px">
          <!-- Card / Container -->
          <table
            role="presentation"
            class="container"
            cellpadding="0"
            cellspacing="0"
            width="600"
            style="
              max-width: 600px;
              width: 100%;
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 6px 18px rgba(41, 4, 75, 0.08);
            "
          >
            <!-- Header -->
            <tr>
              <td
                style="
                  background: linear-gradient(90deg, #680bbd 0%, #29044b 100%);
                  padding: 18px 24px;
                "
              >
                <table role="presentation" width="100%">
                  <tr>
                    <td style="vertical-align: middle">
                      <!-- Logo or App name -->
                      <h1
                        style="
                          margin: 0;
                          font-size: 20px;
                          color: #fff;
                          font-weight: 700;
                          letter-spacing: -0.2px;
                        "
                      >
                        Leak Notifier — Early Access
                      </h1>
                    </td>
                    <td align="right" style="vertical-align: middle">
                      <!-- Small badge -->
                      <div
                        style="
                          display: inline-block;
                          background: rgba(255, 255, 255, 0.12);
                          color: #fff;
                          padding: 6px 10px;
                          border-radius: 8px;
                          font-size: 12px;
                        "
                      >
                        Waitlist
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 28px 28px 8px 28px">
                <h2
                  class="hero-title"
                  style="
                    margin: 0 0 12px 0;
                    font-size: 26px;
                    line-height: 32px;
                    color: #29044b;
                  "
                >
                  You're on the waitlist 👋
                </h2>
                <p
                  style="
                    margin: 0 0 16px 0;
                    color: #333;
                    font-size: 15px;
                    line-height: 22px;
                  "
                >
                  Thanks for signing up — we've added you to our early access
                  waitlist. We'll send an invite when it's your turn.
                </p>

                <!-- Card with info -->
                <table
                  role="presentation"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    margin-top: 16px;
                    border-radius: 8px;
                    border: 1px solid #f0efff;
                    background: #f8f7ff;
                  "
                >
                  <tr>
                    <td
                      style="padding: 12px 14px; font-size: 14px; color: #333"
                    >
                      <strong>What happens next?</strong>
                      <p style="margin: 8px 0 0 0">
                        We will email you as soon as early access opens up for
                        your position. Meanwhile, you can:
                      </p>
                      <ul
                        style="
                          margin: 8px 0 0 18px 18px;
                          padding: 0;
                          color: #333;
                        "
                      >
                        <li>
                          Share the product with friends to possibly move up the
                          list.
                        </li>
                        <li>Contact support if you need help.</li>
                      </ul>
                      <!-- CTA -->
                      <table
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        style="margin-top: 8px"
                      >
                        <tr>
                          <td style="width: 12px">&nbsp;</td>
                          <td align="left">
                            <a
                              href="https://leaknotifier.com/"
                              target="_blank"
                              style="
                                display: inline-block;
                                background: transparent;
                                color: #680bbd;
                                padding: 12px 16px;
                                border-radius: 8px;
                                border: 1px solid #e9e4ff;
                                font-weight: 600;
                                font-size: 14px;
                              "
                            >
                              Share & Invite
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Support & footer -->
            <tr>
              <td style="padding: 0 28px 24px 28px">
                <hr
                  style="
                    border: none;
                    height: 1px;
                    background: #f0efff;
                    margin: 18px 0;
                  "
                />
                <table role="presentation" width="100%">
                  <tr>
                    <td
                      style="vertical-align: top; font-size: 13px; color: #444"
                    >
                      <strong
                        style="
                          color: #29044b;
                          display: block;
                          margin-bottom: 6px;
                        "
                        >Need help?</strong
                      >
                      <p style="margin: 0 0 8px 0">
                        Email our support team at
                        <a
                          href="mailto:${mailConfig.RESEND_FROM_EMAIL}"
                          style="color: #680bbd"
                          >${mailConfig.RESEND_FROM_EMAIL}</a
                        >
                      </p>
                    </td>
                    <td align="right" style="vertical-align: top">
                      <!-- Small social placeholders -->
                      <p
                        style="margin: 0 0 6px 0; font-size: 13px; color: #444"
                      >
                        Follow us
                      </p>
                      <table
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                      >
                        <tr>

                          <td>
                            <a href="https://linkedin.com/company/leak-notifier" style="font-size: 12px; color: #680bbd"
                              >LinkedIn</a
                            >
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer bar -->
            <tr>
              <td style="background: #29044b; padding: 16px 24px; color: #fff">
                <table role="presentation" width="100%">
                  <tr>
                    <td style="font-size: 13px">
                      
                      <div style="font-weight: 600">
                        LeakNotifier • Early Access
                      </div>
                      <div
                        style="opacity: 0.9; margin-top: 6px; font-size: 12px"
                      >
                        We'll contact you with your invite — thanks for being
                        early.
                      </div>
                    </td>
                   
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Small legal / meta text -->
          <table
            role="presentation"
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="max-width: 600px; width: 100%; margin-top: 12px"
          >
            <tr>
              <td
                style="
                  padding: 10px 4px;
                  color: #666;
                  font-size: 12px;
                  text-align: center;
                "
              >
                You received this email because you signed up for early access
                to Leak Notifier-style service.<br />
                © 2025 Leak Notifier Inc. •
                <span style="white-space: nowrap">All rights reserved.</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};

const getContactUsTemplate = ({
    name,
    email,
    company,
    description,
    message,
    services,
    contact
}: IContactUsTempalate) => {
    return `${header}
        <h2>Contact Us Submission</h2>
        <p>Dear user there has been submission of contact us form</p>
        <h3>Details:</h3>
        <p><strong> Name:</strong> ${name}</p>
        <p><strong> Email:</strong> ${email}</p>
        <p><strong> Company:</strong> ${company}</p>
        <p><strong> Description:</strong> ${description}</p>
        <p><strong> Message:</strong> ${message}</p>
        <p><strong> Contact:</strong> ${contact}</p>
        <p><strong> Services:</strong> ${services?.join(',')}</p>
         ${footer}`;
};

export { getContactUsTemplate, getWaitlistTemplate };
