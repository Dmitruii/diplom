import { useRouter } from "next/navigation";

interface ITournament {
  name: string;
  location: string;
  admin: string;
  date: string;
  game: string;
  id: number;
}

const Tournament = ({ id, name, location, admin, date, game }: ITournament) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push(`/game/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="rounded-md shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400 border-2 rounded-md h-14 flex items-center justify-center"
    >
      <div className="flex-1 flex justify-center">{name}</div>
      <div className="flex-1 flex justify-center">{location}</div>
      <div className="flex-1 flex justify-center">{admin}</div>
      <div className="flex-1 flex justify-center">{game}</div>
      <div className="flex-1 flex justify-center">
        {new Date(date).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
};

export default Tournament;
