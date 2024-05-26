import BoardNavBar from "../../../components/BoardNavBar";
const BoardIdLayout = async (props) => {
  return (
    <div>
      <main className="relative h-full">{props.children}</main>
    </div>
  );
};

export default BoardIdLayout;
