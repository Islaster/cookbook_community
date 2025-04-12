type GridItem = { title: string; image: string };
type Props = { obj: GridItem };

export default function RecipeGridItem({ obj }: Props) {
  return (
    <div className="w-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-center p-2">
        {obj.title}
      </h3>

      <div className="relative w-full aspect-[4/3]">
        <img
          src={obj.image}
          alt="food image"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
