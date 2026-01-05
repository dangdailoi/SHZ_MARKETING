import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line, FunnelChart, Funnel, LabelList } from 'recharts';
import { TrendingUp, Users, Globe, Target, Megaphone, Award, Building2, BarChart3, Zap, MapPin, ChevronDown, ChevronRight, Info, ArrowRight, AlertTriangle, CheckCircle, XCircle, Eye, Heart, DollarSign, Video, MessageSquare, TrendingDown, ArrowUpRight, Lightbulb, BookOpen } from 'lucide-react';

// ============================================
// DỮ LIỆU PHÂN TÍCH TỪ BÁO CÁO NGHIÊN CỨU THỊ TRƯỜNG
// Dữ liệu được tổng hợp từ khảo sát 153 trung tâm tiếng Trung
// Khu vực: TP.HCM, Bình Dương, Vũng Tàu
// Thời điểm: Q4/2025
// ============================================

const data = {
  // Tổng quan thị trường
  total_schools: 153,
  survey_period: "Q4/2025",
  coverage: ["TP.HCM", "Bình Dương", "Vũng Tàu"],

  // KPIs chính - Các chỉ số quan trọng nhất cho marketing
  // Gap = Khoảng trống thị trường = Cơ hội tiềm năng
  kpis: {
    website: { value: 37.3, count: 57, gap: 62.7, label: "Có Website" },
    seoGood: { value: 71.2, count: 109, label: "SEO Rất Tốt" },
    engagement: { value: 14.4, count: 22, gap: 85.6, label: "Engagement Cao" },
    paidAds: { value: 26.8, count: 41, gap: 73.2, label: "Có Chạy Ads" },
    publicPricing: { value: 9.8, count: 15, gap: 90.2, label: "Công Khai Giá" },
    tiktok: { value: 12.4, count: 19, gap: 87.6, label: "Có TikTok" },
    b2b: { value: 11.1, count: 17, gap: 88.9, label: "Nhắm B2B" },
    videoContent: { value: 14.4, count: 22, gap: 85.6, label: "Làm Video Reels" }
  },

  // Phân bố địa lý theo khu vực
  regions: [
    { name: "TP.HCM", value: 72, percent: 47.1, color: "#3b82f6", hasWebsite: 44.4, seoGood: 70.8, engagement: 15.3, paidAds: 34.7 },
    { name: "Bình Dương", value: 62, percent: 40.5, color: "#f43f5e", hasWebsite: 33.9, seoGood: 74.2, engagement: 12.9, paidAds: 25.8 },
    { name: "Vũng Tàu", value: 15, percent: 9.8, color: "#10b981", hasWebsite: 26.7, seoGood: 80.0, engagement: 20.0, paidAds: 0 },
    { name: "Khác", value: 4, percent: 2.6, color: "#6b7280" }
  ],

  // Phân bố chi tiết theo quận/huyện
  // TP.HCM
  hcmDistricts: [
    { name: "Thủ Đức", value: 14, percent: 19.4 },
    { name: "Bình Thạnh", value: 8, percent: 11.1 },
    { name: "Quận 7", value: 8, percent: 11.1 },
    { name: "Bình Tân", value: 5, percent: 6.9 },
    { name: "Quận 10", value: 4, percent: 5.6 },
    { name: "Gò Vấp", value: 3, percent: 4.2 },
    { name: "Phú Nhuận", value: 3, percent: 4.2 },
    { name: "Quận 3", value: 3, percent: 4.2 }
  ],
  // Bình Dương
  bdDistricts: [
    { name: "Tân Uyên", value: 15, percent: 24.2 },
    { name: "Thủ Dầu Một", value: 14, percent: 22.6 },
    { name: "Bến Cát", value: 12, percent: 19.4 },
    { name: "Thuận An", value: 8, percent: 12.9 },
    { name: "Dĩ An", value: 5, percent: 8.1 }
  ],

  // Kênh digital marketing
  channels: [
    { name: "Google Maps", value: 88.9, count: 136, type: "primary", insight: "Kênh passive - cần reviews" },
    { name: "Facebook", value: 71.2, count: 109, type: "primary", insight: "Reach giảm - cần paid" },
    { name: "YouTube", value: 19.6, count: 30, type: "secondary", insight: "Video dài - consideration" },
    { name: "TikTok", value: 12.4, count: 19, type: "opportunity", insight: "Blue ocean - Gen Z" },
    { name: "Instagram", value: 3.9, count: 6, type: "opportunity", insight: "Gần như bị bỏ quên" }
  ],

  // Phân khúc khách hàng mục tiêu
  // Dữ liệu từ field Target_* trong survey
  segments: [
    { 
      name: "Người đi làm", 
      value: 88, 
      percent: 57.5, 
      isPrimary: true,
      behavior: "Học để thăng tiến",
      pain: "Thiếu thời gian",
      driver: "ROI nghề nghiệp"
    },
    { 
      name: "Sinh viên ĐH", 
      value: 65, 
      percent: 42.5,
      behavior: "Học để CV đẹp",
      pain: "Ngân sách hạn chế",
      driver: "Cơ hội việc làm"
    },
    { 
      name: "Học sinh phổ thông", 
      value: 50, 
      percent: 32.7,
      behavior: "Học thêm ngoài trường",
      pain: "Phụ thuộc phụ huynh",
      driver: "Quyết định của bố mẹ"
    },
    { 
      name: "Trẻ em (4-12)", 
      value: 36, 
      percent: 23.5,
      isOpportunity: true,
      behavior: "Học qua chơi",
      pain: "Cần giáo viên chuyên",
      driver: "Phụ huynh quyết định"
    },
    { 
      name: "Doanh nghiệp", 
      value: 17, 
      percent: 11.1, 
      isOpportunity: true,
      behavior: "Đào tạo nhân sự",
      pain: "Cần customize",
      driver: "ROI training"
    }
  ],

  // Thông điệp marketing phổ biến
  mainMessages: [
    { name: "Ưu đãi học phí", count: 47, percent: 30.7, effectiveness: "low" },
    { name: "Thông báo khai giảng", count: 42, percent: 27.5, effectiveness: "medium" },
    { name: "Chất lượng giáo viên", count: 23, percent: 15.0, effectiveness: "high" },
    { name: "Hình ảnh học viên", count: 20, percent: 13.1, effectiveness: "high" },
    { name: "Cam kết kết quả", count: 15, percent: 9.8, effectiveness: "highest" },
    { name: "Lịch học linh hoạt", count: 13, percent: 8.5, effectiveness: "medium" },
    { name: "Khóa học đa dạng", count: 13, percent: 8.5, effectiveness: "medium" },
    { name: "Cơ hội việc làm", count: 6, percent: 3.9, effectiveness: "high" }
  ],

  // Loại nội dung
  contentTypes: [
    { name: "Tuyển sinh", percent: 43.8, engagement: "medium" },
    { name: "Chia sẻ kiến thức", percent: 41.2, engagement: "high" },
    { name: "Hình ảnh lớp học", percent: 31.4, engagement: "medium" },
    { name: "Video/Reels", percent: 14.4, engagement: "highest" },
    { name: "Tuyển dụng", percent: 3.9, engagement: "low" }
  ],

  // Engagement statistics
  engagementStats: {
    mean: 34.5,
    median: 5.0,
    max: 1000,
    min: 0,
    ratio: 6.9 // Mean/Median ratio - cho thấy phân phối lệch mạnh
  },

  // Brand Recognition
  brandRecognition: [
    { level: "Cao", count: 15, percent: 9.8 },
    { level: "Trung bình", count: 97, percent: 63.4 },
    { level: "Thấp", count: 12, percent: 7.8 },
    { level: "Không có", count: 29, percent: 19.0 }
  ],

  // Logo Design Level
  logoDesign: [
    { level: "Hiện đại", count: 11, percent: 7.2 },
    { level: "Cơ bản", count: 113, percent: 73.9 },
    { level: "Không có", count: 29, percent: 19.0 }
  ],

  // Funnel data - Marketing Funnel Analysis
  // Giả định dựa trên conversion rates ngành
  funnelData: [
    { stage: "Awareness", value: 100, label: "Biết đến", dropOff: 0, cause: "SEO/Social" },
    { stage: "Interest", value: 45, label: "Quan tâm", dropOff: 55, cause: "Content không hấp dẫn" },
    { stage: "Consideration", value: 20, label: "Cân nhắc", dropOff: 56, cause: "Thiếu thông tin giá" },
    { stage: "Intent", value: 12, label: "Ý định mua", dropOff: 40, cause: "Không có trial" },
    { stage: "Evaluation", value: 8, label: "Đánh giá", dropOff: 33, cause: "Reviews ít" },
    { stage: "Purchase", value: 5, label: "Đăng ký", dropOff: 38, cause: "Friction cao" }
  ],

  // Top performers - Những trung tâm có engagement cao nhất
  topPerformers: [
    { name: "Tiếng Trung HD", engagement: 1000, region: "TP.HCM", hasWebsite: true, hasPaidAds: false },
    { name: "Chivi Academy", engagement: 300, region: "TP.HCM", hasWebsite: true, hasPaidAds: true },
    { name: "Hoa Ngữ Hoa Lạc", engagement: 250, region: "TP.HCM", hasWebsite: false, hasPaidAds: true },
    { name: "SOFL", engagement: 200, region: "TP.HCM", hasWebsite: true, hasPaidAds: true },
    { name: "Hoa Ngữ Mỹ Xuân", engagement: 200, region: "Vũng Tàu", hasWebsite: false, hasPaidAds: false }
  ],

  // Diagnostic Insights - PHẦN QUAN TRỌNG NHẤT
  // Mỗi insight có: phenomenon (hiện tượng), rootCause (nguyên nhân gốc), implication (hàm ý marketing)
  diagnosticInsights: [
    {
      id: 1,
      phenomenon: "71.2% SEO 'rất tốt' nhưng chỉ 14.4% engagement cao",
      metric1: 71.2,
      metric2: 14.4,
      gap: 56.8,
      rootCause: "SEO fanpage dễ đạt do cạnh tranh thấp với từ khóa địa phương. Fanpage không được thiết kế để chuyển đổi - thiếu landing page, CTA rõ ràng.",
      implication: "Đầu tư vào CONVERSION, không chỉ REACH. Website + content marketing quan trọng hơn SEO fanpage.",
      actionable: "Xây landing page với CTA rõ ràng, track conversion từ từng kênh"
    },
    {
      id: 2,
      phenomenon: "90.2% không công khai học phí",
      metric1: 90.2,
      metric2: 9.8,
      rootCause: "Sợ khách so sánh giá; thiếu tự tin vào value proposition; marketing mindset cũ 'bán hàng = thuyết phục'.",
      implication: "Công khai giá + justification tạo TRUST và filter đúng khách hàng, giảm thời gian tư vấn lead không phù hợp.",
      actionable: "Đưa 3 tiers giá với so sánh features rõ ràng, anchor pricing cao"
    },
    {
      id: 3,
      phenomenon: "87.6% không có TikTok, 85.6% không làm video",
      metric1: 87.6,
      metric2: 85.6,
      rootCause: "Gap thế hệ: marketers 35-55 tuổi nhưng audience 18-35 tuổi. Thiếu kỹ năng sản xuất video, không có benchmark trong ngành.",
      implication: "TikTok/Reels là BLUE OCEAN. First mover advantage với content 'học 1 từ/ngày', reaction video học viên.",
      actionable: "Mở TikTok, đăng 3 video/tuần, format ngắn educational"
    },
    {
      id: 4,
      phenomenon: "88.9% không nhắm đến doanh nghiệp",
      metric1: 88.9,
      metric2: 11.1,
      rootCause: "Rào cản năng lực B2B sales, chu kỳ bán hàng dài, cần customize curriculum. Chủ trung tâm phần lớn là giáo viên.",
      implication: "B2B là BLUE OCEAN với ticket size 10-50x B2C. Bình Dương có 29,000+ doanh nghiệp FDI - cơ hội lớn.",
      actionable: "Pilot với 2-3 doanh nghiệp quen, xây case study, tuyển B2B sales"
    }
  ],

  // Strategic Recommendations
  recommendations: {
    quickWins: [
      { action: "Công khai học phí", timeline: "0-1 tháng", impact: "★★★★", effort: "★", risk: "Có thể mất khách muốn đàm phán" },
      { action: "Tạo TikTok account", timeline: "0-1 tháng", impact: "★★★", effort: "★★", risk: "Content không viral" },
      { action: "Triển khai học thử", timeline: "1-2 tháng", impact: "★★★★", effort: "★★", risk: "Tốn resource cho không convert" }
    ],
    shortTerm: [
      { action: "Content marketing engine", timeline: "3-6 tháng", impact: "★★★★★", effort: "★★★", risk: "Long game, không thấy ROI ngay" },
      { action: "Referral program", timeline: "3-4 tháng", impact: "★★★★", effort: "★★", risk: "Incentive quá thấp = không hiệu quả" },
      { action: "Website upgrade", timeline: "3-6 tháng", impact: "★★★★", effort: "★★★", risk: "Website xấu hơn không có" }
    ],
    mediumTerm: [
      { action: "B2B sales capability", timeline: "6-12 tháng", impact: "★★★★★", effort: "★★★★", risk: "Overextend resources" },
      { action: "Specialized programs", timeline: "6-9 tháng", impact: "★★★★", effort: "★★★", risk: "Chọn sai specialization" },
      { action: "Customer success program", timeline: "6-12 tháng", impact: "★★★★", effort: "★★★", risk: "Thành admin burden" }
    ]
  },

  // Competitive positioning matrix data
  competitivePositioning: [
    { name: "Mass Market", x: 20, y: 40, size: 70, description: "Giá thấp, chất lượng TB", count: 108 },
    { name: "Premium", x: 80, y: 80, size: 20, description: "Giá cao, chất lượng cao", count: 15 },
    { name: "Specialized", x: 70, y: 50, size: 25, description: "Chuyên sâu theo ngành", count: 18 },
    { name: "Corporate", x: 85, y: 75, size: 15, description: "Focus B2B", count: 12 }
  ]
};

