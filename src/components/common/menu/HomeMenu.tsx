import HomeMenuItem from '@/components/common/menu/HomeMenuItem';

export default function HomeMenu() {
  return <div className="flex gap-1">
        <HomeMenuItem image="/assets/item/feathers.svg">Item 1</HomeMenuItem>
        <HomeMenuItem image="/assets/item/trophy.svg">Item 2</HomeMenuItem>
        <HomeMenuItem image='/assets/item/bag.svg'>Item 3</HomeMenuItem>
    </div>;
}