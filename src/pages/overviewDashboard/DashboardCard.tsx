const DashboardCard = ({ icon: Icon, title, subtitle, value }) => {
  return (
    <div className="border border-d2 rounded-lg w-[293px] h-[150px] flex items-center gap-[24px] justify-center">
      <div>
        <Icon className="dashboard_overview_icon" />
      </div>
      <div>
        <h1 className="dashboard_overview_title">{value}</h1>
        <h4 className="dashboard_overview_subTitle">{subtitle}</h4>
      </div>
    </div>
  );
};

export default DashboardCard;
