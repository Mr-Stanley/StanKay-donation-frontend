import StatCard from './StatCard';

const DashboardHome = ({ admin }) => (
  <div className="bg-black bg-opacity-40 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-10">
    <h2 className="text-2xl font-bold text-white mb-6">Welcome back, {admin?.name}</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        title="Total Donations" 
        value="$24,589" 
        change="+12% from last month" 
        icon="💰" 
        color="from-green-500 to-emerald-500"
      />
      <StatCard 
        title="Active Charities" 
        value="42" 
        change="+3 new this week" 
        icon="🤝" 
        color="from-blue-500 to-cyan-500"
      />
      <StatCard 
        title="Pending Requests" 
        value="7" 
        change="2 need immediate attention" 
        icon="⏳" 
        color="from-amber-500 to-yellow-500"
      />
    </div>
    
    <div className="bg-black bg-opacity-30 rounded-xl p-6 border border-white border-opacity-10">
      <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {[
          { action: "New donation", details: "$500 from John D.", time: "2 mins ago" },
          { action: "Charity approved", details: "Food for All", time: "1 hour ago" },
          { action: "Status updated", details: "Donation #4582 completed", time: "3 hours ago" }
        ].map((item, i) => (
          <div key={i} className="flex items-start pb-4 border-b border-white border-opacity-5 last:border-0">
            <div className="w-8 h-8 rounded-full bg-purple-500 bg-opacity-20 flex items-center justify-center mr-3 mt-1">
              <span className="text-sm">🔔</span>
            </div>
            <div>
              <p className="text-white font-medium">{item.action}</p>
              <p className="text-purple-200 text-sm">{item.details}</p>
              <p className="text-purple-300 text-xs mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default DashboardHome;