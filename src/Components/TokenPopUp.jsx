export const TokenPopUp = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-400 bg-opacity-0">
      <div className="max-w-md w-full p-6 duration-300 space-x-4 bg-gradient-to-b bg-gray-800 rounded-lg shadow-2xl bg-opacity-80">
        <button className="button-85 bg-gradient-conic font-bold hover:bg-white  focus-visible:ring-0">
          Cyber Token
        </button>
        <button className="button-85 bg-gradient-conic font-bold hover:bg-white  focus-visible:ring-0">
          Margin Token
        </button>
        <div className="flex mt-10 justify-center">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full transform hover:scale-110 transition-all duration-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
