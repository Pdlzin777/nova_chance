import { z } from "zod";

export const demandaSchema = z.object({
  cargo: z.string().min(3, "Cargo deve ter pelo menos 3 caracteres."),
  valor: z.number().nonnegative("Valor não pode ser negativo."),
  descricao: z.string().min(10, "Descrição muito curta."),
  status: z.string().optional(),
  usuario_id: z.number().int("Usuário inválido."),
  formacao_id: z.number().int("Formação inválida.")
});
