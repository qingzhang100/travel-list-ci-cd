# 使用 Node.js 作为基础镜像
FROM node:16

# 设置工作目录
WORKDIR /src

# 复制 package.json 和 package-lock.json 文件
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制其余的应用代码
COPY . .

# 构建应用
RUN npm run build

# 设置容器的端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]
