// app/about/developer/page.tsx
export const dynamic = "force-dynamic";

export const metadata = {
  title: "About",
};

const AboutMe = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          About Developer
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Hi, I’m <strong>Dima Naumenko</strong>, an 19-year-old computer
          engineering student from Odesa, Ukraine. I’m currently in my 4th year
          of college.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
