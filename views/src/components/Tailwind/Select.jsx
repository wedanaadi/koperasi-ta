import React, { useEffect, useRef, useState } from "react";

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export default function Select({
  placeHolder,
  options,
  isMulti,
  isSearchable,
  onChange,
  editValue = null,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef();
  const inputRef = useRef();

  useEffect(()=>{
    if(editValue!==null || editValue !== '') {
      setSelectedValue(editValue)
    }
  },[editValue])

  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const handleInputClick = (e) => {
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return placeHolder;
    }
    if (isMulti) {
      return (
        <div className="flex flex-wrap gap-[5px]">
          {selectedValue.map((option) => (
            <div
              key={option.value}
              className="bg-slate-300 py-[2px] px-1 rounded-sm flex items-center"
            >
              {option.label}
              <span
                onClick={(e) => onTagRemove(e, option)}
                className="flex items-center"
              >
                <CloseIcon />
              </span>
            </div>
          ))}
        </div>
      );
    }
    return selectedValue.label;
  };

  const onItemClick = (option) => {
    let newValue;
    if (isMulti) {
      if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const isSelected = (option) => {
    if (isMulti) {
      return selectedValue.filter((o) => o.value === option.value).length > 0;
    }
    if (!selectedValue) {
      return false;
    }
    return selectedValue.value === option.value;
  };

  const removeOption = (option) => {
    return selectedValue.filter((o) => o.value !== option.value);
  };
  const onTagRemove = (e, option) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const getOptions = () => {
    if (!searchValue) {
      return options;
    }
    return options.filter(
      (option) =>
        option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );
  };
  return (
    <div className="w-ful border border-slate-400 rounded-md relative">
      <div
        ref={inputRef}
        onClick={handleInputClick}
        className="p-[5px] flex flex-wrap items-center justify-between select-none"
      >
        <div className="font-medium text-sm text-slate-500">{getDisplay()}</div>
        <div className="font-medium">
          <Icon />
        </div>
      </div>
      {showMenu && (
        <div className="w-full translate-y-1 border border-slate-400 rounded-md max-h-36 overflow-auto bg-white z-[999]">
          {isSearchable && (
            <div className="p-[5px] bg-slate-300 w-full">
              <input
                className="w-full box-border p-[5px] border border-slate-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700 focus:border-blue-700"
                onChange={onSearch}
                value={searchValue}
                ref={searchRef}
              />
            </div>
          )}
          {getOptions().map((option) => (
            <div
              onClick={() => onItemClick(option)}
              className={`p-[5px] cursor-pointer hover:bg-slate-300 ${
                isSelected(option) && "bg-blue-400"
              }`}
              key={option.value}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
