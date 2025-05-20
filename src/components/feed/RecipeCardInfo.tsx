import { RecipeInfo } from "@/entities/RecipeInfoEntity";
import { ConditionalLink } from "../ConditionalLink";
import Image from "next/image";

export default function RecipeCardInfo({
  recipeInfo,
}: {
  recipeInfo: RecipeInfo;
}) {
  return (
    <div className="md:max-w-[900px] flex flex-col w-full bg-sidebar border rounded-sm mb-3">
      <div className="flex justify-between items-center px-5 py-3">
        <ConditionalLink href={`/user/${recipeInfo.user.user_name}`} className="text-sm font-semibold">
          @{recipeInfo.user.user_name}
        </ConditionalLink>
        <p id="date" className="text-sm sm:p-0">
          {new Date(recipeInfo.created_at).toLocaleDateString("es-EC")}
        </p>
      </div>
      <div className="relative w-full aspect-[16/9]">
        <ConditionalLink href={`/recipe/${recipeInfo.id}`} className="block w-full h-full">
          <Image
            className="object-cover rounded-sm"
            src={recipeInfo.primary_image}
            alt={recipeInfo.name}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            priority
          />
        </ConditionalLink>
      </div>
      <div className="flex justify-between items-center py-3">
        <div className="flex flex-row">
          {/* Likes compoent */}
          <button
            data-bookmark-id={recipeInfo?.id}
            className="flex seft-start item-center gap-x-2 pl-2"
          ></button>
        </div>
        <div>
          <button className="flex justify-center item-center pr-2"></button>
        </div>
      </div>
      <ConditionalLink href={`/recipe/${recipeInfo.id}`}>
        <h3 id="name" className="pb-2 px-3 text-lg font-bold">
          {recipeInfo.name}
        </h3>
      </ConditionalLink>

      <p id="comentary" className="border-t text-justify px-3 py-2 sm:h-full">
        {recipeInfo.description?.substring(0, 120)}...
      </p>
    </div>
  );
}
