'use client';

import React from 'react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Box, Typography } from '@mui/material';

interface RevenueData {
  date: string;
  revenue: number;
  revenueYoY?: number | null;
}

export default function RevenueChart({ data }: { data: RevenueData[] }) {
  const formattedData = data.map(item => ({
    ...item,
    revenue: Math.round(item.revenue / 1000), // 轉為千元顯示
    revenueYoY: typeof item.revenueYoY === 'number' ? Number(item.revenueYoY.toFixed(2)) : null,
  }));

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h6" gutterBottom>
        每月營收與年增率（千元 / %）
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={formattedData}
          margin={{ top: 20, right: 50, bottom: 20, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }} unit="K" />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} unit="%" />
          <Tooltip
            formatter={(value, name) => {
              if (name === 'revenueYoY') return [`${value}%`, '年增率'];
              if (name === 'revenue') return [`${value} 千元`, '營收'];
              return [value, name];
            }}
          />
          <Legend />
          <Bar yAxisId="left" dataKey="revenue" name="每月營收" fill="#f5b041" />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="revenueYoY"
            name="年增率"
            stroke="#e74c3c"
            strokeWidth={2}
            dot={{ r: 3 }}
            connectNulls
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}