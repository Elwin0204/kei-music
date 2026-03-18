// src/utils/toast.ts ✅ 最佳实践
import { toast } from 'sonner'
import type { ExternalToast } from 'sonner'

export const notify = {
  success: (message: string, options?: Partial<ExternalToast>) =>
    toast.success(message, options),

  error: (message: string, options?: Partial<ExternalToast>) =>
    toast.error(message, options),

  info: (message: string, options?: Partial<ExternalToast>) =>
    toast.info(message, options),

  warning: (message: string, options?: Partial<ExternalToast>) =>
    toast.warning(message, options),
}