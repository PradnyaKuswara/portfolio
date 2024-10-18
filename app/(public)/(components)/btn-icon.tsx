import React from "react";

type ButtonIcon = {
  title: string;
  icon: React.ReactNode;
  action: () => void;
};

interface IListBtnIconProps {
  listBtnIcon: ButtonIcon[];
}

const BtnIcon: React.FC<IListBtnIconProps> = ({ listBtnIcon }) => {
  return (
    <>
      {listBtnIcon.map((btn, index) => (
        <div key={index}>
          <button
            onClick={btn.action}
            className="rounded-full bg-secondary p-2 flex items-center hover:bg-primary"
          >
            {btn.icon}
          </button>
        </div>
      ))}
    </>
  );
};

export default BtnIcon;
