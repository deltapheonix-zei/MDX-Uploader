# MDX GitHub Uploader

A secure, session-based MDX file uploader that seamlessly integrates with your GitHub repositories.

---

## ✨ Features

- **Secure Authentication**: JSON-based authentication using your GitHub personal access token (PAT)
- **Multiple File Upload**: Upload up to **5 MDX files** at once
- **Session-Only Storage**: Credentials are kept **in-memory only**—nothing is saved persistently
- **Modern UI**: Built with **React, Tailwind CSS, and shadcn/ui**
- **Direct GitHub Integration**: Files are pushed directly to your target repository using the GitHub API

---

## 🔒 Security Notes

- **No persistent credential storage** — all auth data lives only within the session
- **Automatic credential clearance** when the session ends
- **File uploads** are performed securely through GitHub’s official API (REST)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout.tsx       # Main layout wrapper
│   └── ui/               # Reusable shadcn/ui components
├── pages/
│   ├── Index.tsx        # Landing page
│   ├── MdxUpload.tsx    # Core upload page
│   └── NotFound.tsx     # Custom 404 page
└── hooks/
    └── use-toast.ts     # Hook for handling toast notifications
```

---

## 🚀 Usage Instructions

### 1️⃣ Authentication

Prepare a JSON file containing your GitHub credentials:

```json
{
  "GITHUB_TOKEN": "your_github_token",
  "REPO_OWNER": "your_username",
  "REPO_NAME": "your_repo"
}
```

Upload this file using the provided **Authentication interface** on the website.

---

### 2️⃣ Uploading MDX Files

- Select up to **5 MDX files** in a single batch
- Set a **commit message** and specify the **target directory** inside your repository
- Click **Upload Files** to begin
- Monitor the **real-time upload progress** and follow direct links to view your files on GitHub

---

## 🛠️ Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production version
npm run build
```

---

## ⚙️ Technical Details

- Built with **Vite + React + TypeScript**
- Components from **shadcn/ui** for clean and consistent design
- Styled with **Tailwind CSS**, themed with **Catppuccin Frappe**
- Animations powered by **Framer Motion**
- Fully responsive and works on both desktop and mobile

---

## 📜 License

This project is released under the [MIT License](LICENSE). Feel free to modify and customize it for your own use.

---

## 💡 Future Enhancements (optional)

Here are a few ideas for future improvements:

- Support for other file types (e.g., images, markdown, etc.)
- More flexible file limits (configurable max files and sizes)
- Improved error handling and retry mechanism for failed uploads
