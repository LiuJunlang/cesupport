import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'CE Support',
  description: 'BLE 芯片客户技术支持中心 - FAE 参考文档',

  themeConfig: {
    search: {
      provider: 'local'
    },

    nav: [
      { text: '首页', link: '/' },
      { text: 'FAQ', link: '/faq/' },
      { text: '调试指南', link: '/guides/' },
      { text: '固件发布', link: '/firmware/' }
    ],

    sidebar: {
      '/faq/': [
        {
          text: '常见问题',
          items: [
            { text: '概览', link: '/faq/' },
            { text: '蓝牙连接问题', link: '/faq/connection' },
            { text: 'A2DP 音频问题', link: '/faq/audio' }
          ]
        }
      ],
      '/guides/': [
        {
          text: '调试指南',
          items: [
            { text: '概览', link: '/guides/' },
            { text: 'HCI 日志分析', link: '/guides/hci-log' },
            { text: '断连排查流程', link: '/guides/disconnect' }
          ]
        }
      ],
      '/firmware/': [
        {
          text: '固件发布',
          items: [
            { text: '版本列表', link: '/firmware/' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LiuJunlang/cesupport' }
    ],

    footer: {
      message: '仅供内部 FAE 团队参考使用',
      copyright: 'Copyright © 2026'
    }
  }
})
