"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { fetchStockInfo, fetchStockRevenue } from "@/utils/api";
import RevenueChart from "@/components/RevenueChart";
import RevenueTable from "@/components/RevenueTable";
import StockInfo from "@/components/StockInfo";

export default function HomePage() {
  const [stockId, setStockId] = useState("");
  const [loading, setLoading] = useState(false);
  const [stockInfo, setStockInfo] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any[]>([]);

  const handleSearch = async () => {
    const trimmed = stockId.trim();
    if (!trimmed) return;

    setLoading(true);
    setStockInfo(null);
    setRevenueData([]);

    try {
      const [info, revenue] = await Promise.all([
        fetchStockInfo(trimmed),
        fetchStockRevenue(trimmed),
      ]);

      if (!info) {
        console.warn("查無公司資料");
        return;
      }
      if (!revenue || revenue.length === 0) {
        console.warn("查無營收資料");
      }

      setStockInfo(info);
      setRevenueData(revenue);
    } catch (error) {
      console.error("查詢失敗", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Typography variant="h4" align="center" gutterBottom>
        財報評測平台
      </Typography>

      <Box display="flex" gap={2} mb={4}>
        <TextField
          label="輸入股票代號 (如 2330)"
          variant="outlined"
          fullWidth
          value={stockId}
          onChange={(e) => setStockId(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          搜尋財報
        </Button>
      </Box>

      {loading && (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
          <Typography mt={2}>查詢中...</Typography>
        </Box>
      )}
      {!loading && stockInfo && (
        <>
          <StockInfo data={stockInfo} />
          <RevenueChart data={revenueData} />
          <RevenueTable data={revenueData} />
        </>
      )}
    </Container>
  );
}
