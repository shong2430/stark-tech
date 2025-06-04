"use client";

import React, { useEffect, useRef } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface RevenueData {
  date: string;
  revenue: number;
  revenueYoY?: number | null;
}

const LEFT_LABELS = ["年度月份", "每月營收", "單月營收年增率 (%)"];

export default function RevenueTable({ data }: { data: RevenueData[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const scrollToEnd = () => {
      scrollEl.scrollLeft = scrollEl.scrollWidth;
    };

    const id = setTimeout(() => {
      requestAnimationFrame(scrollToEnd);
    }, 100);

    return () => clearTimeout(id);
  }, [data]);

  const format = (n: number | null | undefined, fractionDigits = 0) =>
    n != null
      ? n.toLocaleString(undefined, {
          minimumFractionDigits: fractionDigits,
          maximumFractionDigits: fractionDigits,
        })
      : "-";

  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 1,
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableBody>
              {LEFT_LABELS.map((label, index) => (
                <TableRow key={label}>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      borderRight: "1px solid #e0e0e0",
                      whiteSpace: "nowrap",
                      backgroundColor: "#fafafa",
                      height: 48,
                      width: 100,
                      textAlign: "center",
                    }}
                  >
                    {label}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ overflowX: "auto", width: "100%" }}>
        <TableContainer component={Paper} ref={scrollRef}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {data.map((item) => (
                  <TableCell
                    key={item.date}
                    align="center"
                    sx={{ whiteSpace: "nowrap", minWidth: 100, height: 48 }}
                  >
                    {item.date.replace(/-/g, "")}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[0, 1].map((rowIndex) => (
                <TableRow key={rowIndex}>
                  {data.map((item) => (
                    <TableCell
                      key={`${rowIndex}-${item.date}`}
                      align="center"
                      sx={{ height: 48 }}
                    >
                      {rowIndex === 0
                        ? format(item.revenue)
                        : format(item.revenueYoY, 2)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
