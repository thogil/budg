import * as z from "zod";

const ExpenseBase = z.strictObject({
  title: z.string().nonempty(),
  total: z.number().nonnegative(),
});

export const CreateExpense = ExpenseBase.required({
  title: true,
  total: true,
});

export const UpdateExpense = ExpenseBase.partial();
