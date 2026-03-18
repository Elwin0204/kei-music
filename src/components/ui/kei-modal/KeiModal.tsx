import React from "react";
import { Dialog } from "radix-ui";
import { KeiIcon } from "../kei-icon";
import { cn } from '@/utils';
import styles from './KeiModal.module.css';

export interface KeiModalProps {
  title: string;
  icon?: { name: string; size?: number };
  description?: string;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

export const KeiModal: React.FC<KeiModalProps> = ({ 
  title, 
  icon,
  children, 
  open, 
  onOpenChange,
  onClose
}) => {
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      onClose();
    } else {
      onOpenChange(newOpen);
    }
  };

  // 渲染标题内容的辅助函数
  const renderTitleContent = () => (
    <>
      {icon && (
        <KeiIcon 
          name={icon.name as any} 
          size={icon.size || 24}
          className="shrink-0 text-primary drop-shadow-lg mr-2"
        />
      )}
      {title}
    </>
  );

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay 
          className={cn(
            styles.keiModalOverlayShow, 
            'fixed z-100 inset-0 bg-black/70 backdrop-blur-sm'
          )}
        />
        
        <Dialog.Content 
          className={cn(
            styles.keiModalContentShow,
            'focus:outline-none overflow-hidden',
            // 移动端样式
            'fixed z-101 inset-0 h-full w-full', // 全屏，无内边距和外边距
            'bg-popover rounded-none',
            
            // 桌面端样式 (sm及以上屏幕)
            'sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2',
            'sm:max-h-[90vh] sm:w-full sm:max-w-2xl',
            'sm:rounded-md sm:shadow-xl',
            'sm:flex sm:flex-col'
          )}
        >
          <div className="
            absolute inset-0 
            flex flex-col
            bg-inherit rounded-inherit
            sm:px-3
            "
          >
            {/* 模态框头部 */}
            <div className={cn(
              'flex items-center h-16 border-b',
            )}>
              {/* 移动端: 左中右布局 */}
              <div className="flex flex-1 md:hidden px-2">
                {/* 左侧返回按钮 */}
                <div className="mr-2 shrink-0">
                  <Dialog.Close asChild>
                    <button 
                      className={cn(
                        'p-1 rounded-full hover:bg-primary/20 dark:hover:bg-primary/30 focus:outline-none',
                        'text-primary dark:text-primary'
                      )}
                    >
                      <KeiIcon name="ArrowLeft" size={20} />
                    </button>
                  </Dialog.Close>
                </div>

                {/* 中间标题 (占满剩余宽度并居中显示) */}
                <Dialog.Title className="font-semibold text-base text-primary dark:text-primary truncate flex-1 flex items-center justify-center">
                  {title}
                </Dialog.Title>

                {/* 右侧CD图标 */}
                <div className="ml-2 shrink-0">
                  {icon && (
                    <KeiIcon 
                      name={icon.name as any} 
                      size={icon.size || 20} // 缩小图标以适应导航栏高度
                      className="shrink-0 text-primary drop-shadow-lg"
                    />
                  )}
                </div>
              </div>

              {/* PC 端: 标题 + 关闭按钮 (在中等及以上屏幕显示) */}
              <div className="hidden md:flex w-full items-center">
                <Dialog.Title className="font-semibold text-lg text-primary dark:text-primary truncate flex items-center">
                  {renderTitleContent()}
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button 
                    className={cn(
                      'ml-auto p-1 rounded-full hover:bg-primary/20 dark:hover:bg-primary/30 focus:outline-none',
                      'text-primary dark:text-primary'
                    )} 
                    aria-label="Close"
                  >
                    <KeiIcon name="CloseCircleBroken" />
                  </button>
                </Dialog.Close>
              </div>
            </div>

            {/* 主体内容区域 - 可滚动部分 */}
            <div className="flex-1 min-h-0 overflow-hidden"> 
              <div className="h-full overflow-y-auto">
                {children}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

KeiModal.displayName = 'KeiModal';