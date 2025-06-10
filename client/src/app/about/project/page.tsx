// app/about/project/page.tsx
export const dynamic = "force-dynamic";

const About = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          About the Project
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Welcome to the <strong>Video Game Tournament Recording System</strong>
          ! This project was developed as part of my diploma work and aims to
          provide an efficient solution for managing and recording eSports
          tournaments.
        </p>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Purpose</h2>
        <p className="text-gray-600 mb-6">
          The primary goal of this project is to simplify the process of
          organizing and tracking tournaments. It helps tournament organizers
          manage participants, track match results, and visualize standings in a
          user-friendly way.
        </p>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          Technologies Used
        </h2>
        <p className="text-gray-600 mb-4">
          The project is powered by modern web technologies:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>
            <strong>Backend:</strong> Directus - A robust headless CMS for
            managing tournament data.
          </li>
          <li>
            <strong>Frontend:</strong> NextJs - A dynamic and interactive
            JavaScript library for building user interfaces.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Features</h2>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>User-friendly interface for managing tournament data.</li>
          <li>
            Seamless integration between backend and frontend using Directus
            APIs.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          Future Plans
        </h2>
        <p className="text-gray-600 mb-4">
          This project can be further expanded with features like:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>Player statistics tracking.</li>
          <li>Advanced analytics for tournament insights.</li>
        </ul>
        <p className="text-gray-600">
          Thank you for visiting! This project reflects my passion for web
          development and eSports. Feel free to explore and provide feedback.
          <a
            className="text-blue-700 hover:underline"
            href="mailto:example@gmail.com"
          >
            email
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
