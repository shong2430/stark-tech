# 財報評測平台

本專案為一個前端應用程式，提供使用者輸入股票代號後，查詢該公司近年來的月營收數據與年增率，並以圖表與表格方式顯示，幫助投資人快速了解營運趨勢。

## 功能說明

- 搜尋股票代號（如：2330、2317）
- 顯示公司名稱與基本資料（來自 `fetchStockInfo` API）
- 繪製營收折線圖，清楚展示營收趨勢（`RevenueChart`）
- 顯示詳細數據表格：
  - 含每月營收（單位：仟元）
  - 每月營收年增率（%）
  - 支援表頭左右滑動，並自動滑動至最新月份

## 使用技術

- **Next.js App Router** 架構
- **React + TypeScript**
- **MUI** 元件庫進行 UI 製作
- **Chart.js** 繪製營收圖表

## 本地啟動方式

1. 安裝相依套件：

```bash
yarn install
```

2. 啟動開發伺服器：

```bash
yarn dev
```

3. 開啟瀏覽器：

前往 `http://localhost:3000`，輸入股票代號開始查詢。

## 專案結構

```
.
├── app
│   └── page.tsx         # 首頁搜尋 + 顯示結果
├── components
│   ├── RevenueChart.tsx # 圖表呈現
│   ├── RevenueTable.tsx # 表格呈現（含滑動、格式化）
│   └── StockInfo.tsx    # 顯示公司簡介
├── utils
│   └── api.ts           # 包裝 fetchStockInfo / fetchStockRevenue 函式
└── public
```

## 備註

- 資料來源應由後端 API 提供，需自行串接。
- 若查無資料，請確認該股票代號正確性或 API 是否回傳正確內容。
