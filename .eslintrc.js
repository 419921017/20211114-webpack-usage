module.exports = {
  root: true,
  parser: 'babel-eslint',
  //指定解析器选项
  //   parserOptions: {
  //     sourceType: 'module',
  //     ecmaVersion: 2015,
  //   },
  extends: 'airbnb',
  //指定脚本的运行环境
  env: {
    browser: true,
    node: true,
  },
  // 启用的规则及其各自的错误级别
  rules: {
    indent: 'off', //缩进风格
    quotes: 'off', //引号类型
    'no-console': 'error', //禁止使用console
  },
};
