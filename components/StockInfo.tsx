import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface StockInfoProps {
  data: {
    stock_id: string;
    stock_name: string;
    industry_category?: string;
    type?: string;
  };
}

export default function StockInfo({ data }: StockInfoProps) {
  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          公司資訊
        </Typography>
        <Typography>股票代號：{data.stock_id}</Typography>
        <Typography>公司名稱：{data.stock_name}</Typography>
        {data.industry_category && <Typography>產業類別：{data.industry_category}</Typography>}
        {data.type && <Typography>公司型態：{data.type}</Typography>}
      </CardContent>
    </Card>
  );
}