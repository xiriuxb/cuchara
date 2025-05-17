import { RecipeInfo } from "@/entities/RecipeInfoEntity";
import Link from "next/link";

export default function RecipeCardInfo({recipeInfo}:{recipeInfo:RecipeInfo}) {
  return (
    <div className="md:max-w-[900px] w-full sm:h-full">
      <div className="flex flex-col w-full bg-white border border-solid rounded-xl mb-5 p-5">
        <h3 className="flex justify-between items-center pl-2 pb-1">
          <span className="flex justify-between items-center gap-2 text-l">
            <Link href={`/`}>
              <p className="text-sm font-semibold" id="userPost">
                @{recipeInfo.user.user_name}
              </p>
            </Link>
          </span>
          <p id="date" className="text-sm md:pr-5 sm:p-0">
            {new Date(recipeInfo.created_at).toLocaleDateString("es-AR")}
          </p>
        </h3>
        <Link href={`/detail?dishID=${recipeInfo.id}`}>
          <img
            className="pt-2 w-full max-h-[230px] md:max-h-[350px] object-cover rounded-xl"
            src={recipeInfo.primary_image}
            alt=""
          />
        </Link>
        <div className="flex justify-between items-center py-3">
          <div className="flex flex-row">
            {/* Likes compoent */}
            <button
              data-bookmark-id={recipeInfo?.id}
              className="flex seft-start item-center gap-x-2 pl-2"
            >
              
            </button>
          </div>
          <div>
            <button className="flex justify-center item-center pr-2">
              
            </button>
          </div>
        </div>
        <h3 id="name" className="pb-2 text-lg font-bold">
          {recipeInfo.name}
        </h3>
        <p
          id="comentary"
          className="border text-justify border-solid rounded-xl p-2 md:h-20 sm:h-full"
        >
          {recipeInfo.description?.substring(0, 120)}...
        </p>
      </div>
    </div>
  );
}