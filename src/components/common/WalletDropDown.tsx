'use client';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa';

export type WalletDropdownMenuData = {
  title: string;
  value?: number;
  imageUrl?: string;
};

export type WalletDropDownProps = {
  title: string;
  href?: string;
  data: WalletDropdownMenuData[];
  value?: number;
  onChange?: (data: WalletDropdownMenuData) => void;
  onChangeData?: (
    data?: WalletDropdownMenuData[],
    setter?: Dispatch<SetStateAction<WalletDropdownMenuData | undefined>>
  ) => void;
};

function WalletDropDownSimple({
  title,
  href,
  data,
  value,
  onChange,
  onChangeData,
}: WalletDropDownProps) {
  const randomId: number = Math.floor(Math.random() * 1000);
  const getRandId = (key: number): string => `${randomId * key}`;
  const defaultSelected = data.find((item) => item.value === 1);
  const [selected, setSelected] = useState<WalletDropdownMenuData | undefined>(
    defaultSelected,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<WalletDropdownMenuData[]>(
    data.filter((item) => item.value !== selected?.value),
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handlingMenuClick = useRef(false);

  const handleSelected = (item: WalletDropdownMenuData) => {
    setSelected(item);
    onChange && onChange(item);

    setIsOpen(false);
    setFilteredData(data.filter((d) => d.value !== item.value));
  };

  useEffect(() => {
    onChangeData && onChangeData(data, setSelected);
    if (value && !selected) {
      const selectedDistrict = data.find((item) => item.value === value);
      setSelected(selectedDistrict);
    }
  }, [data, value, selected, onChangeData]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !handlingMenuClick.current
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, handlingMenuClick]);

  return (
    <div className="relative z-10">
      <div
        className={`w-full ${
          isOpen ? 'rounded-t-3xl' : 'rounded-3xl'
        } bg-[#4E1724] flex px-6 h-[91px] items-center justify-between gap-3 cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex gap-2 items-center">
          {href && (
            <>
              <Image
                width={30}
                height={31}
                src={selected?.imageUrl || href}
                objectFit="contain"
                alt="Image"
              />
            </>
          )}
          <p className="text-lg text-[#FFFFFF] font-mochi">
            {selected?.title || title}
          </p>
        </div>
        <FaChevronDown className="w-7 h-7 text-[#FFFFFF]" />
      </div>

      {isOpen && (
        <div ref={dropdownRef}>
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="w-full rounded-b-3xl bg-[#4E1724] flex px-6 py-6 items-center justify-between gap-3 cursor-pointer"
              onClick={() => handleSelected(item)}
            >
              <div className="flex gap-2 items-center">
                {href && item.imageUrl && (
                  <Image
                    width={30}
                    height={31}
                    src={item.imageUrl}
                    objectFit="contain"
                    alt="Image"
                  />
                )}
                <label
                  className="text-lg text-[#FFFFFF] font-mochi"
                  htmlFor={getRandId(index)}
                >
                  {item.title}
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WalletDropDownSimple;
