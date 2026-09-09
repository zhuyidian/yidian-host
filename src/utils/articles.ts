import { XMLParser } from 'fast-xml-parser';

export type LatestArticle = {
  date: string;
  title: string;
  excerpt: string;
  href: string;
  meta: '最新文章' | '文章';
};

type RssItem = {
  title?: unknown;
  link?: unknown;
  pubDate?: unknown;
  description?: unknown;
};

type RssFeed = {
  rss?: {
    channel?: {
      item?: RssItem | RssItem[];
    };
  };
};

const ARTICLES_RSS_URL = import.meta.env.ARTICLES_RSS_URL || 'https://articles.yidianhub.com/rss.xml';

const fallbackArticles: LatestArticle[] = [
  {
    date: "2026/09/09",
    title: "一点API 使用教程(三十六)：Claude Code Mac版使用教程",
    excerpt: "0）事前准备API和URL",
    href: "https://articles.yidianhub.com/posts/yidian-api-claude-code-mac/",
    meta: '最新文章',
  },
  {
    date: "2026/09/09",
    title: "一点API 使用教程(三十五)：Claude Code Linux使用指南",
    excerpt: "*Claude Code 是 Anthropic 推出的强大 AI 编程工具，能够直接在您的电脑上协助编写代码、操作文件。本教程将教您如何使用Key 来完美运行它。*",
    href: "https://articles.yidianhub.com/posts/yidian-api-claude-code-linux/",
    meta: '最新文章',
  },
  {
    date: "2026/09/09",
    title: "一点API 使用教程(三十四)：Claude Code Windows版使用教程",
    excerpt: "新式一键安装",
    href: "https://articles.yidianhub.com/posts/yidian-api-claude-code-windows/",
    meta: '最新文章',
  },
  {
    date: "2026/09/09",
    title: "一点API 使用教程(三十三)：Claude Code 一键部署",
    excerpt: "前言",
    href: "https://articles.yidianhub.com/posts/yidian-api-claude-code/",
    meta: '最新文章',
  },
  {
    date: "2026/09/09",
    title: "一点API 使用教程(三十二)：各智能体常见支持文件格式和测试",
    excerpt: "*以下数据来源于客户与客服数据反馈汇总，未必准确。测试记录来源于技术人员的测试过程，不能代表模型的准确读取能力。*",
    href: "https://articles.yidianhub.com/posts/yidian-api/",
    meta: '最新文章',
  },
  {
    date: "2026/09/09",
    title: "一点API 使用教程(三十一)：各智能体常见JSON配置文件参考",
    excerpt: "OpenClaw - CC-Switch",
    href: "https://articles.yidianhub.com/posts/yidian-api-json/",
    meta: '最新文章',
  },
  {
    date: "2026/09/09",
    title: "一点API 使用教程(二十九)：Token如何减小消耗",
    excerpt: "勤开新对话（避开最大的烧钱坑）",
    href: "https://articles.yidianhub.com/posts/yidian-api-token/",
    meta: '最新文章',
  },
  {
    date: "2026/09/07",
    title: "一点API 使用教程(二十八)：API 接口调用说明",
    excerpt: "一、主流客户端支持的协议",
    href: "https://articles.yidianhub.com/posts/yidian-api-api/",
    meta: '最新文章',
  },
  {
    date: "2026/08/16",
    title: "一点API 使用教程(二十七)：WorkBuddy 配置教程",
    excerpt: "下载 WorkBuddy",
    href: "https://articles.yidianhub.com/posts/yidian-api-workbuddy/",
    meta: '最新文章',
  },
  {
    date: "2026/08/16",
    title: "一点API 使用教程(二十六)：Hermes Desktop 桌面端",
    excerpt: "1 下载安装",
    href: "https://articles.yidianhub.com/posts/yidian-api-hermes-desktop/",
    meta: '最新文章',
  },
  {
    date: "2026/08/16",
    title: "一点API 使用教程(二十五)：Hermes Agent 基础配置指南",
    excerpt: "前言",
    href: "https://articles.yidianhub.com/posts/yidian-api-hermes-agent/",
    meta: '最新文章',
  },
  {
    date: "2026/08/16",
    title: "一点API 使用教程(二十四)：OpenHuman 配置教程",
    excerpt: "下载安装 OpenHuman",
    href: "https://articles.yidianhub.com/posts/yidian-api-openhuman/",
    meta: '最新文章',
  },
  {
    date: "2026/08/16",
    title: "一点API 使用教程(二十三)：Open Claw 接入 Claude 第三方中转 API 教程",
    excerpt: "0、准备工作",
    href: "https://articles.yidianhub.com/posts/yidian-api-open-claw-setup-claude-api/",
    meta: '最新文章',
  },
  {
    date: "2026/08/16",
    title: "一点API 使用教程(二十二)：VS Code 配置 Claude Code 插件",
    excerpt: "VSCode & Claude code 插件",
    href: "https://articles.yidianhub.com/posts/yidian-api-vscode-claude-code/",
    meta: '最新文章',
  },
  {
    date: "2026/08/16",
    title: "一点API 使用教程(二十一)：VS Code 配置 Zoo Code插件",
    excerpt: "VSCode & Zoo Code 插件",
    href: "https://articles.yidianhub.com/posts/yidian-api-vscode-zoo-code/",
    meta: '最新文章',
  },
  {
    date: "2026/08/16",
    title: "一点API 使用教程(二十)：VS Code 配置 Cline 插件",
    excerpt: "前言",
    href: "https://articles.yidianhub.com/posts/yidian-api-vscode-cline/",
    meta: '最新文章',
  },
  {
    date: "2026/08/16",
    title: "一点API 使用教程(十九)：IDEA/PyCharm 配置 Claude Code",
    excerpt: "前言",
    href: "https://articles.yidianhub.com/posts/yidian-api-idea-pycharm-setup/",
    meta: '最新文章',
  },
  {
    date: "2026/08/16",
    title: "一点API 使用教程(十八)：Trae 配置教程",
    excerpt: "Trae  配置教程",
    href: "https://articles.yidianhub.com/posts/yidian-api-trae/",
    meta: '最新文章',
  },
  {
    date: "2026/08/16",
    title: "一点API 使用教程(十七)：Cursor 编辑器配置 Claude Code 插件",
    excerpt: "前言",
    href: "https://articles.yidianhub.com/posts/yidian-api-cursor-claude-code/",
    meta: '最新文章',
  },
  {
    date: "2026/08/16",
    title: "一点API 使用教程(十六)：Windsurf 配置 Claude Code 插件",
    excerpt: "本教程默认观看用户拥有Windsurf账号（或者有能登录Windsurf的手段）",
    href: "https://articles.yidianhub.com/posts/yidian-api-windsurf-claude-code/",
    meta: '最新文章',
  },
  {
    date: "2026/08/16",
    title: "一点API 使用教程(十五)：Claude 客户端配置教程",
    excerpt: "前言",
    href: "https://articles.yidianhub.com/posts/yidian-api-claude/",
    meta: '最新文章',
  },
  {
    date: "2026/08/16",
    title: "一点API 使用教程(十四)：Cherry Studio 使用教程",
    excerpt: "1 下载安装Cherry Studio",
    href: "https://articles.yidianhub.com/posts/yidian-api-cherry-studio/",
    meta: '最新文章',
  },
  {
    date: "2026/08/16",
    title: "一点API 使用教程(十三)：Chatbox 教程",
    excerpt: "第一：下载与安装",
    href: "https://articles.yidianhub.com/posts/yidian-api-chatbox-new/",
    meta: '最新文章',
  },
  {
    date: "2026/08/16",
    title: "一点API 使用教程(十二)：Chatbox 手机版教程",
    excerpt: "第一：下载与安装",
    href: "https://articles.yidianhub.com/posts/yidian-api-chatbox/",
    meta: '最新文章',
  },
  {
    date: "2026/08/10",
    title: "一点API 使用教程(十一)：作图软件 接入使用",
    excerpt: "前言",
    href: "https://articles.yidianhub.com/posts/yidian-api-image2/",
    meta: '最新文章',
  },
  {
    date: "2026/08/10",
    title: "一点API 使用教程(十)：CC Switch 接入使用",
    excerpt: "📌 使用简介",
    href: "https://articles.yidianhub.com/posts/yidian-api-cc-switch-setup/",
    meta: '最新文章',
  },
  {
    date: "2026/08/10",
    title: "一点API 使用教程(九)：AstrBot 接入使用",
    excerpt: "[Astrbot 官方文档](https%3A%2F%2Fdocs.astrbot.app%2F)",
    href: "https://articles.yidianhub.com/posts/yidian-api-astrbot-setup/",
    meta: '最新文章',
  },
  {
    date: "2026/08/10",
    title: "一点API 使用教程(八)：Obsidian 配置 Copilot 插件接入使用",
    excerpt: "1 下载安装Obsidian",
    href: "https://articles.yidianhub.com/posts/yidian-api-obsidian-copilot-setup/",
    meta: '最新文章',
  },
  {
    date: "2026/08/10",
    title: "一点API 使用教程(七)：Pencil 配置 Claude Code+CC-Switch插件接入使用",
    excerpt: "**Claude Code（CC）安装**",
    href: "https://articles.yidianhub.com/posts/yidian-api-pencil-claude-code-cc-switch-setup/",
    meta: '最新文章',
  },
  {
    date: "2026/08/10",
    title: "一点API 使用教程(六)：沉浸式翻译配置接入使用",
    excerpt: "前言",
    href: "https://articles.yidianhub.com/posts/yidian-api-setup/",
    meta: '最新文章',
  },
  {
    date: "2026/08/06",
    title: "一点API 使用教程(五)：Open Code接入使用",
    excerpt: "一、简介",
    href: "https://articles.yidianhub.com/posts/yidian-api-open-code-setup/",
    meta: '最新文章',
  },
  {
    date: '2026/08/06',
    title: '一点API 使用教程(四)：VS Code 配置 CodeX接入使用',
    excerpt: '在 VS Code 中安装 CodeX 插件，配置一点 API 并完成首次对话。',
    href: 'https://articles.yidianhub.com/posts/yidian-api-vscode-codex-setup/',
    meta: '最新文章',
  },
  {
    date: '2026/08/05',
    title: '一点API 使用教程(三)：Codex Cli接入使用',
    excerpt: '从环境准备、安装 Codex CLI 到配置一点API令牌并完成首次启动的使用教程。',
    href: 'https://articles.yidianhub.com/posts/yidian-api-codex-cli-setup/',
    meta: '最新文章',
  },
  {
    date: '2026/08/04',
    title: '一点API 使用教程(二)：Codex接入使用',
    excerpt: '从安装 Codex、配置一点API 到完成首次对话的使用教程。',
    href: 'https://articles.yidianhub.com/posts/yidian-api-codex-setup/',
    meta: '最新文章',
  },
  {
    date: '2026/08/03',
    title: '一点API 使用教程(一)：兑换key',
    excerpt: '从注册登录、兑换额度到创建令牌，并给出 Codex 接入一点API 的配置示例。',
    href: 'https://articles.yidianhub.com/posts/yidian-api-redeem-key/',
    meta: '最新文章',
  },
  {
    date: '2026/07/24',
    title: '把 Codex 工作现场搬进飞书：群内直接聊业务、实时迭代需求',
    excerpt: '在飞书群内直接对话业务，让 Codex 持续推进需求迭代。',
    href: 'https://articles.yidianhub.com/posts/codex-in-feishu/',
    meta: '最新文章',
  },
  {
    date: '2026/07/17',
    title: '欢迎来到 YidianHub 文章',
    excerpt: 'YidianHub 文章站正式启用，记录服务说明、工具整理与持续更新的内容。',
    href: 'https://articles.yidianhub.com/posts/welcome/',
    meta: '文章',
  },
];

function toArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function toText(value: unknown): string {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
}

function toDate(value: unknown): string {
  const date = new Date(toText(value));

  if (Number.isNaN(date.getTime())) return '';

  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
}

function toUrl(value: unknown): string {
  const link = toText(value);

  if (!link) return '';

  try {
    const url = new URL(link, ARTICLES_RSS_URL);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : '';
  } catch {
    return '';
  }
}

function toArticle(item: RssItem, index: number): LatestArticle | undefined {
  const title = toText(item.title);
  const href = toUrl(item.link);

  if (!title || !href) return undefined;

  return {
    date: toDate(item.pubDate),
    title,
    excerpt: toText(item.description),
    href,
    meta: index === 0 ? '最新文章' : '文章',
  };
}

function mergeArticles(remoteArticles: LatestArticle[]): LatestArticle[] {
  const unique = new Map<string, LatestArticle>();

  for (const article of [...fallbackArticles, ...remoteArticles]) {
    if (!unique.has(article.href)) unique.set(article.href, article);
  }

  return [...unique.values()]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((article, index) => ({
      ...article,
      meta: index === 0 ? '最新文章' : '文章',
    }));
}

export async function getArticleOverview(): Promise<{ latest: LatestArticle[]; total: number }> {
  try {
    const response = await fetch(ARTICLES_RSS_URL, {
      headers: { Accept: 'application/rss+xml, application/xml, text/xml' },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) throw new Error(`Article RSS request failed: ${response.status}`);

    const parser = new XMLParser({ removeNSPrefix: true });
    const feed = parser.parse(await response.text()) as RssFeed;
    const articles = toArray(feed.rss?.channel?.item)
      .map(toArticle)
      .filter((article): article is LatestArticle => Boolean(article));

    if (articles.length > 0) {
      const mergedArticles = mergeArticles(articles);
      return { latest: mergedArticles.slice(0, 5), total: mergedArticles.length };
    }
  } catch {
    // Keep the homepage buildable while the article site is temporarily unavailable.
  }

  return { latest: fallbackArticles.slice(0, 5), total: fallbackArticles.length };
}
