import { defineConfig } from 'vitepress';

export default defineConfig({
  base: '/',
  title: 'FkWeChat 插件开发文档',
  description: 'FkWeChat 插件开发文档',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/icon.svg',
      },
    ],
  ],
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'FkWeChat',
    lastUpdatedText: '最后更新于',
    outlineTitle: '页面导航',
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '深色主题',
    sidebarMenuLabel: '菜单',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    outline: [2, 3],
    nav: [
      { text: '插件文档', link: '/', activeMatch: '/' },
      { text: '插件仓库', link: 'https://github.com/YunJavaPro/FkWeChat_Plugin' },
      { text: '模块地址', link: 'https://github.com/Xposed-Modules-Repo/me.yun.fkwechat' },
    ],
    sidebar: [
      {
        text: '插件文档',
        items: [
          { text: '文件结构', link: '/file-structure' },
          { text: '全局字段', link: '/global-fields' },
          { text: '发送函数', link: '/send-functions' },
          { text: '加载函数', link: '/load-functions' },
          { text: '群聊管理', link: '/group-management' },
          { text: '数据查询', link: '/data-query' },
          { text: '存储函数', link: '/storage-functions' },
          { text: '媒体路径', link: '/media-path' },
          { text: '文件工具', link: '/file-utils' },
          { text: '音频转换', link: '/audio-convert' },
          { text: '其他函数', link: '/other-functions' },
          { text: '回调函数', link: '/callback-functions' },
          { text: 'Msg结构', link: '/msg-structure' },
          { text: 'Cgi结构', link: '/cgi-structure' },
          { text: 'Cdn结构', link: '/cdn-structure' },
          { text: 'DexKit查找', link: '/dexkit-api' },
          { text: 'CDN媒体下载', link: '/cdn-api' },
          { text: 'MCP工具注册', link: '/mcp-tools' },
          { text: 'Hook与反射', link: '/hook-api' },
        ],
      },
    ],
    footer: {
      message: 'FkWeChat 插件开发文档',
      copyright: `Copyright © ${new Date().getFullYear()} FkWeChat. All rights reserved`,
    },
  },
  cleanUrls: true,
});
