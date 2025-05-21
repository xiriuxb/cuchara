"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { RecipeCreateEntity } from "@/entities/RecipeCreateEntity";
import { createRecipeSchema } from "@/features/posts/create-post.validator";
import Image from "next/image";
import { useState, useRef } from "react";
import { useCreateRecipe } from "@/hooks/useRecipe";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { toast } from "sonner";

const defaultValues = {
  name: "",
  description: "",
  portions: 1,
  minutes: 1,
  dificulty: 1,
  process: "",
  ingredients: [{ name: "", quantity: 0, unit: 1 }],
  image: undefined as unknown as File,
};

const dificultyValues = [
  { id: "1", name: "Fácil" },
  { id: "2", name: "Muy Fácil" },
  { id: "3", name: "Media" },
  { id: "4", name: "Difícil" },
  { id: "5", name: "Muy Difícil" },
];

const units = [
  { id: "1", name: "g" },
  { id: "2", name: "kg" },
  { id: "3", name: "ml" },
  { id: "4", name: "l" },
  { id: "5", name: "taza" },
  { id: "6", name: "cucharada" },
  { id: "7", name: "cucharadita" },
  { id: "8", name: "unidad" },
];

export default function Post() {
  const form = useForm<RecipeCreateEntity>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues,
  });

  const createRecipe = useCreateRecipe();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        form.setError("image", {
          type: "manual",
          message: "Solo se permiten archivos PNG, JPG y JPEG"
        });
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB en bytes
      if (file.size > maxSize) {
        form.setError("image", {
          type: "manual",
          message: "El tamaño máximo permitido es 5MB"
        });
        return;
      }

      form.setValue("image", file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveImage = () => {
    form.setValue("image", undefined as unknown as File);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  async function onSubmit(values: RecipeCreateEntity) {
    try {
      await createRecipe.mutateAsync(values);
    } catch (error) {
      console.log(error)
      toast.error('Error al crear la receta', {
        description: 'Hubo un problema al crear la receta. Por favor, intenta de nuevo.'
      });
    }
  }

  const removeIngredient = (index: number) => {
    const currentIngredients = form.getValues("ingredients");
    form.setValue(
      "ingredients",
      currentIngredients.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="container mx-auto py-10 max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">Nueva Receta</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Imagen de la receta</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <Input
                            type="file"
                            accept="image/*"
                            className="cursor-pointer"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleRemoveImage}
                            disabled={!previewUrl}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        {previewUrl && (
                          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
                            <Image
                              src={previewUrl}
                              alt="Preview"
                              fill
                              sizes="(max-width: 768px) 100vw, 768px"
                              className="object-cover"
                              priority
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre de la receta" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe tu receta" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="portions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Porciones</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          {...field}
                          value={field.value === 0 ? "" : field.value}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? 0
                                : Number(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="minutes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiempo (minutos)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="30"
                          {...field}
                          value={field.value === 0 ? "" : field.value}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? 0
                                : Number(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dificulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dificultad</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona la dificultad" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {dificultyValues.map((val) => {
                            return (
                              <SelectItem key={val.id} value={val.id}>
                                {val.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="process"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proceso</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe el proceso paso a paso"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Ingredientes</h3>
                  {form.formState.errors.ingredients && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.ingredients.message}
                    </p>
                  )}
                </div>
                {form.watch("ingredients").map((_, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <FormField
                      control={form.control}
                      name={`ingredients.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder="Nombre del ingrediente"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`ingredients.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem className="w-24">
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="0.1"
                              placeholder="Cantidad"
                              {...field}
                              value={field.value === 0 ? "" : field.value}
                              onChange={(e) => {
                                const value =
                                  e.target.value === ""
                                    ? 0
                                    : Number(e.target.value);
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`ingredients.${index}.unit`}
                      render={({ field }) => (
                        <FormItem className="w-32">
                          <Select
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                            defaultValue={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Unidad" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {units.map((unit) => {
                                return (
                                  <SelectItem key={unit.id} value={unit.id}>
                                    {unit.name}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 shrink-0"
                      onClick={() => {
                        if (form.getValues("ingredients").length > 1) {
                          removeIngredient(index);
                        } else {
                          form.setError("ingredients", {
                            type: "manual",
                            message: "Debe agregar al menos un ingrediente",
                          });
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    form.setValue("ingredients", [
                      ...form.getValues("ingredients"),
                      { name: "", quantity: 0, unit: 1 },
                    ])
                  }
                >
                  Agregar Ingrediente
                </Button>
              </div>

              <Button
                type="submit"
                disabled={createRecipe.isPending}
                className="w-full"
              >
                {createRecipe.isPending ? "Creando receta..." : "Crear Receta"}
              </Button>
            </form>
          </Form>
        </div>
      </SignedIn>
    </>
  );
}
