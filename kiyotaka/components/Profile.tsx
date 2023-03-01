import React from "react";

const Profile = () => {
  return (
    <div className="flex flex-col gap-[12px] text-center items-center">
      <img
        src="https://images2.alphacoders.com/116/thumb-1920-1164070.jpg"
        className="mask mask-hexagon w-[150px]"
      />
      <h2 className="font-mono font-bold text-xl">Inery Crud</h2>
      <div>
        <p>prese the button to run this application</p>
        <p>
          after submiting the form you will see a transaction log in the bottom
        </p>
      </div>
    </div>
  );
};

export default Profile;
