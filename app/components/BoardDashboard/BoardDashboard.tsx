import Link from "next/link";
import CreateNewBoard from "../forms/CreateNewBoard";
import { getBoardList } from "../../action/action";

const BoardDashboard = async () => {
  const boards = await getBoardList();

  return (
    <div className="flex flex-wrap gap-4">
      <CreateNewBoard />
      {boards.map((board: { id: number; title: string }) => (
        <Link key={board.id} href={`/board/${board.id}/${board.title}`}>
          <div className="bg-green-200 w-[300px] py-12 rounded pl-2 justify-center items-center text-sm">
            <div>{board.title}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BoardDashboard;
