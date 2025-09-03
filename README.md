# Daily Journal 📝

A personal journaling application built with Next.js, designed to provide a simple and intuitive way to record your thoughts, feelings, and experiences. This project leverages modern web technologies to offer a seamless user experience with features like user authentication, database integration, and a responsive design.

## 🚀 Key Features

- **User Authentication:** Secure user registration and login using NextAuth.js and Prisma adapter.
- **Journal Entry Creation:** Easily create new journal entries with title, content, and mood selection.
- **Journal Entry Editing:** Modify existing journal entries to update your records.
- **Database Integration:** Utilizes Prisma to interact with a database for persistent storage of journal entries.
- **Responsive Design:** Built with Tailwind CSS for a consistent and responsive user interface across devices.
- **Session Management:** Uses `next-auth` for managing user sessions and authentication state.
- **Mood Tracking:** Allows users to associate a mood with each journal entry.
- **Dynamic Routing:** Uses Next.js dynamic routes for editing specific journal entries.

## 🛠️ Tech Stack

*   **Frontend:**
    *   React
    *   Next.js
    *   Tailwind CSS
    *   Lucide React (icons)
*   **Backend:**
    *   Node.js
    *   Next.js API routes
*   **Database:**
    *   Prisma
*   **Authentication:**
    *   NextAuth.js
    *   bcryptjs (password hashing)
*   **Build Tools:**
    *   TypeScript
    *   ESLint
    *   PostCSS
*   **Other:**
    *   axios (HTTP client)

## 📦 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

*   Node.js (version 18 or higher)
*   npm or yarn or pnpm
*   A database (e.g., PostgreSQL, MySQL, SQLite)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/GeekNoob04/daily-journal
    cd daily-journal
    ```

2.  Install dependencies:

    ```bash
    npm install # or yarn install or pnpm install
    ```

3.  Set up your environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```
    DATABASE_URL="your_database_connection_string"
    NEXTAUTH_SECRET="your_secret_key"
    NEXTAUTH_URL="http://localhost:3000" # or your deployed URL
    GITHUB_ID="your_github_client_id" # If using GitHub OAuth
    GITHUB_SECRET="your_github_client_secret" # If using GitHub OAuth
    GOOGLE_CLIENT_ID="your_google_client_id" # If using Google OAuth
    GOOGLE_CLIENT_SECRET="your_google_client_secret" # If using Google OAuth
    ```

    Replace the placeholder values with your actual database connection string, a secure secret key, and OAuth credentials if you plan to use them.

4.  Run Prisma migrations:

    ```bash
    npx prisma migrate dev
    ```

    This will create the database schema based on the Prisma schema definition.

5.  Generate Prisma client:

    ```bash
    npx prisma generate
    ```

    This ensures that the Prisma client is up-to-date with the database schema.

### Running Locally

1.  Start the development server:

    ```bash
    npm run dev # or yarn dev or pnpm dev
    ```

2.  Open your browser and navigate to `http://localhost:3000` to view the application.

## 📂 Project Structure

```
daily-journal/
├── app/
│   ├── auth/
│   │   └── signin/
│   │       └── page.tsx
│   ├── dashboard/
│   │   ├── [id]/
│   │   │   └── edit/
│   │   │       └── page.tsx
│   │   ├── new/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── Providers.tsx
├── components/
│   └── JournalCard.tsx
│   └── Navbar.tsx
├── lib/
│   ├── auth.ts
│   └── prisma.ts
├── pages/
│   └── api/
│       └── auth/[...nextauth].ts
│       └── journal.ts
│       └── journal/[id].ts
├── public/
│   └── ...
├── styles/
│   └── globals.css
├── .env
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── prisma/
│   └── schema.prisma
├── README.md
└── tsconfig.json
```

## 📸 Screenshots
<img width="1434" height="839" alt="Screenshot 2025-09-04 at 4 10 50 AM" src="https://github.com/user-attachments/assets/2da8fde8-e046-4b16-b497-002125be0e2e" />
<img width="1440" height="839" alt="Screenshot 2025-09-04 at 4 11 36 AM" src="https://github.com/user-attachments/assets/6e2a808c-46bc-4825-ba69-cae5cde3427e" />
<img width="1440" height="838" alt="Screenshot 2025-09-04 at 4 13 14 AM" src="https://github.com/user-attachments/assets/39bbdd17-5b8a-42b9-85c2-b4c68f3e21fb" />
<img width="1439" height="833" alt="Screenshot 2025-09-04 at 4 13 42 AM" src="https://github.com/user-attachments/assets/8c4e1023-c269-4e40-9360-aea53076666f" />



## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive commit messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main repository.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

If you have any questions or suggestions, feel free to contact me at [harshitbudhraja0@gmail.com](mailto:harshitbudhraja0@gmail.com).

💖 Thanks for checking out this project! Happy journaling!

This README.md was generated by [readme.ai](https://readme-generator-phi.vercel.app/).
