import { observer } from "mobx-react";
import React, { useState } from "react";
import authStore from "../../stores/authen.store";
import { useNavigate } from "react-router-dom";

type Props = {};

export const Footer: React.FC<Props> = observer((props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <footer className="bg-white w-full h-40 flex">
      <div className="m-auto">© 2024 Work CV. All rights reserved.</div>
    </footer>
  );
});
