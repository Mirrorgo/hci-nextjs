import { useState, createContext } from "react";

const CurrentUserContext = createContext();
const CurrentUserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      {props.children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserContext, CurrentUserProvider };

//经销商:老板/员工
//厂家
//工厂管理员
//个体商户