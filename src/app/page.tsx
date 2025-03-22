"use client";

import { Fragment, useState } from "react";
import RecipeGridItem from "@/components/landing/recipeGridItem";
import { useSearchContext } from "@/contexts/searchContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const [gridData, setGridData] = useState([
    {
      title: "Lorem Ipsum",
      image: "recipe1.webp",
    },
    {
      title: "Lorem Ipsum",
      image: "recipe2.webp",
    },
    {
      title: "Lorem Ipsum",
      image: "recipe3.webp",
    },
    {
      title: "Lorem Ipsum",
      image: "recipe4.jpg",
    },
    {
      title: "Lorem Ipsum",
      image: "recipe5.jpg",
    },
    {
      title: "Lorem Ipsum",
      image: "recipe6.jpg",
    },
    {
      title: "Lorem Ipsum",
      image: "recipe7.jpg",
    },
    {
      title: "Lorem Ipsum",
      image: "recipe8.jpg",
    },
    {
      title: "Lorem Ipsum",
      image: "recipe9.jpg",
    },
    {
      title: "Lorem Ipsum",
      image: "recipe10.jpg",
    },
    {
      title: "Lorem Ipsum",
      image: "recipe11.jpg",
    },
    {
      title: "Lorem Ipsum",
      image: "recipe12.jpg",
    },
    {
      title: "Lorem Ipsum",
      image: "recipe13.jpg",
    },
    {
      title: "Lorem Ipsum",
      image: "recipe14.jpg",
    },
    {
      title: "Lorem Ipsum",
      image: "recipe15.jpg",
    },
  ]);
  const router = useRouter();
  const { setQuery } = useSearchContext();

  function onEnterKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      router.push("/search");
    }
  }

  const chunkedData = []; //chunked data for grid layout
  for (let i = 0; i < gridData.length; i += 3) {
    chunkedData.push(gridData.slice(i, i + 3)); //adding 3 popular data recipes to chunked data and deleting them from gridData array
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        What do you want to cook?
      </h1>
      {/*Search Bar*/}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for recipe or user"
          className="w-full max-w-2xl p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(evt) => setQuery(evt.target.value)}
          onKeyDown={onEnterKeyPress}
        />
      </div>
      {/*Grid for popular recipes*/}
      <h1 className="text-2xl font-bold text-center mb-4">Popular Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {chunkedData.map((row, index) => (
          <Fragment key={index}>
            {row.map((col, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <RecipeGridItem obj={col} />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
