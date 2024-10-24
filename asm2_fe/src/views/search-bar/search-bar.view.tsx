import { observer } from "mobx-react";
import React, { useMemo, useState } from "react";
import { IRecruitment, recruitmentStore } from "../../stores";

type Props = {};

const mapTabsAndKeys: Map<number, Array<string>> = new Map([
  [1, ["Từ khoá", "title"]],
  [2, ["Công ty", "companyName"]],
  [3, ["Địa điểm", "address"]],
]);

export const SearchBar: React.FC<Props> = observer((props) => {
  const [tabActive, setTabActive] = useState<number>(1);

  const [searchString, setSearchString] = useState<string>("");

  const displaySearchRecruitsResult: IRecruitment[] | undefined =
    useMemo(() => {
      if (searchString === "") return undefined;

      const activeTabKey = mapTabsAndKeys.get(tabActive);
      if (!activeTabKey) return undefined;

      return recruitmentStore.recruitmentAll.filter((re) => {
        const fieldToSearch = activeTabKey[1] as keyof IRecruitment;
        return re[fieldToSearch]
          ?.toString()
          .toLowerCase()
          .includes(searchString.toLowerCase());
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchString, tabActive, recruitmentStore.recruitmentAll]);

  const handleSearch = (e: any) => {
    e.preventDefault();

    setSearchString(e.target.value);
  };

  return (
    <div className="text-black w-full mt-10" id="search-bar">
      <div className="flex justify-center gap-2 text-white">
        {Array.from(mapTabsAndKeys).map(([key, value]) => (
          <button
            key={key}
            className={`${
              tabActive === key
                ? "bg-white text-black"
                : "bg-cyan-400 text-white"
            } w-32 py-1 rounded-tl-md rounded-tr-md text-center transition-colors`}
            tabIndex={key}
            onClick={() => setTabActive(key)}
          >
            {value[0]}
          </button>
        ))}
      </div>
      <form action="search.html" className="flex bg-white relative">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Nhập keyword"
          value={searchString}
          className="py-2 pl-4 outline-none bg-transparent flex-1"
          onChange={handleSearch}
        />
        <button type="button" className="bg-cyan-300 text-white p-4" disabled>
          Nhập để tìm
        </button>

        {/* Result Search */}
        {displaySearchRecruitsResult && (
          <div className="absolute  w-full bg-white flex flex-col items-start top-[110%] border">
            {displaySearchRecruitsResult.length ? (
              displaySearchRecruitsResult?.map((re) => {
                return (
                  <div className="border-b-2 w-full text-left p-2 px-4 list-none text-sm text-gray-500">
                    {re.title} - {re.companyName} - {re.address}
                  </div>
                );
              })
            ) : (
              <div className="text-red-500 text-sm w-full p-2 px-4 text-left list-none ">
                Không có công việc trùng khớp!
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
});
