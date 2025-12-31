import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, Globe, Target, Megaphone, Award, Building2, BarChart3, Layers, Zap, Eye, MapPin } from 'lucide-react';

const data = {
  total_schools: 154,
  has_website: 59,
  no_website: 95,
  has_facebook: 110,
  has_tiktok: 19,
  has_youtube: 27,
  has_instagram: 5,
  has_google_maps: 137,
  website_percentage: 38.3,
  paid_ads_percentage: 27.8,
  
  region1_distribution: [
    { name: "Bình Dương", value: 38, color: "#f43f5e" },
    { name: "TP.HCM", value: 15, color: "#3b82f6" },
    { name: "Vũng Tàu", value: 8, color: "#10b981" },
    { name: "Chưa xác định", value: 93, color: "#94a3b8" }
  ],
  
  region2_distribution: [
    { name: "TP. Bình Dương", value: 16 },
    { name: "Tân Uyên", value: 8 },
    { name: "TP. Vũng Tàu", value: 8 },
    { name: "TP.HCM", value: 6 },
    { name: "Thủ Dầu Một", value: 5 },
    { name: "Dĩ An", value: 4 },
    { name: "Thuận An", value: 3 },
    { name: "Bến Cát", value: 2 },
    { name: "Quận 10", value: 2 },
    { name: "Gò Vấp", value: 2 }
  ],
  
  seo_distribution: [
    { name: "Rất tốt", value: 111, color: "#10b981" },
    { name: "Tốt", value: 1, color: "#34d399" },
    { name: "Trung bình", value: 6, color: "#fbbf24" },
    { name: "Thấp", value: 1, color: "#f97316" },
    { name: "Không xuất hiện", value: 25, color: "#ef4444" }
  ],
  
  brand_recognition: [
    { name: "Cao", value: 15, color: "#10b981" },
    { name: "TB", value: 99, color: "#fbbf24" },
    { name: "Thấp", value: 12, color: "#ef4444" }
  ],
  
  engagement_distribution: [
    { name: "Cao", value: 23, color: "#10b981" },
    { name: "TB", value: 36, color: "#3b82f6" },
    { name: "Thấp", value: 40, color: "#f97316" },
    { name: "Không", value: 18, color: "#94a3b8" }
  ],
  
  target_segments: [
    { segment: "Học sinh", count: 51 },
    { segment: "Sinh viên", count: 66 },
    { segment: "Người đi làm", count: 90 },
    { segment: "Doanh nghiệp", count: 17 },
    { segment: "Trẻ em", count: 40 }
  ],
  
  social_channels: [
    { channel: "Google Maps", count: 137, percentage: 89.0 },
    { channel: "Facebook", count: 110, percentage: 71.4 },
    { channel: "YouTube", count: 27, percentage: 17.5 },
    { channel: "TikTok", count: 19, percentage: 12.3 },
    { channel: "Instagram", count: 5, percentage: 3.2 }
  ],
  
  content_types: [
    { type: "Tuyển sinh", count: 66 },
    { type: "Kiến thức", count: 63 },
    { type: "Hình ảnh", count: 48 },
    { type: "Video", count: 21 },
    { type: "Tuyển dụng", count: 6 }
  ],
  
  logo_distribution: [
    { name: "Hiện đại", value: 12, color: "#10b981" },
    { name: "Cơ bản", value: 114, color: "#fbbf24" },
    { name: "Không có", value: 28, color: "#94a3b8" }
  ],
  
  main_messages: [
    { message: "Khai giảng", count: 22 },
    { message: "Ưu đãi", count: 15 },
    { message: "Cam kết", count: 8 },
    { message: "Linh hoạt", count: 5 },
    { message: "Phương pháp", count: 4 }
  ],
  
  top_by_reviews: [
    { name: "Hoa Ngữ Thành Nhân", reviews: 374, region: "Bình Dương" },
    { name: "Hoa Ngữ Gia Hân", reviews: 290, region: "Bình Dương" },
    { name: "ChineMaster Q.10", reviews: 211, region: "HCM" },
    { name: "HOA NGỮ NHÂN TÂM", reviews: 176, region: "Bình Dương" },
    { name: "Hoa Ngữ NPB", reviews: 176, region: "Bình Dương" }
  ],
  
  top_by_engagement: [
    { name: "TT Tiếng Trung HD", engagement: 1000 },
    { name: "Chivi Academy", engagement: 300 },
    { name: "Hoa Ngữ Hoa Lạc", engagement: 250 },
    { name: "Hoa Ngữ Mỹ Xuân", engagement: 200 },
    { name: "SOFL", engagement: 200 }
  ],
  
  market_funnel: [
    { stage: "Tổng", value: 154 },
    { stage: "Website", value: 59 },
    { stage: "SEO tốt", value: 111 },
    { stage: "Tương tác", value: 59 },
    { stage: "Ads", value: 42 }
  ]
};

