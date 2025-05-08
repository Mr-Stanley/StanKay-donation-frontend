const StatCard = ({ title, value, change, icon, color }) => (
    <div className={`bg-gradient-to-br ${color} p-5 rounded-xl shadow-lg`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-white text-opacity-80 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
      <p className="text-white text-opacity-70 text-xs mt-3">{change}</p>
    </div>
  );
  
  export default StatCard;