import { z } from 'zod';

export const baseId = () => z.string().uuid();

export const baseCuid = () => z.string().cuid();

export const baseString = () => z.string().trim();

export const baseNonEmptyString = () => z.string().trim().min(1);

export const baseEmail = () => z.string().email();

export const baseUrl = () => z.string().url();

export const baseNumber = () => z.number();

export const basePositiveInt = () => z.number().int().positive();

export const baseBoolean = () => z.boolean();

export const baseDate = () => z.coerce.date();

export const baseName = () => z.string().trim().min(1).max(100);

export const baseTitle = () => z.string().trim().min(1).max(200);

export const baseDescription = () => z.string().trim();

export const baseExp = () => z.number().int().min(0);

export const baseDifficulty = () => z.number().int().min(1).max(5);

export const baseSalt = () => z.string().min(1);

export const baseProjectStatus = () => z.enum(['ongoing', 'completed']);

export const baseTaskStatus = () => z.enum(['todo', 'in_progress', 'done']);

export const baseStatusEnum = <T extends readonly [string, ...string[]]>(statuses: T) =>
  z.enum(statuses);

export const baseTimestamps = () => z.object({
  created_at: baseDate(),
  updated_at: baseDate()
});

export const baseJunctionTimestamps = () => z.object({
  created_at: baseDate()
});

export const makeOptional = <T extends z.ZodTypeAny>(validator: () => T) =>
  () => validator().optional();

export const makeNullable = <T extends z.ZodTypeAny>(validator: () => T) =>
  () => validator().nullable();

export const makeOptionalNullable = <T extends z.ZodTypeAny>(validator: () => T) =>
  () => validator().optional().nullable();

export const baseAttachmentUrl = () => z.string().url();

export const baseImageUrl = () => z.string().url();

export const baseAvatarUrl = () => z.string().url().nullable();
