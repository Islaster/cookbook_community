type GridItem = { title: string; image: string };
type Props = { obj: GridItem };
import Image from "next/image";

export default function RecipeGridItem({ obj }: Props) {
  return (
    <div className="w-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-center p-2">
        {obj.title}
      </h3>

      <div className="relative w-full aspect-[4/3]">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={obj.image}
            alt="food image"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
