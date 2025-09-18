import { branding } from '@config/globals';

// eslint-disable-next-line max-len
export const header = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            background-color: #ffffff;
            padding: 20px;
            margin: 0 auto;
            max-width: 600px;
            border: 1px solid #dddddd;
        }
        h2 {
            color: #333333;
        }
        p {
            font-size: 16px;
            color: #555555;
        }
        .footer {
            margin-top: 40px;
            padding: 20px;
            background-color: #333333;
            color: #ffffff;
            text-align: left;
            border-top: 4px solid #ffd15c;
        }
        .footer p {
            margin: 5px 0;
        }
        .footer .company-name {
            font-size: 18px;
            color: #ffd15c;
            font-weight: bold;
        }
        .footer .copyright {
            font-size: 14px;
            color: #cccccc;
        }
        .logo {
            height: 40px;
            width: 40px;
        }
    </style>
</head>
<body>
<div class="email-container">
    
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
