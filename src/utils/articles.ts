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
      return { latest: mergedArticles.slice(0, 4), total: mergedArticles.length };
    }
  } catch {
    // Keep the homepage buildable while the article site is temporarily unavailable.
  }

  return { latest: fallbackArticles, total: fallbackArticles.length };
}
