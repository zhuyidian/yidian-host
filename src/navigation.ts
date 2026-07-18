import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: '首页', href: getPermalink('/') },
    { text: '商城', href: 'https://api.yidianhub.com', target: '_blank' },
    { text: '模型使用', href: 'https://api.yidianhub.com', target: '_blank' },
    { text: '文章', href: 'https://articles.yidianhub.com', target: '_blank' },
    { text: '常用工具', href: '#resources' },
    { text: '关于', href: '#about' },
  ],
  actions: [],
};

export const footerData = {
  links: [
    {
      title: '服务入口',
      links: [
        { text: 'API 服务', href: 'https://api.yidianhub.com' },
        { text: '文章空间', href: 'https://articles.yidianhub.com' },
      ],
    },
    {
      title: '探索',
      links: [
        { text: '资源与工具', href: '/#resources' },
        { text: '关于 YidianHub', href: '/#about' },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [],
  footNote: '© 2026 YidianHub. All rights reserved.',
};