// ============================================
// COMPONENTS
// ============================================

// Hero Metric - Hiển thị số liệu lớn, nổi bật
const HeroMetric = ({ value, label, sublabel, accent = false }) => (
  <div className={`text-center ${accent ? 'text-rose-400' : 'text-white'}`}>
    <div className={`text-5xl font-bold tracking-tight ${accent ? 'text-rose-400' : 'text-white'}`}>
      {value}
    </div>
    <div className="text-sm text-zinc-400 mt-1">{label}</div>
    {sublabel && <div className="text-xs text-zinc-500">{sublabel}</div>}
  </div>
);

// KPI Card - Hiển thị KPI với gap indicator
const KPICard = ({ icon: Icon, label, value, count, gap, color = "zinc", insight }) => {
  const colors = {
    rose: "text-rose-400 bg-rose-500/10",
    blue: "text-blue-400 bg-blue-500/10",
    emerald: "text-emerald-400 bg-emerald-500/10",
    amber: "text-amber-400 bg-amber-500/10",
    violet: "text-violet-400 bg-violet-500/10",
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
      {/* Tooltip với insight */}
      {insight && (
        <div className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-zinc-800 rounded-lg text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          💡 {insight}
        </div>
      )}
    </div>
  );
};

// Expandable Section - Có thể mở/đóng
const ExpandableSection = ({ title, children, defaultOpen = false, badge }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-zinc-800/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-zinc-900/40 hover:bg-zinc-900/60 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-300">{title}</span>
          {badge && (
            <span className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-400 rounded-full">{badge}</span>
          )}
        </div>
        {isOpen ? <ChevronDown className="w-4 h-4 text-zinc-500" /> : <ChevronRight className="w-4 h-4 text-zinc-500" />}
      </button>
      {isOpen && <div className="p-4 bg-zinc-900/20">{children}</div>}
    </div>
  );
};

