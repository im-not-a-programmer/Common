export default {
    // 环境配置
    development: {
      productUrl: "http://t.royalone.net.cn:7000",
      shipmentUrl: "http://t.royalone.net.cn:9000",
      promotUrl: "http://t.royalone.net.cn:50007"
    },
    test: {
      productUrl: "http://t.royalone.net.cn:7000",
      shipmentUrl: "http://t.royalone.net.cn:9000",
      promotUrl: "http://t.royalone.net.cn:50007"
    },
    production: {
      productUrl: "http://t.royalone.net.cn:7000",
      shipmentUrl: "http://t.royalone.net.cn:9000",
      promotUrl: "http://t.royalone.net.cn:50007"
    }
  }[process.env.NODE_ENV]
  