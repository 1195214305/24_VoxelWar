# VoxelWar 体素战争

一款基于阿里云ESA边缘计算的3D体素枪战游戏，融合了我的世界风格的方块建造与紧张刺激的枪战玩法。

## 本项目由[阿里云ESA](https://www.aliyun.com/product/esa)提供加速、计算和保护

![阿里云ESA](https://img.alicdn.com/imgextra/i3/O1CN01H1UU3i1Cti9lYtFrs_!!6000000000139-2-tps-7534-844.png)

## 游戏特色

### 双模式体验
- **创造模式**：自由建造，发挥想象力构建你的体素世界
- **枪战模式**：紧张刺激的FPS战斗，多种武器可选

### 核心玩法
- 程序化生成的体素地形
- 第一人称视角控制
- 方块放置与破坏系统
- 多种武器系统（手枪、步枪、霰弹枪）
- AI战术助手（千问API驱动）

### 角色系统
游戏中的敌人角色采用体素化风格设计：
- **紫色战士**：紫色系配色，神秘优雅
- **蓝色战士**：蓝色系配色，沉稳冷静

### 技术亮点
- Three.js 3D渲染引擎
- React + TypeScript 现代前端架构
- 霓虹赛博朋克视觉风格
- 完美移动端适配

## 操作说明

| 操作 | 按键 |
|------|------|
| 移动 | W/A/S/D |
| 视角 | 鼠标移动 |
| 放置方块/射击 | 左键 |
| 破坏方块 | 右键 |
| 切换武器 | 1/2/3 |

## How We Use Edge

本项目深度整合阿里云ESA边缘生态：

### 1. 边缘函数 (Edge Functions)
- **AI助手API** (`/api/ai`)：在边缘节点调用千问大模型，为玩家提供实时战术建议
- **存档系统** (`/api/save`)：利用边缘KV存储玩家游戏进度
- **排行榜** (`/api/leaderboard`)：边缘缓存加速排行榜查询

### 2. 边缘KV存储
- 玩家存档数据持久化
- 全球排行榜数据存储
- 毫秒级读写响应

### 3. 边缘缓存
- 排行榜数据30秒缓存
- 减少KV读取次数
- 提升访问速度

### 4. 全球加速
- 静态资源CDN分发
- 3D模型和纹理快速加载
- 全球玩家低延迟体验

## 技术栈

- **前端**: React 18 + TypeScript + Vite
- **3D引擎**: Three.js + React Three Fiber
- **状态管理**: Zustand
- **样式**: Tailwind CSS
- **边缘计算**: 阿里云ESA Pages + Edge Functions
- **AI**: 通义千问 API

## 本地开发

```bash
cd frontend
npm install
npm run dev
```

## 部署

通过阿里云ESA Pages部署，支持GitHub仓库自动构建。

## 许可证

MIT License
