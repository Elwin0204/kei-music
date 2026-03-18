import type { FC } from 'react';
import { useAppContext } from '@/components/AppProvider';
import { KeiIcon } from '../ui/kei-icon';

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useAppContext();

  // 定义每个社交链接及其对应的图标名称
  const socialLinks = [
    {
      id: 'weixin',
      label: t('footer.social.weixin', 'WeChat'),
      url: 'https://example.com/wechat',
      ariaLabel: t('footer.social.weixin_aria', 'Visit WeChat Official Account'),
      icon: 'WeChat', // 假设你的图标在 ICON_MAP 中注册的名称是 'WeChat'
    },
    {
      id: 'weibo',
      label: t('footer.social.weibo', 'Weibo'),
      url: 'https://www.weibo.com/your_weibo_username',
      ariaLabel: t('footer.social.weibo_aria', 'Visit Sina Weibo Profile'),
      icon: 'Weibo', // 假设你的图标在 ICON_MAP 中注册的名称是 'Weibo'
    },
    {
      id: 'youtube',
      label: t('footer.social.youtube', 'YouTube'),
      url: 'https://www.youtube.com/@your_youtube_channel',
      ariaLabel: t('footer.social.youtube_aria', 'Visit YouTube Channel'),
      icon: 'YouTube', // 假设你的图标在 ICON_MAP 中注册的名称是 'YouTube'
    },
    {
      id: 'xiaohongshu',
      label: t('footer.social.xiaohongshu', 'Xiaohongshu'),
      url: 'https://www.xiaohongshu.com/user/profile/your_xiaohongshu_id',
      ariaLabel: t('footer.social.xiaohongshu_aria', 'Visit Xiaohongshu Profile'),
      icon: 'XiaoHongShu', // 假设你的图标在 ICON_MAP 中注册的名称是 'XiaoHongShu'
    },
    {
      id: 'douyin',
      label: t('footer.social.douyin', 'Douyin'),
      url: 'https://v.douyin.com/your_douyin_id/',
      ariaLabel: t('footer.social.douyin_aria', 'Visit Douyin Profile'),
      icon: 'Douyin', // 假设你的图标在 ICON_MAP 中注册的名称是 'Douyin'
    },
  ];

  return (
    <footer
      aria-label={t('footer.aria_label', 'Website footer')}
      className="bg-transparent text-muted-foreground py-8 mt-16"
    >
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4 flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-1.5 sm:gap-1.5 md:gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center
                px-3 py-1.5
                sm:px-2.5 sm:py-1.5
                md:px-3 md:py-1.5
                border border-primary/30 rounded-full
                text-xs sm:text-sm
                hover:border-primary hover:bg-primary/5 transition-colors
                focus:outline-none focus:ring-2 focus:ring-primary/50
              "
              aria-label={link.ariaLabel}
            >
              {/* 渲染对应的平台图标 */}
              <KeiIcon name={link.icon as any} size={14} className="mr-1.5" /> {/* 增加图标大小，放在文字前面，并添加右边距 */}
              {link.label}
              {/* 如果你还想保留外部链接图标，可以取消下面一行的注释 */}
              <KeiIcon name="ExternalLink" size={12} className="ml-1.5 sm:ml-1" />
            </a>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground">
          &copy; {currentYear} {t('footer.copyright_holder', 'Chen Jia')}. {t('footer.copyright_text', 'All rights reserved.')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;