const StatCard = ({ icon: Icon, title, value, sub, color = "rose" }) => {
  const colors = { rose: "text-rose-400 bg-rose-500/10", blue: "text-blue-400 bg-blue-500/10", emerald: "text-emerald-400 bg-emerald-500/10", amber: "text-amber-400 bg-amber-500/10", violet: "text-violet-400 bg-violet-500/10" };
  return (
    <div className="bg-zinc-900/80 rounded-xl p-3 border border-zinc-800 flex items-center gap-3">
      <div className={`p-2 rounded-lg ${colors[color]}`}><Icon className="w-4 h-4" /></div>
      <div className="flex-1 min-w-0">
        <p className="text-zinc-500 text-[10px] uppercase tracking-wider">{title}</p>
        <p className="text-xl font-bold text-white">{value}</p>
      </div>
      {sub && <p className="text-zinc-500 text-xs">{sub}</p>}
    </div>
  );
};

const MiniCard = ({ label, value, color = "rose" }) => (
  <div className={`p-2 rounded-lg bg-${color}-500/10 text-center`}>
    <div className={`text-lg font-bold text-${color}-400`}>{value}</div>
    <div className="text-[10px] text-zinc-500">{label}</div>
  </div>
);

export default function MarketResearchDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: BarChart3 },
    { id: 'regions', label: 'Địa lý', icon: MapPin },
    { id: 'segments', label: 'Phân khúc', icon: Users },
    { id: 'channels', label: 'Kênh', icon: Megaphone },
    { id: 'competition', label: 'Cạnh tranh', icon: Target },
    { id: 'insights', label: 'Insights', icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-3">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap'); * { font-family: 'Be Vietnam Pro', sans-serif; }`}</style>
      
      {/* Header - Compact */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-medium mb-1">
            <div className="w-6 h-[2px] bg-rose-500"></div>MARKET RESEARCH
          </div>
          <h1 className="text-2xl font-bold text-white">Thị Trường Tiếng Trung <span className="text-rose-400">154 TT</span></h1>
        </div>
        <div className="flex gap-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === tab.id ? 'bg-rose-500 text-white' : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800'}`}>
              <tab.icon className="w-3.5 h-3.5" />{tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab - Horizontal Layout */}
      {activeTab === 'overview' && (
        <div className="space-y-3">
          {/* Stats Row */}
          <div className="grid grid-cols-6 gap-2">
            <StatCard icon={Building2} title="Tổng TT" value={154} sub="unique" color="rose" />
            <StatCard icon={Globe} title="Website" value="38.3%" sub="59 TT" color="blue" />
            <StatCard icon={Users} title="Facebook" value="71.4%" sub="110 TT" color="violet" />
            <StatCard icon={MapPin} title="G.Maps" value="89%" sub="137 TT" color="emerald" />
            <StatCard icon={Megaphone} title="Ads" value="27.8%" sub="42 TT" color="amber" />
            <StatCard icon={TrendingUp} title="SEO tốt" value="72%" sub="111 TT" color="blue" />
          </div>

          {/* Charts Row - 4 columns */}
          <div className="grid grid-cols-4 gap-3">
            {/* Region 1 Pie */}
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-rose-400"/>Region_1 (Tỉnh)</h3>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={data.region1_distribution} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value" label={({name, percent}) => `${(percent*100).toFixed(0)}%`} labelLine={false}>
                    {data.region1_distribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.region1_distribution.map((r,i) => <span key={i} className="text-[10px] px-1.5 py-0.5 rounded" style={{backgroundColor: r.color+'20', color: r.color}}>{r.name}: {r.value}</span>)}
              </div>
            </div>

            {/* SEO Pie */}
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-2"><TrendingUp className="w-3.5 h-3.5 text-emerald-400"/>SEO Level</h3>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={data.seo_distribution} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value">
                    {data.seo_distribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.seo_distribution.slice(0,3).map((r,i) => <span key={i} className="text-[10px] px-1.5 py-0.5 rounded" style={{backgroundColor: r.color+'20', color: r.color}}>{r.name}: {r.value}</span>)}
              </div>
            </div>

            {/* Social Channels Bar */}
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-2"><Megaphone className="w-3.5 h-3.5 text-blue-400"/>Kênh Marketing</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={data.social_channels} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="channel" type="category" width={60} tick={{fontSize: 10, fill: '#a1a1aa'}} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px', fontSize: '11px' }} formatter={v => `${v} TT`} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Marketing Funnel */}
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-2"><Layers className="w-3.5 h-3.5 text-rose-400"/>Marketing Funnel</h3>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={data.market_funnel}>
                  <defs>
                    <linearGradient id="funnelG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="stage" tick={{fontSize: 9, fill: '#71717a'}} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="value" stroke="#f43f5e" fill="url(#funnelG)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Row - 3 columns */}
          <div className="grid grid-cols-3 gap-3">
            {/* Target Segments */}
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-2"><Users className="w-3.5 h-3.5 text-violet-400"/>Phân khúc mục tiêu</h3>
              <div className="space-y-2">
                {data.target_segments.map((seg, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400 w-20 truncate">{seg.segment}</span>
                    <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full" style={{width: `${(seg.count/154)*100}%`}} />
                    </div>
                    <span className="text-xs text-rose-400 font-medium w-8">{Math.round(seg.count/154*100)}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Types */}
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-2"><Eye className="w-3.5 h-3.5 text-amber-400"/>Loại nội dung</h3>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={data.content_types}>
                  <XAxis dataKey="type" tick={{fontSize: 9, fill: '#71717a'}} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px', fontSize: '11px' }} />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Key Insights Mini */}
            <div className="bg-gradient-to-br from-rose-500/10 to-zinc-900 rounded-xl p-3 border border-rose-500/20">
              <h3 className="text-xs font-semibold text-rose-400 mb-2 flex items-center gap-2"><Zap className="w-3.5 h-3.5"/>Quick Insights</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-zinc-800/50 rounded-lg text-center">
                  <div className="text-lg font-bold text-amber-400">61.7%</div>
                  <div className="text-[10px] text-zinc-500">Không website</div>
                </div>
                <div className="p-2 bg-zinc-800/50 rounded-lg text-center">
                  <div className="text-lg font-bold text-emerald-400">72%</div>
                  <div className="text-[10px] text-zinc-500">Không Ads</div>
                </div>
                <div className="p-2 bg-zinc-800/50 rounded-lg text-center">
                  <div className="text-lg font-bold text-blue-400">11%</div>
                  <div className="text-[10px] text-zinc-500">B2B focus</div>
                </div>
                <div className="p-2 bg-zinc-800/50 rounded-lg text-center">
                  <div className="text-lg font-bold text-violet-400">86%</div>
                  <div className="text-[10px] text-zinc-500">Không video</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regions Tab - Horizontal */}
      {activeTab === 'regions' && (
        <div className="space-y-3">
          {/* Region Stats Row */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-gradient-to-r from-rose-500/10 to-zinc-900 rounded-xl p-3 border border-rose-500/20 flex items-center justify-between">
              <div><div className="text-rose-400 text-xs font-medium">Bình Dương</div><div className="text-2xl font-bold text-white">38</div></div>
              <div className="text-zinc-500 text-xs">24.7%</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500/10 to-zinc-900 rounded-xl p-3 border border-blue-500/20 flex items-center justify-between">
              <div><div className="text-blue-400 text-xs font-medium">TP.HCM</div><div className="text-2xl font-bold text-white">15</div></div>
              <div className="text-zinc-500 text-xs">9.7%</div>
            </div>
            <div className="bg-gradient-to-r from-emerald-500/10 to-zinc-900 rounded-xl p-3 border border-emerald-500/20 flex items-center justify-between">
              <div><div className="text-emerald-400 text-xs font-medium">Vũng Tàu</div><div className="text-2xl font-bold text-white">8</div></div>
              <div className="text-zinc-500 text-xs">5.2%</div>
            </div>
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800 flex items-center justify-between">
              <div><div className="text-zinc-400 text-xs font-medium">Chưa xác định</div><div className="text-2xl font-bold text-white">93</div></div>
              <div className="text-zinc-500 text-xs">60.4%</div>
            </div>
          </div>

          {/* Region Details - 2 columns */}
          <div className="grid grid-cols-2 gap-3">
            {/* Region 2 Chart */}
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-rose-400"/>Region_2 (Quận/Huyện/TP)</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data.region2_distribution} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                  <XAxis type="number" tick={{fontSize: 10, fill: '#71717a'}} axisLine={false} />
                  <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 10, fill: '#a1a1aa'}} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px', fontSize: '11px' }} formatter={v => `${v} TT`} />
                  <Bar dataKey="value" fill="#f43f5e" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Region Analysis */}
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-2"><Target className="w-3.5 h-3.5 text-blue-400"/>Phân tích theo khu vực</h3>
              <div className="space-y-2">
                {/* Binh Duong */}
                <div className="p-2 bg-zinc-800/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2"><span className="text-rose-400 font-medium text-xs">Bình Dương</span><span className="text-zinc-500 text-[10px]">38 TT</span></div>
                  <div className="grid grid-cols-4 gap-1 text-center">
                    <div className="p-1.5 bg-zinc-700/30 rounded"><div className="text-sm font-bold text-white">39%</div><div className="text-[9px] text-zinc-500">Website</div></div>
                    <div className="p-1.5 bg-zinc-700/30 rounded"><div className="text-sm font-bold text-white">32%</div><div className="text-[9px] text-zinc-500">Ads</div></div>
                    <div className="p-1.5 bg-zinc-700/30 rounded"><div className="text-sm font-bold text-white">92%</div><div className="text-[9px] text-zinc-500">GMaps</div></div>
                    <div className="p-1.5 bg-zinc-700/30 rounded"><div className="text-sm font-bold text-white">76%</div><div className="text-[9px] text-zinc-500">FB</div></div>
                  </div>
                </div>
                {/* HCM */}
                <div className="p-2 bg-zinc-800/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2"><span className="text-blue-400 font-medium text-xs">TP.HCM</span><span className="text-zinc-500 text-[10px]">15 TT</span></div>
                  <div className="grid grid-cols-4 gap-1 text-center">
                    <div className="p-1.5 bg-zinc-700/30 rounded"><div className="text-sm font-bold text-white">53%</div><div className="text-[9px] text-zinc-500">Website</div></div>
                    <div className="p-1.5 bg-zinc-700/30 rounded"><div className="text-sm font-bold text-white">40%</div><div className="text-[9px] text-zinc-500">Ads</div></div>
                    <div className="p-1.5 bg-zinc-700/30 rounded"><div className="text-sm font-bold text-white">87%</div><div className="text-[9px] text-zinc-500">GMaps</div></div>
                    <div className="p-1.5 bg-zinc-700/30 rounded"><div className="text-sm font-bold text-white">80%</div><div className="text-[9px] text-zinc-500">FB</div></div>
                  </div>
                </div>
                {/* Vung Tau */}
                <div className="p-2 bg-zinc-800/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2"><span className="text-emerald-400 font-medium text-xs">Vũng Tàu</span><span className="text-zinc-500 text-[10px]">8 TT</span></div>
                  <div className="grid grid-cols-4 gap-1 text-center">
                    <div className="p-1.5 bg-zinc-700/30 rounded"><div className="text-sm font-bold text-white">38%</div><div className="text-[9px] text-zinc-500">Website</div></div>
                    <div className="p-1.5 bg-zinc-700/30 rounded"><div className="text-sm font-bold text-white">25%</div><div className="text-[9px] text-zinc-500">Ads</div></div>
                    <div className="p-1.5 bg-zinc-700/30 rounded"><div className="text-sm font-bold text-white">100%</div><div className="text-[9px] text-zinc-500">GMaps</div></div>
                    <div className="p-1.5 bg-zinc-700/30 rounded"><div className="text-sm font-bold text-white">75%</div><div className="text-[9px] text-zinc-500">FB</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Insight */}
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">
            <p className="text-xs text-zinc-300"><span className="text-amber-400 font-semibold">💡 Insight:</span> <strong>Bình Dương</strong> là thị trường lớn nhất (24.7%), tập trung nhiều tại khu CN. <strong>TP.HCM</strong> có digital hóa cao hơn (53% website). Chiến lược: Local SEO theo Region_2.</p>
          </div>
        </div>
      )}

      {/* Segments Tab - Horizontal */}
      {activeTab === 'segments' && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {/* Radar Chart */}
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-2"><Users className="w-3.5 h-3.5 text-rose-400"/>Phân khúc khách hàng</h3>
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={data.target_segments}>
                  <PolarGrid stroke="#3f3f46" />
                  <PolarAngleAxis dataKey="segment" tick={{fontSize: 10, fill: '#a1a1aa'}} />
                  <PolarRadiusAxis tick={{fontSize: 9, fill: '#71717a'}} />
                  <Radar dataKey="count" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.3} strokeWidth={2} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px', fontSize: '11px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Brand Recognition */}
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-2"><Award className="w-3.5 h-3.5 text-amber-400"/>Nhận diện thương hiệu</h3>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={data.brand_recognition} cx="50%" cy="50%" innerRadius={30} outerRadius={55} dataKey="value" label={({name, percent}) => `${name}: ${(percent*100).toFixed(0)}%`} labelLine={false}>
                    {data.brand_recognition.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 p-2 bg-zinc-800/30 rounded text-center">
                <span className="text-amber-400 font-bold text-lg">92%</span>
                <span className="text-zinc-500 text-xs ml-2">Logo cơ bản/không có</span>
              </div>
            </div>

            {/* Engagement */}
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-2"><TrendingUp className="w-3.5 h-3.5 text-emerald-400"/>Mức độ tương tác</h3>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={data.engagement_distribution} cx="50%" cy="50%" innerRadius={30} outerRadius={55} dataKey="value" label={({name, percent}) => `${name}: ${(percent*100).toFixed(0)}%`} labelLine={false}>
                    {data.engagement_distribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 p-2 bg-zinc-800/30 rounded text-center">
                <span className="text-rose-400 font-bold text-lg">50%</span>
                <span className="text-zinc-500 text-xs ml-2">Engagement thấp/không có</span>
              </div>
            </div>
          </div>

          {/* Segment Detail + Insight */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-xs font-semibold text-zinc-300 mb-2">Chi tiết phân khúc mục tiêu</h3>
              <div className="space-y-2">
                {data.target_segments.map((seg, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-zinc-800/30 rounded-lg">
                    <span className="text-xs text-zinc-300 w-24">{seg.segment}</span>
                    <div className="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-rose-500 to-rose-400" style={{width: `${(seg.count/90)*100}%`}} />
                    </div>
                    <span className="text-xs font-bold text-white w-8">{seg.count}</span>
                    <span className="text-xs text-rose-400 w-10">{Math.round(seg.count/154*100)}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-500/10 to-zinc-900 rounded-xl p-3 border border-rose-500/20">
              <h3 className="text-xs font-semibold text-rose-400 mb-2 flex items-center gap-2"><Zap className="w-3.5 h-3.5"/>Insight phân khúc</h3>
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="p-2 bg-zinc-800/30 rounded-lg">
                  <span className="text-amber-400 font-semibold">Người đi làm (58.4%)</span> - Phân khúc lớn nhất, sẵn sàng chi trả cao, cần lịch linh hoạt
                </div>
                <div className="p-2 bg-zinc-800/30 rounded-lg">
                  <span className="text-emerald-400 font-semibold">B2B (11%)</span> - Blue ocean, chỉ 17 TT nhắm đến. Tiềm năng lớn với doanh nghiệp FDI
                </div>
                <div className="p-2 bg-zinc-800/30 rounded-lg">
                  <span className="text-blue-400 font-semibold">Sinh viên (43%)</span> - Nhạy cảm giá, kênh tiếp cận: TikTok, partnerships trường ĐH
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Channels Tab - Horizontal */}
      {activeTab === 'channels' && (
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-3">
            {/* Social Channels Bar */}
            <div className="col-span-2 bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-2"><Megaphone className="w-3.5 h-3.5 text-blue-400"/>Kênh marketing (154 TT)</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={data.social_channels}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="channel" tick={{fontSize: 10, fill: '#a1a1aa'}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fontSize: 10, fill: '#71717a'}} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px', fontSize: '11px' }} formatter={v => `${v} TT`} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Content Types */}
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-2"><Layers className="w-3.5 h-3.5 text-violet-400"/>Loại nội dung</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={data.content_types} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="type" type="category" width={55} tick={{fontSize: 9, fill: '#a1a1aa'}} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px', fontSize: '11px' }} />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Main Messages */}
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-2"><Eye className="w-3.5 h-3.5 text-amber-400"/>Thông điệp chính</h3>
              <div className="space-y-1.5">
                {data.main_messages.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 p-1.5 bg-zinc-800/30 rounded">
                    <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] flex items-center justify-center font-bold">{i+1}</span>
                    <span className="text-xs text-zinc-300 flex-1">{m.message}</span>
                    <span className="text-xs text-zinc-500">{m.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Channel Insights */}
          <div className="grid grid-cols-4 gap-2">
            <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
              <div className="flex justify-between items-center mb-1"><span className="text-zinc-400 text-xs">Google Maps</span><span className="text-xl font-bold text-emerald-400">89%</span></div>
              <p className="text-zinc-500 text-[10px]">Kênh phủ rộng nhất, quan trọng cho Local SEO</p>
            </div>
            <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/5">
              <div className="flex justify-between items-center mb-1"><span className="text-zinc-400 text-xs">TikTok + IG</span><span className="text-xl font-bold text-amber-400">&lt;16%</span></div>
              <p className="text-zinc-500 text-[10px]">Cơ hội blue ocean, tiếp cận Gen Z</p>
            </div>
            <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/5">
              <div className="flex justify-between items-center mb-1"><span className="text-zinc-400 text-xs">Video Content</span><span className="text-xl font-bold text-rose-400">14%</span></div>
              <p className="text-zinc-500 text-[10px]">86% chưa làm video - khoảng trống lớn</p>
            </div>
            <div className="p-3 rounded-xl border border-blue-500/30 bg-blue-500/5">
              <div className="flex justify-between items-center mb-1"><span className="text-zinc-400 text-xs">Paid Ads</span><span className="text-xl font-bold text-blue-400">28%</span></div>
              <p className="text-zinc-500 text-[10px]">72% không chạy ads - ít cạnh tranh</p>
            </div>
          </div>
        </div>
      )}

      {/* Competition Tab - Horizontal */}
      {activeTab === 'competition' && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {/* Top Reviews */}
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-2"><Award className="w-3.5 h-3.5 text-amber-400"/>Top Google Reviews</h3>
              <div className="space-y-1.5">
                {data.top_by_reviews.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-1.5 bg-zinc-800/30 rounded-lg">
                    <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${i===0?'bg-amber-500/20 text-amber-400':i===1?'bg-zinc-400/20 text-zinc-300':i===2?'bg-orange-500/20 text-orange-400':'bg-zinc-700/50 text-zinc-500'}`}>{i+1}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white truncate">{item.name}</p>
                      <p className="text-[10px] text-zinc-500">{item.region}</p>
                    </div>
                    <span className="text-rose-400 font-bold text-sm">{item.reviews}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Engagement */}
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-2"><TrendingUp className="w-3.5 h-3.5 text-emerald-400"/>Top Engagement</h3>
              <div className="space-y-1.5">
                {data.top_by_engagement.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-1.5 bg-zinc-800/30 rounded-lg">
                    <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${i===0?'bg-amber-500/20 text-amber-400':i===1?'bg-zinc-400/20 text-zinc-300':i===2?'bg-orange-500/20 text-orange-400':'bg-zinc-700/50 text-zinc-500'}`}>{i+1}</div>
                    <p className="flex-1 text-xs text-white truncate">{item.name}</p>
                    <span className="text-emerald-400 font-bold text-sm">{item.engagement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo & Website Quality */}
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-blue-400"/>Chất lượng Digital</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-zinc-800/30 rounded-lg text-center">
                  <ResponsiveContainer width="100%" height={80}>
                    <PieChart>
                      <Pie data={data.logo_distribution} cx="50%" cy="50%" innerRadius={20} outerRadius={35} dataKey="value">
                        {data.logo_distribution.map((e,i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="text-[10px] text-zinc-500">Logo Quality</div>
                </div>
                <div className="space-y-1.5">
                  <div className="p-1.5 bg-zinc-700/30 rounded flex justify-between">
                    <span className="text-[10px] text-zinc-400">Có website</span>
                    <span className="text-[10px] text-emerald-400 font-bold">38%</span>
                  </div>
                  <div className="p-1.5 bg-zinc-700/30 rounded flex justify-between">
                    <span className="text-[10px] text-zinc-400">UI tốt</span>
                    <span className="text-[10px] text-blue-400 font-bold">76%</span>
                  </div>
                  <div className="p-1.5 bg-zinc-700/30 rounded flex justify-between">
                    <span className="text-[10px] text-zinc-400">Công khai giá</span>
                    <span className="text-[10px] text-amber-400 font-bold">29%</span>
                  </div>
                  <div className="p-1.5 bg-zinc-700/30 rounded flex justify-between">
                    <span className="text-[10px] text-zinc-400">Logo hiện đại</span>
                    <span className="text-[10px] text-rose-400 font-bold">8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Competitive Advantage Map */}
          <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
            <h3 className="text-xs font-semibold text-zinc-300 mb-2">Bản đồ lợi thế cạnh tranh</h3>
            <div className="grid grid-cols-7 gap-2">
              {[{name:'Website',val:'38%',comp:'TB'},{name:'SEO',val:'72%',comp:'Cao'},{name:'Paid Ads',val:'28%',comp:'Thấp ✓'},{name:'TikTok',val:'12%',comp:'Rất thấp ✓'},{name:'Công khai giá',val:'22%',comp:'Rất thấp ✓'},{name:'Video',val:'14%',comp:'Rất thấp ✓'},{name:'B2B',val:'11%',comp:'Rất thấp ✓'}].map((item,i) => (
                <div key={i} className={`p-2 rounded-lg text-center ${item.comp.includes('✓')?'bg-emerald-500/10 border border-emerald-500/30':'bg-zinc-800/30'}`}>
                  <div className="text-lg font-bold text-white">{item.val}</div>
                  <div className="text-[10px] text-zinc-400">{item.name}</div>
                  <div className={`text-[9px] mt-1 ${item.comp.includes('✓')?'text-emerald-400':'text-zinc-500'}`}>{item.comp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Insights Tab - Horizontal */}
      {activeTab === 'insights' && (
        <div className="space-y-3">
          {/* Key Insights Grid */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-amber-500/10 to-zinc-900 rounded-xl p-3 border border-amber-500/20">
              <h4 className="text-amber-400 font-semibold text-xs mb-2">🎯 Cơ hội thị trường</h4>
              <ul className="text-zinc-300 text-[11px] space-y-1">
                <li>• <strong>61.7%</strong> không website</li>
                <li>• <strong>72%</strong> không chạy ads</li>
                <li>• <strong>B2B</strong> chỉ 11%</li>
                <li>• <strong>TikTok</strong> 12.3%</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-zinc-900 rounded-xl p-3 border border-emerald-500/20">
              <h4 className="text-emerald-400 font-semibold text-xs mb-2">✅ Thế mạnh cần có</h4>
              <ul className="text-zinc-300 text-[11px] space-y-1">
                <li>• SEO tốt (72% đã có)</li>
                <li>• Google Reviews (374 max)</li>
                <li>• Facebook (71%)</li>
                <li>• "Cam kết kết quả"</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-rose-500/10 to-zinc-900 rounded-xl p-3 border border-rose-500/20">
              <h4 className="text-rose-400 font-semibold text-xs mb-2">⚠️ Điểm yếu ngành</h4>
              <ul className="text-zinc-300 text-[11px] space-y-1">
                <li>• <strong>~78%</strong> không công khai giá</li>
                <li>• Logo cơ bản <strong>92%</strong></li>
                <li>• Engagement thấp <strong>50%</strong></li>
                <li>• Video <strong>14%</strong></li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-zinc-900 rounded-xl p-3 border border-blue-500/20">
              <h4 className="text-blue-400 font-semibold text-xs mb-2">📍 Chiến lược</h4>
              <ul className="text-zinc-300 text-[11px] space-y-1">
                <li>• Target: <strong>Người đi làm</strong></li>
                <li>• Focus: <strong>Bình Dương</strong></li>
                <li>• Khác biệt: <strong>Minh bạch</strong></li>
                <li>• Kênh: <strong>TikTok + GMaps</strong></li>
              </ul>
            </div>
          </div>

          {/* STP Model */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800 text-center">
              <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-rose-400" />
              </div>
              <h4 className="font-semibold text-white text-sm">Segmentation</h4>
              <p className="text-zinc-400 text-xs mt-1">Người đi làm (58%)<br/>Sinh viên (43%)<br/>B2B (11%)</p>
            </div>
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white text-sm">Targeting</h4>
              <p className="text-zinc-400 text-xs mt-1">Primary: Người đi làm<br/>Secondary: B2B<br/>Growth: Gen Z</p>
            </div>
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800 text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Award className="w-6 h-6 text-emerald-400" />
              </div>
              <h4 className="font-semibold text-white text-sm">Positioning</h4>
              <p className="text-zinc-400 text-xs mt-1">"Tiếng Trung ứng dụng<br/>cho người đi làm,<br/>cam kết kết quả"</p>
            </div>
          </div>

          {/* Action Recommendations */}
          <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
            <h3 className="text-xs font-semibold text-white mb-2">📋 Đề xuất hành động ưu tiên</h3>
            <div className="grid grid-cols-5 gap-2">
              {[
                {icon:'🗺️',title:'Google Maps',desc:'Tối ưu + Reviews',priority:'P1'},
                {icon:'📱',title:'TikTok',desc:'3 video/tuần',priority:'P1'},
                {icon:'💰',title:'Minh bạch giá',desc:'Công khai 100%',priority:'P1'},
                {icon:'🏢',title:'B2B',desc:'Outreach DN FDI',priority:'P2'},
                {icon:'📢',title:'Paid Ads',desc:'FB + Google',priority:'P2'}
              ].map((item,i) => (
                <div key={i} className="p-2 bg-zinc-800/30 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg">{item.icon}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded ${item.priority==='P1'?'bg-rose-500/20 text-rose-400':'bg-blue-500/20 text-blue-400'}`}>{item.priority}</span>
                  </div>
                  <div className="text-xs font-semibold text-white">{item.title}</div>
                  <div className="text-[10px] text-zinc-500">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 text-center text-zinc-600 text-[10px]">
        Market Research • <span className="text-rose-400">154 TT</span> (ID_school unique) • Region_1: Tỉnh | Region_2: Quận/Huyện • Q4/2025
      </div>
    </div>
  );
}
