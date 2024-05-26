const modal = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-30">
      {children}
    </div>
  );
};

export default modal;
