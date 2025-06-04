const BASE_URL = "https://api.finmindtrade.com/api/v4";
const TOKEN = process.env.NEXT_PUBLIC_FINMIND_TOKEN || "";

interface RevenueRaw {
  date: string;
  revenue: string | number;
  revenue_year: number;
  revenue_month: number;
}

interface RevenueData {
  date: string;
  revenue: number;
  revenueYoY?: number | null;
}

interface StockInfo {
  stock_id: string;
  name: string;
  industry_category?: string;
  type?: string;
}

export async function fetchStockInfo(
  stockId: string
): Promise<StockInfo | null> {
  const url = `${BASE_URL}/data?dataset=TaiwanStockInfo&data_id=${stockId}&token=${TOKEN}`;
  const res = await fetch(url);
  const json = await res.json();

  if (!json.data.length) {
    console.warn("查無公司資料", json);
    return null;
  }
  
  return json.data[0];
}

export async function fetchStockRevenue(
  stockId: string
): Promise<RevenueData[]> {
  const startDate = "2022-01-01";
  const url = `${BASE_URL}/data?dataset=TaiwanStockMonthRevenue&data_id=${stockId}&start_date=${startDate}&token=${TOKEN}`;
  const res = await fetch(url);
  const json = await res.json();

  if (!json.data.length) {
    console.warn("查無營收資料", json);
    return [];
  }

  const rawData: (RevenueData & {
    revenue_year: number;
    revenue_month: number;
  })[] = json.data
    .map((item: RevenueRaw) => ({
      date: item.date,
      revenue: Number(item.revenue),
      revenue_year: (item as any).revenue_year,
      revenue_month: (item as any).revenue_month,
    }))
    .sort((a: RevenueRaw, b: RevenueRaw) => a.date.localeCompare(b.date));

  const withYoY: RevenueData[] = rawData.map((item) => {
    const prev = rawData.find(
      (d) =>
        d.revenue_year === item.revenue_year - 1 &&
        d.revenue_month === item.revenue_month
    );
    const revenueYoY =
      prev && prev.revenue > 0 ? (item.revenue / prev.revenue - 1) * 100 : null;
    return {
      date: item.date,
      revenue: item.revenue,
      revenueYoY: revenueYoY !== null ? Number(revenueYoY.toFixed(2)) : null,
    };
  });

  return withYoY.slice(-12);
}