// Insight Card - Hiển thị insight chiến lược
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

// Diagnostic Card - Hiển thị insight chẩn đoán với nguyên nhân gốc
const DiagnosticCard = ({ phenomenon, metric1, metric2, rootCause, implication, actionable }) => (
  <div className="bg-zinc-900/40 rounded-2xl border border-zinc-800/50 overflow-hidden">
    {/* Phenomenon - Hiện tượng quan sát được */}
    <div className="p-5 border-b border-zinc-800/50">
      <div className="flex items-center gap-2 mb-3">
        <Eye className="w-4 h-4 text-blue-400" />
        <span className="text-xs text-blue-400 uppercase tracking-wider font-medium">Hiện tượng</span>
      </div>
      <p className="text-sm text-zinc-300">{phenomenon}</p>
      <div className="flex items-center gap-4 mt-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{metric1}%</div>
        </div>
        <ArrowRight className="w-5 h-5 text-zinc-600" />
        <div className="text-center">
          <div className="text-2xl font-bold text-rose-400">{metric2}%</div>
        </div>
      </div>
    </div>

    {/* Root Cause - Nguyên nhân gốc rễ */}
    <div className="p-5 border-b border-zinc-800/50 bg-rose-500/5">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-rose-400" />
        <span className="text-xs text-rose-400 uppercase tracking-wider font-medium">Nguyên nhân gốc</span>
      </div>
      <p className="text-xs text-zinc-400">{rootCause}</p>
    </div>

    {/* Marketing Implication - Hàm ý marketing */}
    <div className="p-5 border-b border-zinc-800/50 bg-amber-500/5">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-amber-400" />
        <span className="text-xs text-amber-400 uppercase tracking-wider font-medium">Hàm ý marketing</span>
      </div>
      <p className="text-xs text-zinc-400">{implication}</p>
    </div>

    {/* Actionable - Hành động cụ thể */}
    <div className="p-5 bg-emerald-500/5">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle className="w-4 h-4 text-emerald-400" />
        <span className="text-xs text-emerald-400 uppercase tracking-wider font-medium">Hành động</span>
      </div>
      <p className="text-xs text-zinc-400">{actionable}</p>
    </div>
  </div>
);

// Funnel Stage Component
const FunnelStage = ({ stage, value, label, dropOff, cause, isLast }) => (
  <div className="relative">
    <div className="flex items-center gap-4">
      {/* Value indicator */}
      <div className="w-16 text-right">
        <div className="text-xl font-bold text-white">{value}%</div>
      </div>

      {/* Bar */}
      <div className="flex-1">
        <div className="h-10 bg-zinc-800 rounded-lg overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg flex items-center justify-end pr-3"
            style={{ width: `${value}%` }}
          >
            <span className="text-xs font-medium text-white">{label}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Drop-off indicator */}
    {!isLast && dropOff > 0 && (
      <div className="ml-20 mt-1 mb-2 flex items-center gap-2 text-xs">
        <TrendingDown className="w-3 h-3 text-rose-400" />
        <span className="text-rose-400">-{dropOff}%</span>
        <span className="text-zinc-500">•</span>
        <span className="text-zinc-400">{cause}</span>
      </div>
    )}
  </div>
);

