<<<<<<< HEAD
This project was created by Abi

It is a [Next.js](https://nextjs.org/) project built on React and TailwindCSS.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the code in `src`. The page auto-updates as you edit the file.

To learn more, take a look at the following resources:

- [React Documentation](https://react.dev/) - learn about React
- [TailwindCSS Documentation](https://tailwindcss.com/) - learn about TailwindCSS
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
=======
🔒 SecureBank - Deliberately Vulnerable Banking Application
🛠️ About SecureBank
SecureBank is a deliberately vulnerable banking application designed for security researchers and ethical hackers to practice identifying and exploiting security flaws based on the OWASP Top 10 vulnerabilities.

This project serves as an educational tool to help learners understand real-world security vulnerabilities and their mitigation techniques.

⚠️ Disclaimer: This project is for educational purposes only. Do NOT use it in production environments. The vulnerabilities are intentionally included to facilitate learning.

🚀 Features & Vulnerabilities
SecureBank is intentionally designed with multiple security vulnerabilities, making it an ideal target for ethical hacking and penetration testing exercises. It includes:

✅ Weak Authentication Mechanism (Hardcoded credentials, weak password policy)
✅ JWT Token Exploitation (Insecure storage, predictable token structure)
✅ SQL Injection (SQLi) (Direct database queries without parameterization)
✅ Cross-Site Scripting (XSS) (Unsanitized user input, stored & reflected XSS)
✅ Sensitive Data Exposure (API key leakage, debug comments with secrets)
✅ Broken Access Control (Users can perform unauthorized transactions)
✅ Insufficient Security Logging (Limited security monitoring)
✅ Lack of Security Headers (No CSP, HSTS, or other protection mechanisms)
✅ Insecure Direct Object References (IDOR) (Users can access unauthorized data)
✅ CSRF & Form Security Issues (No CSRF protection, rate limiting)
🛠️ Installation & Setup
Follow these steps to clone and set up SecureBank locally:

1️⃣ Clone the Repository
git clone https://github.com/YOUR_GITHUB_USERNAME/SecureBank.git
cd SecureBank
2️⃣ Install Dependencies
npm install
3️⃣ Run the Application
npm run dev
4️⃣ Access the App
Open your browser and go to http://localhost:3000
🔍 Vulnerability Breakdown & Exploitation Guide
1️⃣ Weak Authentication
📌 Location: handleLogin function
📌 Issue: Hardcoded credentials (admin/password123, test/test123)

🔥 Attack:
Attempt logging in with known weak credentials.
Brute-force other potential usernames and passwords.
🔐 Fix:
✅ Enforce a strong password policy.
✅ Use proper password hashing (bcrypt, Argon2).
✅ Implement rate limiting & account lockout after multiple failed attempts.

2️⃣ SQL Injection (SQLi)
📌 Location: handleTransfer function
📌 Issue: Direct SQL query concatenation without parameterized queries

🔥 Attack:
Inject SQL queries in the transfer input field:
sql
' OR 1=1 -- 
Extract sensitive user data or manipulate transactions.
🔐 Fix:
✅ Use prepared statements & parameterized queries.
✅ Sanitize user inputs.

3️⃣ Cross-Site Scripting (XSS)
📌 Location: Message Board (dangerouslySetInnerHTML)
📌 Issue: Directly rendering user input without sanitization

🔥 Attack:
Inject a malicious script into the message field:
<script>alert('Hacked!');</script>
🔐 Fix:
✅ Implement HTML sanitization before rendering messages.
✅ Use Content Security Policy (CSP) to prevent script execution.

4️⃣ Sensitive Data Exposure
📌 Issue: API key exposed in front-end code
📌 Example: sk_test_51ABCxyz (Stored in useState)

🔥 Attack:
Extract API keys from the source code using browser dev tools.
🔐 Fix:
✅ Move sensitive data to environment variables.
✅ Never expose secrets in the front-end code.

5️⃣ Broken Access Control
📌 Issue: No validation of user permissions before performing transactions

🔥 Attack:
Modify transfer requests to send money from another user's account.
🔐 Fix:
✅ Implement role-based access control (RBAC).
✅ Validate user permissions before executing any action.

6️⃣ Missing Security Headers
📌 Issue: No CSP, HSTS, X-Frame-Options, etc.

🔥 Attack:
Clickjacking, iframe injections, and XSS attacks.
🔐 Fix:
✅ Add security headers in server configuration:
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
🔐 Security Best Practices
✅ Implement Multi-Factor Authentication (MFA)
✅ Use bcrypt/Argon2 for password hashing
✅ Implement OAuth2.0 / JWT best practices
✅ Perform input validation & sanitization
✅ Secure sensitive data with encryption (AES, RSA)
✅ Add server-side logging & monitoring

🌍 Deployment
Hosting on Vercel/Netlify
To deploy SecureBank on Vercel or Netlify, follow these steps:

1️⃣ Deploy on Vercel
npm install -g vercel
vercel login
vercel
2️⃣ Deploy on Netlify
npm install -g netlify-cli
netlify login
netlify deploy
🏴‍☠️ Ethical Hacking Tools to Use
🔹 Burp Suite – To intercept & modify requests
🔹 SQLMap – To test for SQL Injection
🔹 OWASP ZAP – To scan for web vulnerabilities
🔹 Metasploit – For penetration testing

🤝 Contributing
We welcome contributions! Feel free to:

Report issues 🐛
Submit pull requests 🚀
Suggest security improvements 🔐
⚠️ Disclaimer
This project is intentionally insecure and should only be used for learning and testing purposes. Do NOT deploy this in a production environment. The authors are not responsible for any misuse of this code.

📜 License
This project is licensed under the MIT License.

💡 Want More Security Projects?
Follow me on GitHub and LinkedIn for more security research and ethical hacking projects! 🚀
>>>>>>> ad44a5a41b324025d2252199ef807d58e515f57d
