import { z } from "zod";

export const demandaSchema = z.object({
  cargo: z.string().min(1, "Cargo é obrigatório"),
  valor: z.number().min(0, "Valor não pode ser negativo"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  status: z.string().optional(),
  usuario_id: z.number(),
  formacao_id: z.number(),
});
