type GridItem = { title: string; image: string };
type Props = { obj: GridItem };

export default function RecipeGridItem({ obj }: Props) {
  return (
    <div className="w-full h-72 flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden">
      <h3 className="text-lg font-semibold text-center p-2">{obj.title}</h3>
      <img
        src={obj.image}
        alt="food image"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
