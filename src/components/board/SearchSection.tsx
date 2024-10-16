import Image from "next/image";
import SearchIcon from "../../../public/icons/search_icon.svg"
import React, {ChangeEvent, useState} from "react";

interface searchSectionProps {
  onSearchChange: (search: string) => void;
}

export default function SearchSection({ onSearchChange }: searchSectionProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchChange(searchValue);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  return (
    <>
      <h1 className="font-bold text-[24px] text-brand-white leading-6">
        자유게시판
      </h1>
      <div className="relative mt-10">
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          className="bg-brand-black-medium w-full rounded-xl border-[1px] border-solid border-brand-black-light p-4 text-brand-white pl-10"
          value={searchValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Image src={SearchIcon} alt="검색"/>
        </div>
      </div>
    </>
  )
}