// Simple Progress Bar
const SimpleBar = ({ label, value, maxValue = 100, color = "#f43f5e", subLabel }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between">
      <span className="text-xs text-zinc-400">{label}</span>
      <span className="text-xs font-medium text-zinc-300">{value}%</span>
    </div>
    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${(value / maxValue) * 100}%`, backgroundColor: color }}
      />
    </div>
    {subLabel && <div className="text-xs text-zinc-500">{subLabel}</div>}
  </div>
);

// ============================================
// MAIN DASHBOARD COMPONENT
// ============================================
export default function MarketResearchDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRegion, setSelectedRegion] = useState(null);

  const tabs = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'segments', label: 'Phân khúc KH' },
    { id: 'diagnostic', label: 'Chẩn đoán', badge: 'Quan trọng' },
    { id: 'funnel', label: 'Funnel' },
    { id: 'competitive', label: 'Cạnh tranh' },
    // { id: 'strategy', label: 'Chiến lược' }
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
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-rose-400 font-medium tracking-wider mb-1">STRATEGIC MARKET RESEARCH</div>
              <h1 className="text-xl font-semibold text-white">Thị trường Đào Tiếng Trung</h1>
            </div>

            {/* Navigation */}
            <nav className="flex gap-1 bg-zinc-900/50 p-1 rounded-lg overflow-x-auto hide-scrollbar">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {tab.label}
                  {tab.badge && (
                    <span className="px-1.5 py-0.5 text-xs bg-rose-500/20 text-rose-400 rounded">!</span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* ========== MAIN CONTENT ========== */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* ==================== TAB 1: TỔNG QUAN THỊ TRƯỜNG ==================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">

            {/* HERO SECTION - Tổng quan nhanh */}
            <section className="text-center py-8">
              <HeroMetric
                value={data.total_schools}
                label="Trung tâm tiếng Trung được khảo sát"
                sublabel="TP.HCM • Bình Dương • Vũng Tàu • Q4/2025"
                accent
              />

              {/* Quick context by region */}
              <div className="flex items-center justify-center gap-8 mt-8">
                {data.regions.slice(0, 3).map((region, i) => (
                  <React.Fragment key={region.name}>
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-white">{region.value}</div>
                      <div className="text-xs text-zinc-500">{region.name}</div>
                      <div className="text-xs text-zinc-600">{region.percent}%</div>
                    </div>
                    {i < 2 && <div className="w-px h-8 bg-zinc-800" />}
                  </React.Fragment>
                ))}
              </div>
            </section>

            {/* NGHỊCH LÝ CỐT LÕI - Key Paradox */}
            <section className="bg-gradient-to-br from-rose-500/10 via-transparent to-blue-500/10 rounded-2xl p-6 border border-zinc-800/50">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <h2 className="text-lg font-semibold text-white">Nghịch lý cốt lõi của thị trường</h2>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400">71.2%</div>
                  <div className="text-sm text-zinc-400 mt-1">SEO "rất tốt"</div>
                  <div className="text-xs text-zinc-600">Dễ được tìm thấy</div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <ArrowRight className="w-8 h-8 text-zinc-600 mx-auto" />
                    <div className="text-xs text-zinc-500 mt-1">NHƯNG</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-rose-400">14.4%</div>
                  <div className="text-sm text-zinc-400 mt-1">Engagement cao</div>
                  <div className="text-xs text-zinc-600">Thực sự được chọn</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-zinc-900/60 rounded-xl">
                <p className="text-sm text-zinc-400">
                  <strong className="text-amber-400">💡 Insight chiến lược:</strong> "Được tìm thấy" ≠ "Được chọn". 
                  Lợi thế cạnh tranh không nằm ở SEO mà nằm ở khả năng CHUYỂN ĐỔI sau tiếp xúc đầu tiên.
                </p>
              </div>
            </section>

            {/* KEY METRICS - 6 KPIs quan trọng nhất */}
            <section>
              <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">Chỉ số chính & Khoảng trống thị trường</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <KPICard icon={Globe} label="Có Website" value={37.3} gap={62.7} color="blue" insight="62.7% chưa có → cơ hội khác biệt hóa digital" />
                <KPICard icon={DollarSign} label="Công Khai Giá" value={9.8} gap={90.2} color="amber" insight="90.2% giấu giá → cơ hội tạo trust bằng minh bạch" />
                <KPICard icon={Video} label="TikTok" value={12.4} gap={87.6} color="rose" insight="87.6% chưa có → blue ocean Gen Z" />
                <KPICard icon={Megaphone} label="Chạy Ads" value={26.8} gap={73.2} color="violet" insight="73.2% không ads → thị trường paid còn trống" />
                <KPICard icon={Building2} label="Nhắm B2B" value={11.1} gap={88.9} color="emerald" insight="88.9% bỏ qua DN → blue ocean ticket size cao" />
                <KPICard icon={Heart} label="Engagement Cao" value={14.4} gap={85.6} color="rose" insight="85.6% engagement thấp → content strategy yếu" />
              </div>
            </section>

            {/* PHÂN BỐ KÊNH MARKETING */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">Phân bố kênh Marketing</h2>
                  <p className="text-sm text-zinc-500">Tỷ lệ trung tâm sử dụng từng kênh • Click để xem insight</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Phổ biến
                  <span className="w-2 h-2 rounded-full bg-amber-500 ml-2" /> Cơ hội
                </div>
              </div>

              <div className="space-y-4">
                {data.channels.map((channel, i) => (
                  <div key={i} className="group">
                    <div className="flex items-center gap-4">
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
                      <span className="text-sm font-semibold text-white w-14 text-right">{channel.value}%</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        channel.type === 'opportunity' ? 'bg-amber-500/20 text-amber-400' : 'bg-zinc-700 text-zinc-400'
                      }`}>
                        {channel.type === 'opportunity' ? 'Cơ hội' : channel.count + ' TT'}
                      </span>
                    </div>
                    {/* Insight on hover */}
                    <div className="ml-32 mt-1 text-xs text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      💡 {channel.insight}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5 CƠ HỘI CHIẾN LƯỢC */}
            <section>
              <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">Top 5 Cơ hội chiến lược</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <InsightCard
                  icon="💰"
                  title="Minh bạch học phí"
                  value="90.2%"
                  description="Không công khai → Công khai giá + justification tạo trust"
                  type="opportunity"
                />
                <InsightCard
                  icon="📱"
                  title="TikTok chưa khai thác"
                  value="87.6%"
                  description="Chưa có TikTok → First mover với content 'học 1 từ/ngày'"
                  type="opportunity"
                />
                <InsightCard
                  icon="🏢"
                  title="B2B bị bỏ ngỏ"
                  value="88.9%"
                  description="Không nhắm DN → Blue ocean với FDI Đài Loan/TQ"
                  type="opportunity"
                />
                <InsightCard
                  icon="👶"
                  title="Phân khúc trẻ em"
                  value="76.5%"
                  description="Không nhắm trẻ em → Thị trường ngách cao cấp"
                  type="opportunity"
                />
                <InsightCard
                  icon="🎬"
                  title="Video content"
                  value="85.6%"
                  description="Không làm video → Reels/Shorts tiếp cận Gen Z"
                  type="opportunity"
                />
                <InsightCard
                  icon="📍"
                  title="Offline marketing"
                  value="92.8%"
                  description="Không có offline → Học thử, event, partnership"
                  type="opportunity"
                />
              </div>
            </section>

            {/* REGIONAL BREAKDOWN - Expandable */}
            <ExpandableSection title="📊 Chi tiết theo khu vực" defaultOpen>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-zinc-500 text-xs uppercase">
                      <th className="text-left py-2">Khu vực</th>
                      <th className="text-right py-2">Số TT</th>
                      <th className="text-right py-2">Website</th>
                      <th className="text-right py-2">SEO tốt</th>
                      <th className="text-right py-2">Eng. cao</th>
                      <th className="text-right py-2">Paid Ads</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-300">
                    {data.regions.slice(0, 3).map((region, i) => (
                      <tr key={i} className="border-t border-zinc-800/50">
                        <td className="py-3 font-medium" style={{ color: region.color }}>{region.name}</td>
                        <td className="text-right">{region.value}</td>
                        <td className="text-right">{region.hasWebsite}%</td>
                        <td className="text-right">{region.seoGood}%</td>
                        <td className="text-right">{region.engagement}%</td>
                        <td className="text-right">{region.paidAds}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 bg-zinc-800/30 rounded-lg">
                <p className="text-xs text-zinc-400">
                  <strong className="text-blue-400">Insight:</strong> TP.HCM có digital hóa cao nhất (44.4% website, 34.7% ads).
                  Vũng Tàu không có ai chạy ads → thị trường hoàn toàn trống.
                </p>
              </div>
            </ExpandableSection>
          </div>
        )}

        {/* ==================== TAB 2: PHÂN KHÚC KHÁCH HÀNG ==================== */}
        {activeTab === 'segments' && (
          <div className="space-y-8">

            {/* HERO - Target chính */}
            <section className="bg-gradient-to-br from-rose-500/10 to-transparent rounded-2xl p-8 border border-rose-500/20">
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <div className="text-sm text-rose-400 font-medium mb-2">Phân khúc chính (Primary Target)</div>
                  <div className="text-4xl font-bold text-white mb-1">Người đi làm</div>
                  <div className="text-zinc-400">57.5% thị trường • Học để thăng tiến nghề nghiệp</div>
                </div>
                <div className="text-right">
                  <div className="text-6xl font-bold text-rose-400">88</div>
                  <div className="text-sm text-zinc-500">trung tâm nhắm đến</div>
                </div>
              </div>
            </section>

            {/* SEGMENT CARDS - Chi tiết từng phân khúc */}
            <section>
              <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">Phân tích hành vi theo phân khúc</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {data.segments.map((seg, i) => (
                  <div
                    key={i}
                    className={`p-5 rounded-xl border transition-all ${
                      seg.isPrimary
                        ? 'border-rose-500/50 bg-rose-500/5'
                        : seg.isOpportunity
                        ? 'border-amber-500/50 bg-amber-500/5'
                        : 'border-zinc-800/50 bg-zinc-900/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-lg font-semibold ${seg.isPrimary ? 'text-rose-400' : seg.isOpportunity ? 'text-amber-400' : 'text-white'}`}>
                        {seg.name}
                      </span>
                      <span className="text-sm text-zinc-400">{seg.percent}%</span>
                    </div>

                    {/* Behavior */}
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <span className="text-zinc-500 w-16">Hành vi:</span>
                        <span className="text-zinc-300">{seg.behavior}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-zinc-500 w-16">Pain:</span>
                        <span className="text-zinc-300">{seg.pain}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-zinc-500 w-16">Driver:</span>
                        <span className="text-zinc-300">{seg.driver}</span>
                      </div>
                    </div>

                    {/* Tag */}
                    {(seg.isPrimary || seg.isOpportunity) && (
                      <div className="mt-3 pt-3 border-t border-zinc-800/50">
                        <span className={`text-xs px-2 py-1 rounded ${
                          seg.isPrimary ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {seg.isPrimary ? '🎯 Target chính' : '💎 Cơ hội Blue Ocean'}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SEGMENT SIZING BAR CHART */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <h2 className="text-lg font-semibold text-white mb-6">Quy mô phân khúc được nhắm đến</h2>
              <div className="space-y-4">
                {data.segments.map((seg, i) => (
                  <div key={i}>
                    <SimpleBar
                      label={seg.name}
                      value={seg.percent}
                      color={seg.isPrimary ? '#f43f5e' : seg.isOpportunity ? '#f59e0b' : '#52525b'}
                      subLabel={`${seg.value} trung tâm`}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* B2B OPPORTUNITY DEEP DIVE */}
            <section className="bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl p-6 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-semibold text-white">Deep Dive: Cơ hội B2B</h2>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* B2C vs B2B comparison */}
                <div>
                  <h3 className="text-sm text-zinc-400 mb-3">So sánh B2C vs B2B</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between p-2 bg-zinc-800/30 rounded">
                      <span className="text-zinc-400">Ticket size</span>
                      <span className="text-zinc-300">3-10tr vs <span className="text-amber-400 font-semibold">50-500tr</span></span>
                    </div>
                    <div className="flex justify-between p-2 bg-zinc-800/30 rounded">
                      <span className="text-zinc-400">Lifetime value</span>
                      <span className="text-zinc-300">6-24 tháng vs <span className="text-amber-400 font-semibold">2-5 năm</span></span>
                    </div>
                    <div className="flex justify-between p-2 bg-zinc-800/30 rounded">
                      <span className="text-zinc-400">Churn rate</span>
                      <span className="text-zinc-300">30-50% vs <span className="text-amber-400 font-semibold">10-20%</span></span>
                    </div>
                  </div>
                </div>

                {/* Why B2B is underserved */}
                <div>
                  <h3 className="text-sm text-zinc-400 mb-3">Tại sao B2B bị bỏ ngỏ?</h3>
                  <div className="space-y-2 text-xs text-zinc-400">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-rose-400 mt-0.5" />
                      <span>Thiếu năng lực B2B sales (cycle dài)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-rose-400 mt-0.5" />
                      <span>Cần customize curriculum</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-rose-400 mt-0.5" />
                      <span>Chủ TT là giáo viên, không quen kinh doanh</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
                      <span className="text-emerald-400">→ Ai vượt qua sẽ chiếm blue ocean</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* TARGETING MATRIX */}
            <ExpandableSection title="📊 Ma trận đánh giá phân khúc">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-zinc-500 text-xs uppercase">
                      <th className="text-left py-2">Phân khúc</th>
                      <th className="text-center py-2">Size</th>
                      <th className="text-center py-2">Growth</th>
                      <th className="text-center py-2">Cạnh tranh</th>
                      <th className="text-center py-2">Fit</th>
                      <th className="text-center py-2">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-300">
                    <tr className="border-t border-zinc-800/50">
                      <td className="py-3 text-rose-400 font-medium">NV văn phòng</td>
                      <td className="text-center">★★★</td>
                      <td className="text-center">★★★</td>
                      <td className="text-center">★★☆</td>
                      <td className="text-center">★★★</td>
                      <td className="text-center text-rose-400 font-bold">1</td>
                    </tr>
                    <tr className="border-t border-zinc-800/50">
                      <td className="py-3 text-amber-400 font-medium">Doanh nghiệp</td>
                      <td className="text-center">★★☆</td>
                      <td className="text-center">★★★</td>
                      <td className="text-center text-emerald-400">★☆☆</td>
                      <td className="text-center">★★☆</td>
                      <td className="text-center text-amber-400 font-bold">2</td>
                    </tr>
                    <tr className="border-t border-zinc-800/50">
                      <td className="py-3 text-amber-400 font-medium">Trẻ em</td>
                      <td className="text-center">★☆☆</td>
                      <td className="text-center">★★★</td>
                      <td className="text-center text-emerald-400">★☆☆</td>
                      <td className="text-center">★★☆</td>
                      <td className="text-center text-amber-400 font-bold">3</td>
                    </tr>
                    <tr className="border-t border-zinc-800/50">
                      <td className="py-3">NV nhà máy</td>
                      <td className="text-center">★★☆</td>
                      <td className="text-center">★★☆</td>
                      <td className="text-center">★★☆</td>
                      <td className="text-center">★★☆</td>
                      <td className="text-center">4</td>
                    </tr>
                    <tr className="border-t border-zinc-800/50">
                      <td className="py-3">Sinh viên</td>
                      <td className="text-center">★★★</td>
                      <td className="text-center">★☆☆</td>
                      <td className="text-center text-rose-400">★★★</td>
                      <td className="text-center">★★★</td>
                      <td className="text-center">5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 bg-zinc-800/30 rounded-lg">
                <p className="text-xs text-zinc-400">
                  <strong className="text-amber-400">Khuyến nghị:</strong> Primary = NV văn phòng (high growth, high fit).
                  Secondary = Doanh nghiệp + Trẻ em (low competition, high growth).
                </p>
              </div>
            </ExpandableSection>
          </div>
        )}

        {/* ==================== TAB 3: CHẨN ĐOÁN (QUAN TRỌNG NHẤT) ==================== */}
        {activeTab === 'diagnostic' && (
          <div className="space-y-8">

            {/* INTRO - Giải thích tầm quan trọng */}
            <section className="bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-blue-500/10 rounded-2xl p-6 border border-zinc-800/50">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
                <h2 className="text-xl font-semibold text-white">Phân tích Chẩn đoán — Nguyên nhân Gốc rễ</h2>
              </div>
              <p className="text-sm text-zinc-400">
                Phần này trả lời câu hỏi <strong className="text-white">"TẠI SAO"</strong> các hiện tượng xảy ra,
                không chỉ mô tả "cái gì" đang xảy ra. Mỗi insight đều có chuỗi:
                <span className="text-blue-400 mx-1">Hiện tượng</span> →
                <span className="text-rose-400 mx-1">Nguyên nhân gốc</span> →
                <span className="text-amber-400 mx-1">Hàm ý marketing</span> →
                <span className="text-emerald-400 mx-1">Hành động</span>
              </p>
            </section>

            {/* DIAGNOSTIC CARDS - 4 insights chính */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {data.diagnosticInsights.map((insight) => (
                <DiagnosticCard
                  key={insight.id}
                  phenomenon={insight.phenomenon}
                  metric1={insight.metric1}
                  metric2={insight.metric2}
                  rootCause={insight.rootCause}
                  implication={insight.implication}
                  actionable={insight.actionable}
                />
              ))}
            </section>

            {/* THÔNG ĐIỆP MARKETING - Phân tích effectiveness */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <h2 className="text-lg font-semibold text-white mb-2">Chẩn đoán: Thông điệp Marketing</h2>
              <p className="text-sm text-zinc-500 mb-6">Đánh giá hiệu quả của các thông điệp phổ biến</p>

              <div className="space-y-4">
                {data.mainMessages.map((msg, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-sm text-zinc-300 w-40">{msg.name}</span>
                    <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${msg.percent}%`,
                          backgroundColor:
                            msg.effectiveness === 'highest' ? '#10b981' :
                            msg.effectiveness === 'high' ? '#3b82f6' :
                            msg.effectiveness === 'medium' ? '#6b7280' : '#f43f5e'
                        }}
                      />
                    </div>
                    <span className="text-sm text-zinc-300 w-12 text-right">{msg.percent}%</span>
                    <span className={`text-xs px-2 py-0.5 rounded w-20 text-center ${
                      msg.effectiveness === 'highest' ? 'bg-emerald-500/20 text-emerald-400' :
                      msg.effectiveness === 'high' ? 'bg-blue-500/20 text-blue-400' :
                      msg.effectiveness === 'medium' ? 'bg-zinc-700 text-zinc-400' :
                      'bg-rose-500/20 text-rose-400'
                    }`}>
                      {msg.effectiveness === 'highest' ? 'Hiệu quả cao' :
                       msg.effectiveness === 'high' ? 'Tốt' :
                       msg.effectiveness === 'medium' ? 'Trung bình' : 'Thấp'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span className="text-sm font-medium text-rose-400">Stop</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    "Ưu đãi học phí" (30.7%) → Race to bottom, xói mòn margin, thu hút khách price-sensitive
                  </p>
                </div>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">Start</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    "Cam kết kết quả" (9.8%) → Highest effectiveness nhưng ít dùng → Cơ hội differentiate
                  </p>
                </div>
              </div>
            </section>

            {/* ENGAGEMENT PARADOX */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <h2 className="text-lg font-semibold text-white mb-2">Chẩn đoán: Phân cực Engagement</h2>
              <p className="text-sm text-zinc-500 mb-6">Mean/Median ratio = {data.engagementStats.ratio}x → Phân phối lệch cực mạnh</p>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-zinc-800/30 rounded-xl">
                  <div className="text-2xl font-bold text-blue-400">{data.engagementStats.mean}</div>
                  <div className="text-xs text-zinc-500">Mean</div>
                </div>
                <div className="text-center p-4 bg-zinc-800/30 rounded-xl">
                  <div className="text-2xl font-bold text-rose-400">{data.engagementStats.median}</div>
                  <div className="text-xs text-zinc-500">Median</div>
                </div>
                <div className="text-center p-4 bg-zinc-800/30 rounded-xl">
                  <div className="text-2xl font-bold text-emerald-400">{data.engagementStats.max}</div>
                  <div className="text-xs text-zinc-500">Max</div>
                </div>
                <div className="text-center p-4 bg-zinc-800/30 rounded-xl">
                  <div className="text-2xl font-bold text-zinc-400">{data.engagementStats.min}</div>
                  <div className="text-xs text-zinc-500">Min</div>
                </div>
              </div>

              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-amber-400">Ý nghĩa</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Median (5) thấp hơn nhiều so với Mean (34.5) → <strong className="text-white">Một số ít trung tâm chiếm đa số engagement,
                  phần lớn còn lại gần như "vô hình"</strong>. Công thức thành công = Tần suất cao + Content đa dạng + (Paid ads HOẶC viral content).
                </p>
              </div>
            </section>
          </div>
        )}

        {/* ==================== TAB 4: FUNNEL ANALYSIS ==================== */}
        {activeTab === 'funnel' && (
          <div className="space-y-8">

            {/* FUNNEL VISUALIZATION */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white">Marketing Funnel — Hành trình học viên</h2>
                <p className="text-sm text-zinc-500">
                  Phân tích drop-off tại mỗi giai đoạn và NGUYÊN NHÂN gây rò rỉ
                </p>
              </div>

              <div className="space-y-2">
                {data.funnelData.map((stage, i) => (
                  <FunnelStage
                    key={i}
                    stage={stage.stage}
                    value={stage.value}
                    label={stage.label}
                    dropOff={stage.dropOff}
                    cause={stage.cause}
                    isLast={i === data.funnelData.length - 1}
                  />
                ))}
              </div>
            </section>

            {/* FRICTION POINTS ANALYSIS */}
            <section>
              <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">Điểm ma sát chính (Friction Points)</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-rose-400 font-medium">Awareness → Interest</span>
                    <span className="text-2xl font-bold text-rose-400">-55%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <AlertTriangle className="w-3 h-3 text-rose-400" />
                      <span>Nguyên nhân: Content không hấp dẫn</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                      <span>Giải pháp: Educational content, video ngắn</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-amber-400 font-medium">Interest → Consideration</span>
                    <span className="text-2xl font-bold text-amber-400">-56%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      <span>Nguyên nhân: Thiếu thông tin giá, curriculum</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                      <span>Giải pháp: Công khai giá, landing page chi tiết</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-blue-400 font-medium">Intent → Evaluation</span>
                    <span className="text-2xl font-bold text-blue-400">-33%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <AlertTriangle className="w-3 h-3 text-blue-400" />
                      <span>Nguyên nhân: Reviews ít, không có trial</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                      <span>Giải pháp: Chương trình học thử, thu thập reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* AARRR FRAMEWORK */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <h2 className="text-lg font-semibold text-white mb-6">AARRR Metrics — Đánh giá theo framework</h2>

              <div className="space-y-6">
                {/* Acquisition */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-zinc-300">Acquisition (Thu hút)</span>
                    <span className="text-xs text-amber-400">Trung bình</span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-2">71.2% có SEO tốt nhưng phụ thuộc Facebook organic (reach giảm)</p>
                  <div className="h-2 bg-zinc-800 rounded-full">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>

                {/* Activation */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-zinc-300">Activation (Kích hoạt)</span>
                    <span className="text-xs text-rose-400">Yếu</span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-2">Ít trial class, thiếu onboarding → Rào cản cao khi bắt đầu</p>
                  <div className="h-2 bg-zinc-800 rounded-full">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '30%' }} />
                  </div>
                </div>

                {/* Retention */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-zinc-300">Retention (Giữ chân)</span>
                    <span className="text-xs text-rose-400">Yếu</span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-2">Thiếu progress tracking, community → Không thấy giá trị dài hạn</p>
                  <div className="h-2 bg-zinc-800 rounded-full">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '25%' }} />
                  </div>
                </div>

                {/* Referral */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-zinc-300">Referral (Giới thiệu)</span>
                    <span className="text-xs text-rose-400">Rất yếu</span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-2">Hầu như không có referral program → WOM không được amplify</p>
                  <div className="h-2 bg-zinc-800 rounded-full">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '15%' }} />
                  </div>
                </div>

                {/* Revenue */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-zinc-300">Revenue (Doanh thu)</span>
                    <span className="text-xs text-amber-400">Cơ hội lớn</span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-2">Thiếu upselling, premium tier, B2B → Bỏ lỡ revenue optimization</p>
                  <div className="h-2 bg-zinc-800 rounded-full">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== TAB 5: CẠNH TRANH & POSITIONING ==================== */}
        {activeTab === 'competitive' && (
          <div className="space-y-8">

            {/* POSITIONING MAP - Conceptual */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white">Bản đồ định vị cạnh tranh</h2>
                <p className="text-sm text-zinc-500">
                  Phân bố trung tâm theo Price (trục X) vs Quality/Value (trục Y)
                </p>
              </div>

              {/* Simple positioning visualization */}
              <div className="relative h-80 bg-zinc-800/30 rounded-xl p-4">
                {/* Axes labels */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs text-zinc-500">CHẤT LƯỢNG CAO</div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-zinc-500">CHẤT LƯỢNG THẤP</div>
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-zinc-500">GIÁ THẤP</div>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 rotate-90 text-xs text-zinc-500">GIÁ CAO</div>

                {/* Positioning bubbles */}
                <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-24 h-24 bg-zinc-600/50 rounded-full flex items-center justify-center border border-zinc-500">
                    <div className="text-center">
                      <div className="text-lg font-bold text-zinc-300">70%</div>
                      <div className="text-xs text-zinc-400">Mass Market</div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-amber-500/30 rounded-full flex items-center justify-center border border-amber-500/50">
                    <div className="text-center">
                      <div className="text-sm font-bold text-amber-400">10%</div>
                      <div className="text-xs text-zinc-400">Premium</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-1/3 right-1/3">
                  <div className="w-14 h-14 bg-blue-500/30 rounded-full flex items-center justify-center border border-blue-500/50">
                    <div className="text-center">
                      <div className="text-sm font-bold text-blue-400">12%</div>
                      <div className="text-xs text-zinc-400">Specialized</div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/5 right-1/5 transform translate-x-full">
                  <div className="w-12 h-12 bg-emerald-500/30 rounded-full flex items-center justify-center border border-emerald-500/50">
                    <div className="text-center">
                      <div className="text-sm font-bold text-emerald-400">8%</div>
                      <div className="text-xs text-zinc-400">B2B</div>
                    </div>
                  </div>
                </div>

                {/* Opportunity zone */}
                <div className="absolute top-1/3 right-1/4 w-20 h-20 border-2 border-dashed border-amber-500/50 rounded-xl flex items-center justify-center">
                  <span className="text-xs text-amber-400 text-center">CƠ HỘI<br/>KHÁC BIỆT</span>
                </div>
              </div>
            </section>

            {/* OVERCROWDED VS UNDERSERVED */}
            <section className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-rose-400" />
                  <h3 className="text-lg font-semibold text-white">Vùng đông đúc (Overcrowded)</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-zinc-900/40 rounded-lg">
                    <div className="text-sm text-zinc-300">Mass Market - Giá thấp, chất lượng TB</div>
                    <div className="text-xs text-zinc-500 mt-1">~70% trung tâm • Cạnh tranh giá khốc liệt</div>
                  </div>
                  <div className="p-3 bg-zinc-900/40 rounded-lg">
                    <div className="text-sm text-zinc-300">Target sinh viên</div>
                    <div className="text-xs text-zinc-500 mt-1">42.5% nhắm đến • Ngân sách thấp, churn cao</div>
                  </div>
                  <div className="p-3 bg-zinc-900/40 rounded-lg">
                    <div className="text-sm text-zinc-300">Facebook organic only</div>
                    <div className="text-xs text-zinc-500 mt-1">64% chỉ dùng fanpage • Reach giảm dần</div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-semibold text-white">Vùng còn trống (Underserved)</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-zinc-900/40 rounded-lg">
                    <div className="text-sm text-zinc-300">B2B / Corporate training</div>
                    <div className="text-xs text-zinc-500 mt-1">Chỉ 11% nhắm đến • Ticket size 10-50x</div>
                  </div>
                  <div className="p-3 bg-zinc-900/40 rounded-lg">
                    <div className="text-sm text-zinc-300">Trẻ em chuyên biệt</div>
                    <div className="text-xs text-zinc-500 mt-1">Chỉ 23.5% • Phụ huynh sẵn sàng trả premium</div>
                  </div>
                  <div className="p-3 bg-zinc-900/40 rounded-lg">
                    <div className="text-sm text-zinc-300">TikTok / Video content</div>
                    <div className="text-xs text-zinc-500 mt-1">Chỉ 12.4% • First mover advantage</div>
                  </div>
                  <div className="p-3 bg-zinc-900/40 rounded-lg">
                    <div className="text-sm text-zinc-300">Outcome-based / Cam kết kết quả</div>
                    <div className="text-xs text-zinc-500 mt-1">Chỉ 9.8% • Highest trust builder</div>
                  </div>
                </div>
              </div>
            </section>

            {/* STRATEGIC TENSIONS */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <h2 className="text-lg font-semibold text-white mb-6">Các Trade-off chiến lược</h2>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-zinc-800/30 rounded-xl">
                  <div className="flex-1 text-right">
                    <div className="text-sm font-medium text-blue-400">Volume leads</div>
                    <div className="text-xs text-zinc-500">Nhiều nhưng chất lượng thấp</div>
                  </div>
                  <div className="w-16 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-zinc-500" />
                    <ArrowRight className="w-5 h-5 text-zinc-500 -ml-3" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-amber-400">Quality leads</div>
                    <div className="text-xs text-zinc-500">Ít nhưng conversion cao</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-zinc-800/30 rounded-xl">
                  <div className="flex-1 text-right">
                    <div className="text-sm font-medium text-blue-400">Giá thấp / Giảm giá</div>
                    <div className="text-xs text-zinc-500">Thu hút nhanh, margin thấp</div>
                  </div>
                  <div className="w-16 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-zinc-500" />
                    <ArrowRight className="w-5 h-5 text-zinc-500 -ml-3" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-amber-400">Premium pricing</div>
                    <div className="text-xs text-zinc-500">Loyalty cao, cần value proof</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-zinc-800/30 rounded-xl">
                  <div className="flex-1 text-right">
                    <div className="text-sm font-medium text-blue-400">Generalist</div>
                    <div className="text-xs text-zinc-500">Thị trường rộng, cạnh tranh cao</div>
                  </div>
                  <div className="w-16 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-zinc-500" />
                    <ArrowRight className="w-5 h-5 text-zinc-500 -ml-3" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-amber-400">Specialist</div>
                    <div className="text-xs text-zinc-500">Thị trường hẹp, premium pricing</div>
                  </div>
                </div>
              </div>
            </section>

            {/* TOP PERFORMERS ANALYSIS */}
            <ExpandableSection title="🏆 Phân tích Top Performers" defaultOpen>
              <div className="space-y-3">
                {data.topPerformers.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-zinc-800/30 rounded-lg">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      i === 0 ? 'bg-amber-500/20 text-amber-400' : 'bg-zinc-700 text-zinc-400'
                    }`}>{i + 1}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-zinc-300">{item.name}</div>
                      <div className="text-xs text-zinc-500">{item.region}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">{item.engagement}</div>
                      <div className="text-xs text-zinc-500">engagement</div>
                    </div>
                    <div className="flex gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${item.hasWebsite ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-700 text-zinc-400'}`}>
                        {item.hasWebsite ? 'Website' : 'No Web'}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${item.hasPaidAds ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-700 text-zinc-400'}`}>
                        {item.hasPaidAds ? 'Paid Ads' : 'No Ads'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-zinc-800/30 rounded-lg">
                <p className="text-xs text-zinc-400">
                  <strong className="text-amber-400">Pattern:</strong> Top performers không nhất thiết có website (40% không có)
                  hoặc paid ads (50% không có). Yếu tố chung: <strong className="text-white">Content đa dạng + Tần suất đăng bài cao</strong>.
                </p>
              </div>
            </ExpandableSection>
          </div>
        )}

        {/* ==================== TAB 6: CHIẾN LƯỢC & KHUYẾN NGHỊ ==================== */}
        {activeTab === 'strategy' && (
          <div className="space-y-8">

            {/* STRATEGIC SUMMARY */}
            <section className="bg-gradient-to-br from-rose-500/10 via-transparent to-blue-500/10 rounded-2xl p-8 border border-zinc-800/50">
              <h2 className="text-xl font-semibold text-white mb-6">Tóm tắt Chiến lược</h2>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-14 h-14 bg-rose-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Users className="w-7 h-7 text-rose-400" />
                  </div>
                  <div className="text-sm font-medium text-zinc-300">Target chính</div>
                  <div className="text-lg font-semibold text-white mt-1">Người đi làm</div>
                  <div className="text-xs text-zinc-500">57.5% thị trường</div>
                </div>

                <div className="text-center">
                  <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-7 h-7 text-blue-400" />
                  </div>
                  <div className="text-sm font-medium text-zinc-300">Khu vực trọng điểm</div>
                  <div className="text-lg font-semibold text-white mt-1">Bình Dương + Thủ Đức</div>
                  <div className="text-xs text-zinc-500">Khu công nghiệp, FDI</div>
                </div>

                <div className="text-center">
                  <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Target className="w-7 h-7 text-emerald-400" />
                  </div>
                  <div className="text-sm font-medium text-zinc-300">Định vị đề xuất</div>
                  <div className="text-lg font-semibold text-white mt-1">Minh bạch + Cam kết</div>
                  <div className="text-xs text-zinc-500">Outcome-based</div>
                </div>
              </div>
            </section>

            {/* POSITIONING STATEMENT */}
            <section className="text-center py-6 bg-zinc-900/40 rounded-2xl border border-zinc-800/50">
              <div className="text-sm text-zinc-500 mb-2">Positioning Statement đề xuất</div>
              <blockquote className="text-xl font-medium text-white italic px-8">
                "Đối với <span className="text-blue-400">nhân viên văn phòng muốn thăng tiến trong môi trường quốc tế</span>,
                [Tên TT] là trung tâm tiếng Trung cung cấp <span className="text-amber-400">lộ trình học cá nhân hóa với cam kết đầu ra HSK</span>,
                khác biệt nhờ <span className="text-rose-400">minh bạch học phí + mentor 1:1</span>"
              </blockquote>
            </section>

            {/* QUICK WINS */}
            <section>
              <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
                Quick Wins (0-3 tháng) — Làm ngay
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {data.recommendations.quickWins.map((item, i) => (
                  <div key={i} className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-emerald-400">{item.action}</span>
                      <span className="text-xs text-zinc-500">{item.timeline}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs mb-3">
                      <div>
                        <span className="text-zinc-500">Impact:</span>
                        <span className="text-amber-400 ml-1">{item.impact}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500">Effort:</span>
                        <span className="text-blue-400 ml-1">{item.effort}</span>
                      </div>
                    </div>
                    <div className="text-xs text-zinc-500">
                      <span className="text-rose-400">Risk:</span> {item.risk}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SHORT TERM */}
            <section>
              <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
                Short-term (3-6 tháng) — Xây dựng nền tảng
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {data.recommendations.shortTerm.map((item, i) => (
                  <div key={i} className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-blue-400">{item.action}</span>
                      <span className="text-xs text-zinc-500">{item.timeline}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs mb-3">
                      <div>
                        <span className="text-zinc-500">Impact:</span>
                        <span className="text-amber-400 ml-1">{item.impact}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500">Effort:</span>
                        <span className="text-blue-400 ml-1">{item.effort}</span>
                      </div>
                    </div>
                    <div className="text-xs text-zinc-500">
                      <span className="text-rose-400">Risk:</span> {item.risk}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* MEDIUM TERM */}
            <section>
              <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
                Medium-term (6-12 tháng) — Scale & Differentiate
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {data.recommendations.mediumTerm.map((item, i) => (
                  <div key={i} className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-amber-400">{item.action}</span>
                      <span className="text-xs text-zinc-500">{item.timeline}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs mb-3">
                      <div>
                        <span className="text-zinc-500">Impact:</span>
                        <span className="text-amber-400 ml-1">{item.impact}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500">Effort:</span>
                        <span className="text-blue-400 ml-1">{item.effort}</span>
                      </div>
                    </div>
                    <div className="text-xs text-zinc-500">
                      <span className="text-rose-400">Risk:</span> {item.risk}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ACTION PRIORITIES - Timeline */}
            <section className="bg-zinc-900/40 rounded-2xl p-6 border border-zinc-800/50">
              <h2 className="text-lg font-semibold text-white mb-4">Ưu tiên hành động theo Timeline</h2>

              <div className="space-y-3">
                {[
                  { priority: "P1", action: "Công khai học phí trên mọi kênh", timeline: "Tháng 1", reason: "90.2% không công khai → First mover trust" },
                  { priority: "P1", action: "Launch TikTok (3 video/tuần)", timeline: "Tháng 1-2", reason: "87.6% chưa có → Blue ocean Gen Z" },
                  { priority: "P1", action: "Triển khai chương trình học thử", timeline: "Tháng 2", reason: "Giảm barrier to purchase" },
                  { priority: "P2", action: "Xây content marketing engine", timeline: "Tháng 2-4", reason: "71% SEO tốt nhưng chỉ 14% engagement → Content gap" },
                  { priority: "P2", action: "Facebook Ads lead generation", timeline: "Tháng 3-4", reason: "73.2% không ads → Thị trường còn trống" },
                  { priority: "P2", action: "Referral program", timeline: "Tháng 3-4", reason: "Leverage existing customers" },
                  { priority: "P3", action: "B2B outreach doanh nghiệp FDI", timeline: "Tháng 4-6", reason: "88.9% bỏ ngỏ → Blue ocean ticket cao" },
                  { priority: "P3", action: "Specialized programs (trẻ em, business)", timeline: "Tháng 6-9", reason: "Differentiation strategy" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-zinc-800/30 rounded-lg">
                    <span className={`px-2 py-1 text-xs font-bold rounded ${
                      item.priority === 'P1' ? 'bg-rose-500/20 text-rose-400' :
                      item.priority === 'P2' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>{item.priority}</span>
                    <div className="flex-1">
                      <div className="text-sm text-zinc-300">{item.action}</div>
                      <div className="text-xs text-zinc-500">{item.reason}</div>
                    </div>
                    <span className="text-xs text-zinc-500">{item.timeline}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* UNCOMFORTABLE TRUTHS */}
            <ExpandableSection title="⚠️ Những sự thật khó chấp nhận" badge="Quan trọng">
              <div className="space-y-4">
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                  <div className="text-sm font-medium text-rose-400 mb-2">"Phần lớn trung tâm sẽ không survive trong 5 năm tới"</div>
                  <p className="text-xs text-zinc-400">
                    62.7% không có website, 85.6% không làm video, 87.6% không có TikTok.
                    Trong khi Gen Z trở thành khách hàng chính, AI-powered learning tăng.
                    Những trung tâm không adapt sẽ bị thay thế.
                  </p>
                </div>

                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <div className="text-sm font-medium text-amber-400 mb-2">"Giá rẻ không phải competitive advantage"</div>
                  <p className="text-xs text-zinc-400">
                    Giá rẻ thu hút khách price-sensitive có highest churn.
                    Margin thấp không cho phép đầu tư vào chất lượng.
                    Trung tâm cần tìm differentiation khác ngoài giá.
                  </p>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <div className="text-sm font-medium text-blue-400 mb-2">"Chất lượng giáo viên không đủ để differentiate"</div>
                  <p className="text-xs text-zinc-400">
                    Khó verify trước khi học, chủ quan, tất cả đều claim "giáo viên giỏi".
                    Cần proof points: certifications, demo classes, student outcomes, testimonials.
                  </p>
                </div>
              </div>
            </ExpandableSection>
          </div>
        )}

      </main>

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-zinc-800/50 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center">
          <p className="text-xs text-zinc-600">
            Strategic Market Research Dashboard • 153 trung tâm • TP.HCM, Bình Dương, Vũng Tàu • Q4/2025
          </p>
          <p className="text-xs text-zinc-700 mt-1">
            Dữ liệu từ báo cáo nghiên cứu thị trường ngành đào tạo tiếng Trung khu vực Nam Việt Nam
          </p>
        </div>
      </footer>
    </div>
  );
}
