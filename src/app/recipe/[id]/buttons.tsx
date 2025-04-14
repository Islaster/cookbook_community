"use client";

const Buttons = ({ id }: { id: string }) => {
  const handleLikeClick = async () => {
    await fetch(`/api/like`, {
      method: "POST",
      body: JSON.stringify({ id }),
    });
  };

  const handleSaveClick = async () => {
    await fetch(`/api/save`, {
      method: "POST",
      body: JSON.stringify({ id }),
    });
  };

  return (
    <>
      <button
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 active:scale-95 transition cursor-pointer"
        onClick={handleLikeClick}
      >
        LIKE
      </button>
      <button
        className="bg-beige text-gray-800 px-4 py-2 rounded-md active:scale-95 transition cursor-pointer"
        onClick={handleSaveClick}
      >
        SAVE
      </button>
    </>
  );
};

export default Buttons;
