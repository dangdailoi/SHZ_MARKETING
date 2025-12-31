import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, Globe, Target, Megaphone, Award, Building2, BarChart3, Zap, MapPin, ChevronDown, ChevronRight, Info, ArrowRight } from 'lucide-react';

// ============================================
// DATA
// ============================================
const data = {
  total_schools: 154,
  
  // Primary KPIs
  kpis: {
    website: { value: 38.3, count: 59, gap: 61.7 },
    googleMaps: { value: 89, count: 137 },
    facebook: { value: 71.4, count: 110 },
    paidAds: { value: 27.8, count: 42, gap: 72.2 },
    tiktok: { value: 12.3, count: 19, gap: 87.7 },
    b2b: { value: 11, count: 17, gap: 89 }
  },
  
  // Region data (simplified for hero view)
  regions: [
    { name: "Bình Dương", value: 38, percent: 24.7, color: "#f43f5e", isLeader: true },
    { name: "TP.HCM", value: 15, percent: 9.7, color: "#3b82f6" },
    { name: "Vũng Tàu", value: 8, percent: 5.2, color: "#10b981" },
    { name: "Khác", value: 93, percent: 60.4, color: "#3f3f46" }
  ],
  
  // Region 2 details (for drill-down)
  region2: [
    // Bình Dương
    { name: "Bình Dương (chung)", value: 16, parent: "Bình Dương" },
    { name: "Tân Uyên", value: 8, parent: "Bình Dương" },
    { name: "Thủ Dầu Một", value: 5, parent: "Bình Dương" },
      { name: "Dĩ An", value: 4, parent: "Bình Dương" },
    { name: "Thuận An", value: 3, parent: "Bình Dương" },
    { name: "Bến Cát", value: 2, parent: "Bình Dương" },

  
    // TP. HCM
    { name: "TP. HCM (chung)", value: 6, parent: "TP.HCM" },
    { name: "Quận 10", value: 2, parent: "TP.HCM" },    
    { name: "Gò Vấp", value: 2, parent: "TP.HCM" },
    { name: "Quận 12", value: 2, parent: "TP.HCM" },
    { name: "Quận 3", value: 1, parent: "TP.HCM" },
    { name: "Phú Nhuận", value: 1, parent: "TP.HCM" },
    { name: "Thủ Đức", value: 1, parent: "TP.HCM" },
  
    // Vũng Tàu
    { name: "TP. Vũng Tàu", value: 8, parent: "Vũng Tàu" }
  ],

  // Channels (sorted by importance)
  channels: [
    { name: "Google Maps", value: 89, count: 137, type: "primary" },
    { name: "Facebook", value: 71.4, count: 110, type: "primary" },
    { name: "YouTube", value: 17.5, count: 27, type: "secondary" },
    { name: "TikTok", value: 12.3, count: 19, type: "opportunity" },
    { name: "Instagram", value: 3.2, count: 5, type: "opportunity" }
  ],
  
  // Target segments
  segments: [
    { name: "Người đi làm", value: 90, percent: 58.4, isPrimary: true },
    { name: "Sinh viên", value: 66, percent: 42.9 },
    { name: "Học sinh", value: 51, percent: 33.1 },
    { name: "Trẻ em", value: 40, percent: 26 },
    { name: "Doanh nghiệp", value: 17, percent: 11, isOpportunity: true }
  ],
  
  // Top performers (simplified)
  topPerformers: [
    { name: "Hoa Ngữ Thành Nhân", reviews: 374, region: "Bình Dương" },
    { name: "Hoa Ngữ Gia Hân", reviews: 290, region: "Bình Dương" },
    { name: "ChineMaster Q.10", reviews: 211, region: "TP.HCM" }
  ],
  
  // Key opportunities (for insights)
  opportunities: [
    { metric: "Không website", value: "61.7%", action: "Digital gap" },
    { metric: "Không Ads", value: "72%", action: "Paid media trống" },
    { metric: "Không B2B", value: "89%", action: "Blue ocean" },
    { metric: "Không video", value: "86%", action: "Content gap" }
  ]
};

// ============================================
// COMPONENTS
// ============================================

