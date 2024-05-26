import BoardDashboard from "./components/BoardDashboard/BoardDashboard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex">
        <BoardDashboard />
      </div>
    </main>
  );
}
