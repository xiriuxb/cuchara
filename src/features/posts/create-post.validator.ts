import * as z from "zod";

export const createRecipeSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  portions: z.number().min(1, "Debe ser al menos 1 porción"),
  minutes: z.number().min(1, "El tiempo es requerido"),
  dificulty: z.number().min(1).max(5, "La dificultad debe ser entre 1 y 5"),
  process: z.string().min(1, "El proceso es requerido"),
  ingredients: z.array(
    z.object({
      name: z.string().min(1, "El nombre del ingrediente es requerido"),
      quantity: z.number().min(0, "La cantidad debe ser mayor a 0"),
      unit: z.number().min(1, "La unidad es requerida"),
    })
  ).min(1, "Debe agregar al menos un ingrediente"),
  image: z.instanceof(File, { message: "La imagen es requerida" }),
});