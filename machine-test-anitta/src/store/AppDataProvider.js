import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserData as getUserDataAPI } from "../services/app-services";

const AppDataContext = createContext({});

export function useAppDataContext() {
  return useContext(AppDataContext);
}

const AppDataProvider = ({ children }) => {
  const [userDatas, setUserDatas] = useState([]);
  const [pageMeta, setPageMeta] = useState({});

  const [isModalShown, setIsModalShown] = useState(false);
  useEffect(() => {
    getIntialPageData();
    // eslint-disable-next-line
  }, []);
  const [userStatiticsData, setUserStatiticsData] = useState({
    users: 0,
    males: 0,
    females: 0,
    actives: 0,
  });

  useEffect(() => {
    const userStat = {
      users: 0,
      males: 0,
      females: 0,
      actives: 0,
    };

    if (userDatas.length > 0) {
      userStat.users = userDatas.length;
      userDatas.forEach((data) => {
        if (data.gender === "male") userStat.males++;
        if (data.gender === "female") userStat.females++;
        if (data.status === "active") userStat.actives++;
      });
    }

    setUserStatiticsData(userStat);

    console.log("====userStat====", userStat);
  }, [userDatas]);

  const getIntialPageData = () => _getUserData({ pageNumber: 1 });

  const _getUserData = ({ pageNumber = 1, url = null }) => {
    getUserDataAPI({
      pageNumber,
      url,
    })
      .then((data) => {
        console.log("====data====", data);
        setPageMeta(data.meta.pagination);
        setUserDatas(data.data);
      })
      .catch((e) => {
        console.log("====some error @getUserData====", e);
      });
  };

  const handlePagination = ({ pageNumber = null, isNext = true }) => {
    console.log("====pageNumber====", pageNumber);
    console.log("====isNext====", isNext);
    if (pageNumber) {
      console.log("inside pageNumber");
      _getUserData({ pageNumber });
    } else {
      if (isNext) {
        _getUserData({ url: pageMeta?.links?.next });
      } else {
        _getUserData({ url: pageMeta?.links?.previous });
      }
    }
  };

  const handleModalDisplay = (isShow = false) => setIsModalShown(isShow);

  const store = {
    userDatas,
    pageMeta,
    handlePagination,
    getIntialPageData,
    userStatiticsData,
    UI: {
      isModalShown,
      handleModalDisplay,
    },
  };

  return (
    <AppDataContext.Provider value={store}>{children}</AppDataContext.Provider>
  );
};

export default AppDataProvider;
