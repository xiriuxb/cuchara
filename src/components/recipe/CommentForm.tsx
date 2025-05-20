import { useState } from "react";
import { useComment } from "@/hooks/useComment";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface CommentFormProps {
  recipeId: string;
}

export function CommentForm({ recipeId }: CommentFormProps) {
  const [content, setContent] = useState("");
  const { mutate: createComment, isPending } = useComment(recipeId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    createComment(content, {
      onSuccess: () => {
        setContent("");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe un comentario..."
        className="min-h-[100px] resize-none"
      />
      <Button type="submit" disabled={isPending || !content.trim()}>
        {isPending ? "Enviando..." : "Comentar"}
      </Button>
    </form>
  );
} 