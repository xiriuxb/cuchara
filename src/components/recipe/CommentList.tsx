import { Comment } from "@/services/commentService";
import { useComments } from "@/hooks/useComments";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface CommentListProps {
  recipeId: string;
}

export function CommentList({ recipeId }: CommentListProps) {
  const { data: comments, isLoading, error } = useComments(recipeId);

  if (isLoading) {
    return <div>Cargando comentarios...</div>;
  }

  if (error) {
    return <div>Error al cargar los comentarios</div>;
  }

  if (!comments?.length) {
    return <div>No hay comentarios aún</div>;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment: Comment) => (
        <div key={comment._id} className="flex gap-4">
          <Avatar>
            <AvatarImage src={comment.author.imageUrl} />
            <AvatarFallback>{comment.author.username[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">@{comment.author.username}</span>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                  locale: es,
                })}
              </span>
            </div>
            <p className="mt-1">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 