// Hero Metric - Large, prominent display for key numbers
const HeroMetric = ({ value, label, sublabel, accent = false }) => (
  <div className={`text-center ${accent ? 'text-rose-400' : 'text-white'}`}>
    <div className={`text-5xl font-bold tracking-tight ${accent ? 'text-rose-400' : 'text-white'}`}>
      {value}
    </div>
    <div className="text-sm text-zinc-400 mt-1">{label}</div>
    {sublabel && <div className="text-xs text-zinc-500">{sublabel}</div>}
  </div>
);

// KPI Card - Secondary metrics with optional gap indicator
const KPICard = ({ icon: Icon, label, value, count, gap, color = "zinc" }) => {
  const colors = {
    rose: "text-rose-400 bg-rose-500/10",
    blue: "text-blue-400 bg-blue-500/10", 
    emerald: "text-emerald-400 bg-emerald-500/10",
    amber: "text-amber-400 bg-amber-500/10",
    zinc: "text-zinc-400 bg-zinc-500/10"
  };
  
  return (
    <div className="group relative">
      <div className="flex items-center gap-3 p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/50 hover:border-zinc-700 transition-all">
        <div className={`p-2.5 rounded-lg ${colors[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <div className="text-xs text-zinc-500 uppercase tracking-wide">{label}</div>
          <div className="text-xl font-semibold text-white">{value}%</div>
        </div>
        {gap && (
          <div className="text-right opacity-60 group-hover:opacity-100 transition-opacity">
            <div className="text-xs text-zinc-500">Gap</div>
            <div className="text-sm font-medium text-amber-400">{gap}%</div>
          </div>
        )}
      </div>
    </div>
  );
};

// Expandable Section
const ExpandableSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border border-zinc-800/50 rounded-xl overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-zinc-900/40 hover:bg-zinc-900/60 transition-colors"
      >
        <span className="text-sm font-medium text-zinc-300">{title}</span>
        {isOpen ? <ChevronDown className="w-4 h-4 text-zinc-500" /> : <ChevronRight className="w-4 h-4 text-zinc-500" />}
      </button>
      {isOpen && <div className="p-4 bg-zinc-900/20">{children}</div>}
    </div>
  );
};

// Insight Card - Highlighted key finding
const InsightCard = ({ icon, title, value, description, type = "default" }) => {
  const styles = {
    opportunity: "border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-transparent",
    success: "border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-transparent",
    warning: "border-rose-500/30 bg-gradient-to-br from-rose-500/10 to-transparent",
    default: "border-zinc-700/50 bg-zinc-900/40"
  };
  
  const textColors = {
    opportunity: "text-amber-400",
    success: "text-emerald-400",
    warning: "text-rose-400",
    default: "text-zinc-300"
  };
  
  return (
    <div className={`p-5 rounded-xl border ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">{title}</span>
            <span className={`text-2xl font-bold ${textColors[type]}`}>{value}</span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

// Simple horizontal bar for rankings
const SimpleBar = ({ label, value, maxValue, color = "#f43f5e", showValue = true }) => (
  <div className="flex items-center gap-3">
    <span className="text-xs text-zinc-400 w-24 truncate">{label}</span>
    <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
      <div 
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${(value / maxValue) * 100}%`, backgroundColor: color }}
      />
    </div>
    {showValue && <span className="text-xs font-medium text-zinc-300 w-12 text-right">{value}%</span>}
  </div>
);

// ============================================
// MAIN DASHBOARD
// ============================================
export default function MarketResearchDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRegion, setSelectedRegion] = useState(null);

  const tabs = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'geography', label: 'Địa lý' },
    { id: 'channels', label: 'Kênh & Nội dung' },
    { id: 'insights', label: 'Insights & Chiến lược' }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ========== HEADER ========== */}
      <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-rose-400 font-medium tracking-wider mb-1">MARKET RESEARCH</div>
              <h1 className="text-xl font-semibold text-white">Thị trường Tiếng Trung • Đông Nam Bộ</h1>
            </div>
            
            {/* Navigation */}
            <nav className="flex gap-1 bg-zinc-900/50 p-1 rounded-lg">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* ========== MAIN CONTENT ========== */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        
        {/* ==================== OVERVIEW TAB ==================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* HERO SECTION - Primary insight at a glance */}
            <section className="text-center py-8">
              <HeroMetric 
                value="154" 
                label="Trung tâm tiếng Trung" 
                sublabel="Khu vực Đông Nam Bộ • Q4/2025"
                accent
              />
              
              {/* Quick context */}
              <div className="flex items-center justify-center gap-8 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-white">38</div>
                  <div className="text-xs text-zinc-500">Bình Dương</div>
                </div>
                <div className="w-px h-8 bg-zinc-800" />
                <div className="text-center">
                  <div className="text-2xl font-semibold text-white">15</div>
                  <div className="text-xs text-zinc-500">TP.HCM</div>
                </div>
                <div className="w-px h-8 bg-zinc-800" />
                <div className="text-center">
                  <div className="text-2xl font-semibold text-white">8</div>
                  <div className="text-xs text-zinc-500">Vũng Tàu</div>
                </div>
              </div>
            </section>

            {/* KEY METRICS - 4 most important KPIs */}
            <section>
              <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">Chỉ số chính</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard icon={Globe} label="Có Website" value={38.3} gap={61.7} color="blue" />
                <KPICard icon={MapPin} label="Google Maps" value={89} color="emerald" />
                <KPICard icon={Megaphone} label="Chạy Ads" value={27.8} gap={72.2} color="amber" />
                <KPICard icon={Users} label="Nhắm B2B" value={11} gap={89} color="rose" />
              </div>
            </section>

            {/* PRIMARY CHART - One clear visualization */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">Phân bố kênh Marketing</h2>
                  <p className="text-sm text-zinc-500">Tỷ lệ trung tâm sử dụng từng kênh</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Phổ biến
                  <span className="w-2 h-2 rounded-full bg-amber-500 ml-2" /> Cơ hội
                </div>
              </div>
              
              <div className="space-y-4">
                {data.channels.map((channel, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-sm text-zinc-300 w-28">{channel.name}</span>
                    <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-700"
                        style={{ 
                          width: `${channel.value}%`,
                          backgroundColor: channel.type === 'opportunity' ? '#f59e0b' : channel.type === 'primary' ? '#10b981' : '#6b7280'
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-white w-16 text-right">{channel.value}%</span>
                    <span className="text-xs text-zinc-500 w-16">({channel.count} TT)</span>
                  </div>
                ))}
              </div>
            </section>

            {/* QUICK INSIGHTS - Scannable takeaways */}
            <section>
              <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">Cơ hội nổi bật</h2>
              <div className="grid grid-cols-2 gap-4">
                <InsightCard 
                  icon="🎯" 
                  title="Digital Gap" 
                  value="61.7%" 
                  description="Trung tâm chưa có website - cơ hội khác biệt hóa"
                  type="opportunity"
                />
                <InsightCard 
                  icon="📢" 
                  title="Paid Media" 
                  value="72%" 
                  description="Không chạy ads - thị trường còn trống"
                  type="opportunity"
                />
              </div>
            </section>

            {/* SECONDARY INFO - Collapsed by default */}
            <section className="space-y-3">
              <ExpandableSection title="📊 Chi tiết phân khúc khách hàng">
                <div className="space-y-3">
                  {data.segments.map((seg, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className={`text-xs w-28 ${seg.isPrimary ? 'text-rose-400 font-medium' : seg.isOpportunity ? 'text-amber-400' : 'text-zinc-400'}`}>
                        {seg.name}
                      </span>
                      <div className="flex-1 h-2 bg-zinc-800 rounded-full">
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: `${seg.percent}%`,
                            backgroundColor: seg.isPrimary ? '#f43f5e' : seg.isOpportunity ? '#f59e0b' : '#52525b'
                          }}
                        />
                      </div>
                      <span className="text-xs text-zinc-300 w-12 text-right">{seg.percent}%</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-zinc-800/30 rounded-lg">
                  <p className="text-xs text-zinc-400">
                    <strong className="text-rose-400">Insight:</strong> Người đi làm (58.4%) là phân khúc chính. 
                    B2B chỉ 11% - cơ hội blue ocean.
                  </p>
                </div>
              </ExpandableSection>
              
              <ExpandableSection title="🏆 Top performers">
                <div className="space-y-2">
                  {data.topPerformers.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-zinc-800/20 rounded-lg">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        i === 0 ? 'bg-amber-500/20 text-amber-400' : 'bg-zinc-700 text-zinc-400'
                      }`}>{i + 1}</span>
                      <span className="flex-1 text-sm text-zinc-300">{item.name}</span>
                      <span className="text-xs text-zinc-500">{item.region}</span>
                      <span className="text-sm font-semibold text-white">{item.reviews} reviews</span>
                    </div>
                  ))}
                </div>
              </ExpandableSection>
            </section>
          </div>
        )}

        {/* ==================== GEOGRAPHY TAB ==================== */}
        {activeTab === 'geography' && (
          <div className="space-y-8">
            
            {/* HERO - Market leader highlight */}
            <section className="bg-gradient-to-br from-rose-500/10 to-transparent rounded-2xl p-8 border border-rose-500/20">
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <div className="text-sm text-rose-400 font-medium mb-2">Thị trường dẫn đầu</div>
                  <div className="text-4xl font-bold text-white mb-1">Bình Dương</div>
                  <div className="text-zinc-400">38 trung tâm • 24.7% thị phần</div>
                </div>
                <div className="text-right">
                  <div className="text-6xl font-bold text-rose-400">38</div>
                  <div className="text-sm text-zinc-500">trung tâm</div>
                </div>
              </div>
            </section>

            {/* REGION COMPARISON - Simple, scannable */}
            <section>
              <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">So sánh theo tỉnh (Provinces)</h2>
              <div className="grid grid-cols-3 gap-4">
                {data.regions.slice(0, 3).map((region, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedRegion(selectedRegion === region.name ? null : region.name)}
                    className={`p-5 rounded-xl border transition-all text-left ${
                      selectedRegion === region.name 
                        ? 'border-rose-500/50 bg-rose-500/5' 
                        : 'border-zinc-800/50 bg-zinc-900/40 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-semibold text-white">{region.name}</span>
                      <span 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: region.color }}
                      />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{region.value}</div>
                    <div className="text-sm text-zinc-500">{region.percent}% thị phần</div>
                  </button>
                ))}
              </div>
            </section>

            {/* DRILL-DOWN - Region 2 details (shown when region selected) */}
            {selectedRegion && (
              <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50 animate-in fade-in duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Chi tiết: {selectedRegion} (Districts)
                  </h3>
                  <button 
                    onClick={() => setSelectedRegion(null)}
                    className="text-xs text-zinc-500 hover:text-zinc-300"
                  >
                    Đóng
                  </button>
                </div>
                
                <div className="space-y-3">
                  {data.region2
                    .filter(r => r.parent === selectedRegion || selectedRegion === 'all')
                    .map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <span className="text-sm text-zinc-300 w-32">{item.name}</span>
                        <div className="flex-1 h-2 bg-zinc-800 rounded-full">
                          <div 
                            className="h-full bg-rose-500 rounded-full"
                            style={{ width: `${(item.value / 16) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-white w-8">{item.value}</span>
                      </div>
                    ))}
                </div>
              </section>
            )}

            {/* REGIONAL METRICS - Expandable */}
            <section className="space-y-3">
              <ExpandableSection title="📈 Chỉ số digital theo khu vực" defaultOpen>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-zinc-500 text-xs uppercase">
                        <th className="text-left py-2">Khu vực</th>
                        <th className="text-right py-2">Website</th>
                        <th className="text-right py-2">Ads</th>
                        <th className="text-right py-2">G.Maps</th>
                        <th className="text-right py-2">Facebook</th>
                      </tr>
                    </thead>
                    <tbody className="text-zinc-300">
                      <tr className="border-t border-zinc-800/50">
                        <td className="py-3 text-rose-400 font-medium">Bình Dương</td>
                        <td className="text-right">39%</td>
                        <td className="text-right">32%</td>
                        <td className="text-right text-emerald-400">92%</td>
                        <td className="text-right">76%</td>
                      </tr>
                      <tr className="border-t border-zinc-800/50">
                        <td className="py-3">TP.HCM</td>
                        <td className="text-right text-emerald-400">53%</td>
                        <td className="text-right text-emerald-400">40%</td>
                        <td className="text-right">87%</td>
                        <td className="text-right text-emerald-400">80%</td>
                      </tr>
                      <tr className="border-t border-zinc-800/50">
                        <td className="py-3">Vũng Tàu</td>
                        <td className="text-right">38%</td>
                        <td className="text-right">25%</td>
                        <td className="text-right text-emerald-400">100%</td>
                        <td className="text-right">75%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-3 bg-zinc-800/30 rounded-lg">
                  <p className="text-xs text-zinc-400">
                    <strong className="text-blue-400">Insight:</strong> TP.HCM có mức digital hóa cao nhất (53% website). 
                    Bình Dương mạnh về Google Maps (92%).
                  </p>
                </div>
              </ExpandableSection>
            </section>
          </div>
        )}

        {/* ==================== CHANNELS TAB ==================== */}
        {activeTab === 'channels' && (
          <div className="space-y-8">
            
            {/* HERO INSIGHT */}
            <section className="grid grid-cols-2 gap-6">
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6">
                <div className="text-sm text-emerald-400 font-medium mb-2">Kênh phổ biến nhất</div>
                <div className="text-3xl font-bold text-white mb-1">Google Maps</div>
                <div className="text-5xl font-bold text-emerald-400">89%</div>
                <div className="text-sm text-zinc-500 mt-2">137 / 154 trung tâm</div>
              </div>
              
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
                <div className="text-sm text-amber-400 font-medium mb-2">Cơ hội lớn nhất</div>
                <div className="text-3xl font-bold text-white mb-1">TikTok</div>
                <div className="text-5xl font-bold text-amber-400">12%</div>
                <div className="text-sm text-zinc-500 mt-2">88% chưa khai thác</div>
              </div>
            </section>

            {/* CHANNEL BREAKDOWN */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <h2 className="text-lg font-semibold text-white mb-6">Tỷ lệ sử dụng kênh</h2>
              
              <div className="space-y-5">
                {data.channels.map((channel, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-zinc-300">{channel.name}</span>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          channel.type === 'opportunity' ? 'bg-amber-500/20 text-amber-400' :
                          channel.type === 'primary' ? 'bg-emerald-500/20 text-emerald-400' :
                          'bg-zinc-700 text-zinc-400'
                        }`}>
                          {channel.type === 'opportunity' ? 'Cơ hội' : channel.type === 'primary' ? 'Mạnh' : 'TB'}
                        </span>
                        <span className="text-lg font-semibold text-white">{channel.value}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-700"
                        style={{ 
                          width: `${channel.value}%`,
                          backgroundColor: channel.type === 'opportunity' ? '#f59e0b' : channel.type === 'primary' ? '#10b981' : '#52525b'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CONTENT GAP */}
            <section>
              <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">Khoảng trống nội dung</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-5 bg-rose-500/5 border border-rose-500/20 rounded-xl text-center">
                  <div className="text-4xl font-bold text-rose-400">86%</div>
                  <div className="text-sm text-zinc-400 mt-1">Không làm video</div>
                </div>
                <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-xl text-center">
                  <div className="text-4xl font-bold text-amber-400">78%</div>
                  <div className="text-sm text-zinc-400 mt-1">Không công khai giá</div>
                </div>
                <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-xl text-center">
                  <div className="text-4xl font-bold text-blue-400">21%</div>
                  <div className="text-sm text-zinc-400 mt-1">Không có thông điệp</div>
                </div>
              </div>
            </section>

            {/* EXPANDABLE DETAILS */}
            <ExpandableSection title="📝 Chi tiết loại nội dung">
              <div className="space-y-3">
                {[
                  { name: "Tuyển sinh", value: 66, percent: 43 },
                  { name: "Chia sẻ kiến thức", value: 63, percent: 41 },
                  { name: "Hình ảnh lớp học", value: 48, percent: 31 },
                  { name: "Video/Reels", value: 21, percent: 14 },
                  { name: "Tuyển dụng", value: 6, percent: 4 }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-sm text-zinc-400 w-36">{item.name}</span>
                    <div className="flex-1 h-2 bg-zinc-800 rounded-full">
                      <div className="h-full bg-violet-500 rounded-full" style={{ width: `${item.percent}%` }} />
                    </div>
                    <span className="text-sm text-zinc-300 w-16 text-right">{item.percent}%</span>
                  </div>
                ))}
              </div>
            </ExpandableSection>
          </div>
        )}

        {/* ==================== INSIGHTS TAB ==================== */}
        {activeTab === 'insights' && (
          <div className="space-y-8">
            
            {/* STRATEGIC SUMMARY */}
            <section className="bg-gradient-to-br from-rose-500/10 via-transparent to-blue-500/10 rounded-2xl p-8 border border-zinc-800/50">
              <h2 className="text-xl font-semibold text-white mb-6">Tóm tắt chiến lược</h2>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-14 h-14 bg-rose-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Users className="w-7 h-7 text-rose-400" />
                  </div>
                  <div className="text-sm font-medium text-zinc-300">Target chính</div>
                  <div className="text-lg font-semibold text-white mt-1">Người đi làm</div>
                  <div className="text-xs text-zinc-500">58.4% thị trường</div>
                </div>
                
                <div className="text-center">
                  <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-7 h-7 text-blue-400" />
                  </div>
                  <div className="text-sm font-medium text-zinc-300">Khu vực trọng điểm</div>
                  <div className="text-lg font-semibold text-white mt-1">Bình Dương</div>
                  <div className="text-xs text-zinc-500">38 trung tâm</div>
                </div>
                
                <div className="text-center">
                  <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Target className="w-7 h-7 text-emerald-400" />
                  </div>
                  <div className="text-sm font-medium text-zinc-300">Định vị</div>
                  <div className="text-lg font-semibold text-white mt-1">Minh bạch + Cam kết</div>
                  <div className="text-xs text-zinc-500">Khác biệt hóa</div>
                </div>
              </div>
            </section>

            {/* KEY OPPORTUNITIES */}
            <section>
              <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">4 Cơ hội chiến lược</h2>
              <div className="grid grid-cols-2 gap-4">
                <InsightCard 
                  icon="🌐" title="Digital Gap" value="61.7%" 
                  description="Không website → Đầu tư website + SEO tạo lợi thế rõ rệt"
                  type="opportunity"
                />
                <InsightCard 
                  icon="📢" title="Paid Media" value="72%" 
                  description="Không chạy ads → Cơ hội capture với chi phí thấp"
                  type="opportunity"
                />
                <InsightCard 
                  icon="🏢" title="B2B Market" value="89%" 
                  description="Chưa nhắm DN → Blue ocean với FDI Trung Quốc"
                  type="opportunity"
                />
                <InsightCard 
                  icon="🎬" title="Video Content" value="86%" 
                  description="Không làm video → TikTok/Reels tiếp cận Gen Z"
                  type="opportunity"
                />
              </div>
            </section>

            {/* ACTION PRIORITIES */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <h2 className="text-lg font-semibold text-white mb-4">Ưu tiên hành động</h2>
              
              <div className="space-y-3">
                {[
                  { priority: "P1", action: "Tối ưu Google Maps + Thu thập reviews", timeline: "Tháng 1-2" },
                  { priority: "P1", action: "Công khai học phí trên mọi kênh", timeline: "Tháng 1" },
                  { priority: "P1", action: "Launch TikTok (3 video/tuần)", timeline: "Tháng 2-3" },
                  { priority: "P2", action: "Facebook Ads lead generation", timeline: "Tháng 2-4" },
                  { priority: "P2", action: "B2B outreach doanh nghiệp FDI", timeline: "Tháng 3-6" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-zinc-800/30 rounded-lg">
                    <span className={`px-2 py-1 text-xs font-bold rounded ${
                      item.priority === 'P1' ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>{item.priority}</span>
                    <span className="flex-1 text-sm text-zinc-300">{item.action}</span>
                    <span className="text-xs text-zinc-500">{item.timeline}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* POSITIONING STATEMENT */}
            <section className="text-center py-6 border-t border-zinc-800/50">
              <div className="text-sm text-zinc-500 mb-2">Định vị đề xuất</div>
              <blockquote className="text-xl font-medium text-white italic">
                "Tiếng Trung ứng dụng cho người đi làm — <br/>
                <span className="text-rose-400">Cam kết kết quả giao tiếp trong 6 tháng</span>"
              </blockquote>
            </section>
          </div>
        )}

      </main>

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-zinc-800/50 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-4 text-center">
          <p className="text-xs text-zinc-600">
            Market Research • 154 trung tâm • Q4/2025
          </p>
        </div>
      </footer>
    </div>
  );
}

